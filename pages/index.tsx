import { collection, getDocs, query, where } from "firebase/firestore";
import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import Layout from "../components/Layout";
import firebase from "../lib/firebase";
import { Meeting } from "../schema/interfaces";

interface HomeProps {
  meetings: Meeting[];
}

const Home: NextPage<HomeProps> = ({ meetings }) => {
  const [meetingsState, setMeetingsState] = useState<Meeting[]>(meetings);
  const router = useRouter();

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="pt-10 gap-16">
          <div className="col-span-7">
            <h1 className="text-4xl mb-12 text-center">My meetings</h1>
            {meetingsState.map(({ title, date, id }) => (
              <div
                key={id}
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const collectionRef = collection(firebase.db, "conversations");

    // Make sure the title and date are not empty
    const filteredQuery = query(
      collectionRef,
      where("title", "!=", "")
      // where("date", "!=", "")
    );

    const querySnapshot = await getDocs(filteredQuery);
    const meetingsData = querySnapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Meeting)
    );

    return {
      props: {
        meetings: meetingsData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        meetings: [],
      },
    };
  }
};

export default Home;
