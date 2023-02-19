import axios from "axios";

export const analyze = async (firebaseUrl: string, docId: string) => {
  const base64Encoded = Buffer.from(firebaseUrl).toString("base64");
  const baseUrl = "http://34.150.158.198:8000/conversation_analysis";

  const response = await axios.post(baseUrl, null, {
    params: { url: base64Encoded, docId },
  });
  const data = response.data;
  return data;
};

export const search = async (query: string) => {
  const baseUrl = "http://34.150.158.198:8000/search";

  const response = await axios.post(baseUrl, null, {
    params: { query },
  });
  const data = response.data;
  return data;
};
