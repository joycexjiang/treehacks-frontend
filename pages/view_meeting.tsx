import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import MeetingHeader from "../components/MeetingHeader";
import MeetingSidebar from "../components/MeetingSidebar";
import firebase from "../lib/firebase";

export default function ViewMeeting() {
  const router = useRouter();
  const { id } = router.query;
  const [meeting, setMeeting] = useState<any | null>(null);

  useEffect(() => {
    // fetch document for given ID
    const docRef = doc(firebase.db, "conversations/" + id);
    // load the document
    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        const meeting = doc.data();
        console.log(meeting);
        setMeeting(meeting);
      }
    });

    const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
      const updatedMeeting = querySnapshot.data();
      setMeeting(updatedMeeting);
    });
    return unsubscribe;
  }, [id]);

  return (
    <div
      style={{
        backgroundImage: `url('Background.jpg')`,
        backgroundSize: "cover",
      }}
      className="h-screen flex"
    >
      <MeetingSidebar data={meeting} />
      <div className="flex-grow">
        <MeetingHeader />
        <div className="grid grid-cols-2 gap-6 py-8 px-6">
          <div className="break-inside-avoid-column border-[1px] border-gray-300 rounded-xl py-8 px-10 mb-6 text-sm bg-white bg-opacity-70">
            <div className="border-2 rounded-md px-5 py-2 bg-white bg-opacity-100">
              <p>Transcript</p>
            </div>
            <p>
              {meeting?.transcripts?.map(({ text, role }: any) => (
                <>
                  <p>
                    <b>{role}</b>
                  </p>
                  <p>{text}</p>
                  <p></p>
                </>
              ))}
            </p>
          </div>
          <div className="break-inside-avoid-column border-[1px] border-gray-300 rounded-xl py-8 px-10 mb-6 text-sm bg-white bg-opacity-70">
            <div className="border-2 rounded-md px-5 py-2 bg-white bg-opacity-100">
              <p>Additional Questions</p>
            </div>
            <ol className="m-0 p-0 list-inside">
              {meeting?.questions?.map((question: any) => (
                <li>{question}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
