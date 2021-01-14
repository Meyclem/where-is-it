import { NextApiRequest, NextApiResponse } from "next";

export type APIHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void>;
