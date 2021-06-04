import * as firebaseAdmin from "firebase-admin";

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "",
    projectId: process.env.FIREBASE_PROJECT_ID || "",
  }),
  projectId: process.env.FIREBASE_PROJECT_ID || "",
});

const cleanAuth = async (client: firebaseAdmin.auth.Auth): Promise<void> => {
  const users = (await client.listUsers()).users;
  const ids = users.map((userData) => userData.uid);

  await client.deleteUsers(ids);
};

const cleanCollection = async (
  client: firebaseAdmin.firestore.Firestore,
  collection: "users" | "things",
): Promise<void> => {
  const users: string[] = [];
  await client
    .collection(collection)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        users.push(doc.id);
      });
    });

  await Promise.all(
    users.map((id) => client.collection(collection).doc(id).delete()),
  );
};

const clean = async (): Promise<void> => {
  await cleanAuth(firebaseAdmin.auth());
  await cleanCollection(firebaseAdmin.firestore(), "users");
  await cleanCollection(firebaseAdmin.firestore(), "things");
};

clean()
  .then(() => {
    console.log("✅", "Cleaning done");
  })
  .catch((error) => {
    console.log("❌", error);
    process.exit(1);
  })
  .finally(() => firebaseAdmin.app().delete());
