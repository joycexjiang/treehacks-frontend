import axios from "axios";
import { Chunk } from "../schema/interfaces";

export const analyze = async (firebaseUrl: string, docId: string) => {
  const base64Encoded = Buffer.from(firebaseUrl).toString("base64");
  const baseUrl = `${process.env.BACKEND_IP}/conversation_analysis`;

  const response = await axios.post(baseUrl, null, {
    params: { url: base64Encoded, docId },
  });
  const data = response.data;
  return data;
};


export interface SearchResults {
    output: string;
    chunks_to_include: Chunk[];
}

export const search = async (query: string): Promise<SearchResults> =>  {
  const baseUrl = `${process.env.BACKEND_IP}/search`;

  const response = await axios.post(baseUrl, null, {
    params: { query },
  });
  const data = response.data;
  return data;
};
