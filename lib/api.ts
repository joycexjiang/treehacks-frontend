import axios, { AxiosResponse } from "axios";
import { Chunk } from "../schema/interfaces";

export const analyze = async (firebaseUrl: string, docId: string) => {
  const base64Encoded = Buffer.from(firebaseUrl).toString("base64");
  const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_IP}/conversation_analysis`;

  const response = await axios.post(baseUrl, null, {
    params: { url: base64Encoded, docId },
  });
  const data = response.data;
  return data;
};


export interface SearchResults {
    output: string;
    chunks_to_include: Chunk[];
    query: string;
}

export const search = async (query: string): Promise<SearchResults> =>  {
  const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_IP}/search`;

  try {
    const response = await axios.get(baseUrl, {
      params: { query },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return {output: `Error: ${error}`, chunks_to_include: [], query: ""};
  }
 
};


export const ping = async (): Promise<AxiosResponse<any, any>> =>  {
  const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_IP}/`;

  const response = await axios.get(baseUrl);
  return response;
};
