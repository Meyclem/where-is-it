import { NotAuthorized } from "@errors";
import { firebaseAdmin } from "@firebase/admin";
import { decode } from "jsonwebtoken";
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

  if (process.env.NODE_ENV !== "production") {
    const auth = (await decode(jwt)) as firebaseAdmin.auth.DecodedIdToken;
    if (!auth) {
      throw new NotAuthorized();
    }
    return {
      ...auth,
      uid: auth.user_id,
    } as firebaseAdmin.auth.DecodedIdToken;
  }

  const auth = await firebaseAdmin
    .auth()
    .verifyIdToken(jwt)
    .catch((error) => {
      console.warn(error);
      throw new NotAuthorized();
    });

  if (!auth) {
    throw new NotAuthorized();
  }

  return auth;
};
