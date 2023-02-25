import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import MeetingHeader from "../components/MeetingHeader";
import MeetingSidebar from "../components/MeetingSidebar";
import firebase from "../lib/firebase";
import { Meeting, Transcript } from "../schema/interfaces";

interface ViewMeetingProps {
  meeting: Meeting | null;
}

export default function ViewMeeting({ meeting }: ViewMeetingProps) {
  const router = useRouter();

  return (
    <div
      style={{
        backgroundImage: `url('Background.jpg')`,
        backgroundSize: "cover",
      }}
      className="h-screen flex"
    >
      <MeetingSidebar meeting={meeting} />
      <div className="flex-grow">
        <MeetingHeader />
        <div className="grid grid-cols-2 gap-6 py-8 px-6">
          <div className="break-inside-avoid-column border-[1px] border-gray-300 rounded-xl py-8 px-10 mb-6 text-sm bg-white bg-opacity-70">
            <div className="border-2 rounded-md px-5 py-2 bg-white bg-opacity-100">
              <p>Transcript</p>
            </div>
            <div>
              {meeting?.transcripts?.map(
                ({ text, role }: Transcript, index: number) => (
                  <div key={index}>
                    <p>
                      <b>{role}</b>
                    </p>
                    <p>{text}</p>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="break-inside-avoid-column border-[1px] border-gray-300 rounded-xl py-8 px-10 mb-6 text-sm bg-white bg-opacity-70">
            <div className="border-2 rounded-md px-5 py-2 bg-white bg-opacity-100">
              <p>Additional Questions</p>
            </div>
            <ol className="m-0 p-0 list-inside">
              {meeting?.questions?.map((question: string) => (
                <li key={question}>{question}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<ViewMeetingProps> = async (
  context
) => {
  const { id } = context.query;

  try {
    const docRef = doc(firebase.db, `conversations/${id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const meeting = docSnap.data() as Meeting;
      return { props: { meeting } };
    }
  } catch (error) {
    console.log(error);
  }

  return { props: { meeting: null } };
};
