import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
import logo from "../public/vercel.svg";

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  // make a centered container with a logo and login button

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image
        alt="Logo"
        src={logo}
        className="w-64 h-64 mb-8"
        width={200}
        height={200}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={loginWithRedirect}
      >
        Log in
      </button>
    </div>
  );
}
