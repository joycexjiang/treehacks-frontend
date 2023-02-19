import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { search } from "../lib/api";

export default function Search() {
  const router = useRouter();
  const query = router.query["q"];

  const [results, setResults] = useState<any>();

  useEffect(() => {
    if (!query) return;
    // search for data using query
    search(query as string).then((results) => {
      setResults(results);
    });
  }, [query]);

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="pt-10 lg:grid md:grid-cols-11 gap-16">
          <div className="col-span-4">
            <h1 className="text-4xl mb-12">{query}</h1>
            <div className="border-gray-300 border-[1px] rounded-xl py-8 px-10 text-md leading-relaxed bg-white opacity-70 mb-6">
              {results?.output}
            </div>
          </div>
          <div className="col-span-7">
            <div className="md:columns-2 gap-6">
              {results?.chunks_to_include.map(
                ({ interviewee_name, text }: any) => (
                  <div className="break-inside-avoid-column border-[1px] border-gray-300 rounded-xl py-8 px-10 mb-6 text-sm bg-white bg-opacity-70">
                    <div className="flex justify-between px-2 mb-4">
                      <div className="border-2 rounded-md px-5 py-2 bg-white bg-opacity-100">
                        <p>{interviewee_name}</p>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p>11/14/23</p>
                      </div>
                    </div>
                    <p>{text}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
