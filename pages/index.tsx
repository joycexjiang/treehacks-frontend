import { collection, getDocs } from "firebase/firestore";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import firebase from "../lib/firebase";

const Home: NextPage = () => {
  const [meetings, setMeetings] = useState<any[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    // fetch document for given ID
    const collectionRef = collection(firebase.db, "conversations");
    // load the document
    getDocs(collectionRef).then((docs) => {
      setMeetings(docs.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  // const meetings = [
  //   {
  //     name: "John Doe",
  //     date: "11/12/23",
  //   },
  //   {
  //     name: "John Doe",
  //     date: "11/12/23",
  //   },
  //   {
  //     name: "John Doe",
  //     date: "11/12/23",
  //   },
  //   {
  //     name: "John Doe",
  //     date: "11/12/23",
  //   },
  // ];

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="pt-10 lg:grid md:grid-cols-11 gap-16">
          <div className="col-span-4">
            <div className="mt-1">
              <textarea
                id="notepad"
                name="notepad"
                rows={10}
                className="min-h-200 mt-1 leading-relaxed block w-full rounded-md border-gray-300  border-[1px] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md py-8 px-10 mb-6"
                placeholder="Use this area to plan any premeditated questions, thoughts, or to
                      jot down some quick notes!"
                defaultValue={""}
              />
            </div>
          </div>
          <div className="col-span-7">
            <h1 className="text-4xl mb-12">My meetings</h1>
            {meetings?.map(({ title, date, id }) => (
              <div
                className="border-gray-300 border-[1px] rounded-xl py-6 px-10 text-md leading-relaxed bg-white opacity-70 mb-4 cursor-pointer"
                onClick={() => router.push("/view_meeting?id=" + id)}
              >
                <div className="flex justify-between">
                  <div className="border-2 rounded-md px-5 py-1 bg-white bg-opacity-100">
                    <p>{title}</p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p>{date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
