import { ApiMethodNotAllowed } from "@errors";
import { firebaseAdmin } from "@firebase/admin";
import { withError } from "@middlewares/with-error";
import { APIHandler } from "@typings/api-handler";
import { Thing } from "@typings/thing";
import { requireJWTAuth } from "@utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

const handler: APIHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const auth = await requireJWTAuth(req);
  console.warn("🤖🤖🤖 GET /api/things");
  if (!(req.method === "GET")) {
    throw new ApiMethodNotAllowed();
  }

  const things: Thing[] = [];

  await firebaseAdmin
    .firestore()
    .collection("things")
    .where("user.uid", "==", auth.uid)
    .orderBy("loanDate", "asc")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        things.push({ id: doc.id, ...doc.data() } as Thing);
      });
    });

  res.status(200).json(things);
};

export default withError(handler);
