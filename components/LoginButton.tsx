import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  // make a centered container with a logo and login button

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="font-bold text-4xl">ChatQuery</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={loginWithRedirect}
      >
        Log in
      </button>
    </div>
  );
}
