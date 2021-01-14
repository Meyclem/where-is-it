import { NotAuthorized } from "@errors";
import { firebaseAdmin } from "@firebase/admin";
import { NextApiRequest } from "next";

export const requireJWTAuth = async (
  req: NextApiRequest,
): Promise<firebaseAdmin.auth.DecodedIdToken> => {
  if (!req.headers.authorization) {
    throw new NotAuthorized();
  }

  const [tokenType, jwt] = req.headers.authorization.split(" ");

  if (!tokenType || tokenType !== "Bearer" || !jwt) {
    throw new NotAuthorized();
  }
  const auth = await firebaseAdmin
    .auth()
    .verifyIdToken(jwt)
    .catch(() => {
      throw new NotAuthorized();
    });

  if (!auth) {
    throw new NotAuthorized();
  }

  return auth;
};
