import Link from "next/link";
import logo from "../../assets/vercel.svg";
import Image from "next/image";

export default function Header() {
  return (
    <div className="container mx-auto lg:px-36 px-6 ">
      <div className="py-6">
        <div className=" inline-block">
          <Link href="/">
            <Image src={logo} alt="Snapnotes logo" height={35} />
          </Link>
        </div>
      </div>
    </div>
  );
}
