import { ApiMethodNotAllowed } from "@errors";
import { firebaseAdmin } from "@firebase/admin";
import { withError } from "@middlewares/with-error";
import { APIHandler } from "@typings/api-handler";
import { requireJWTAuth } from "@utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

const handler: APIHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const auth = await requireJWTAuth(req);
  console.warn("🤖🤖🤖 POST /api/users");
  if (!(req.method === "POST")) {
    throw new ApiMethodNotAllowed();
  }
  const userDocument = await firebaseAdmin
    .firestore()
    .collection("users")
    .doc(auth.uid)
    .get();
  const user = userDocument.data();

  if (!user) {
    await firebaseAdmin.firestore().collection("users").doc(auth.uid).set({
      name: auth.name,
      email: auth.email,
    });
    console.warn("🤖 [201] user created with email: " + auth.email);
    res.status(201).json({
      name: auth.name,
      email: auth.email,
    });
  } else {
    res.status(200).json(user);
    console.warn("🤖 [200] user created with email: " + user.email);
  }
};

export default withError(handler);
