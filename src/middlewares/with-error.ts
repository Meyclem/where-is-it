import { NotAuthorized, ApiMethodNotAllowed } from "@errors";
import { APIHandler } from "@typings/api-handler";
import { NextApiRequest, NextApiResponse } from "next";
export const withError = (hander: APIHandler): APIHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await hander(req, res);
    } catch (error) {
      if (error instanceof NotAuthorized) {
        res.status(401).json({ message: "Not authorized" });
      } else if (error instanceof ApiMethodNotAllowed) {
        res.status(403).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
      res.end();
    }
  };
};
