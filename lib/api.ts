import axios from "axios";

export const analyze = async (firebaseUrl: string, docId: string) => {
  const base64Encoded = Buffer.from(firebaseUrl).toString("base64");
  const baseUrl = `${process.env.BACKEND_IP}/conversation_analysis`;

  const response = await axios.post(baseUrl, null, {
    params: { url: base64Encoded, docId },
  });
  const data = response.data;
  return data;
};

export const search = async (query: string) => {
  const baseUrl = `${process.env.BACKEND_IP}/search`;

  const response = await axios.post(baseUrl, null, {
    params: { query },
  });
  const data = response.data;
  return data;
};
