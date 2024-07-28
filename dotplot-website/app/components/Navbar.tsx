import Link from "next/link";
import Image from "next/image";
import { color } from "three/examples/jsm/nodes/Nodes.js";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <div
      className="navbar justify-between items-center"
      style={{ backgroundColor: "#35cbb8" }}
    >
      <div className="flex-1">
        <Link href={"/"}>
          <Image
            className="rounded-xl"
            src="/wide.png"
            alt="logo"
            width={150}
            height={50}
          />
        </Link>
      </div>
      <div className="flex-1">
        {/* <Link
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          href={"/patient"}
        >
          View Patients
        </Link> */}
        {/* <div className="relative flex flex-col space-y-10 justify-center overflow-hidden py-6 sm:py-12"> */}
        <SignedIn>
          <Link
            className="bg-gradient-to-b w-max mx-auto text-blue-500 font-semibold from-slate-50 to-blue-100 px-10 py-3 rounded-2xl  shadow-blue-950  transform hover:scale-95 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border-b-4 border-blue-600"
            href={"/patient"}
            style={{
              color: "#120032",
              // boxShadow: "0 20px 20px -12px #120032",
            }}
          >
            View Patients
          </Link>
        </SignedIn>

        {/* </div> */}
      </div>
      <div className="flex-1 justify-end">
        <li className="pr-4 flex justify-center items-center">
          <ThemeToggle />
        </li>
        <SignedIn>
          <UserButton showName />
        </SignedIn>
        <SignedOut>
          <ul className="menu menu-horizontal px-1 space-x-4 flex items-center">
            <li className="btn bg-primary text-secondary border-none hover:bg-tertiary rounded-full">
              <Link href={"/login"}>Log in</Link>
            </li>

            <li className="btn bg-secondary text-primary border-none hover:bg-tertiary">
              <Link href={"/signup"}>Sign Up</Link>
            </li>
          </ul>
        </SignedOut>
      </div>
    </div>
  );
}
