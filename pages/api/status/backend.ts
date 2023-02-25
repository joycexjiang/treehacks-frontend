import type { NextApiRequest, NextApiResponse } from "next";
import { ping } from "../../../lib/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  
  const backendResponse = await ping();
  res.status(backendResponse.status).json({"backend_response": backendResponse.data});
}
