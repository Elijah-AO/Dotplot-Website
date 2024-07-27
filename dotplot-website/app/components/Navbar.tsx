import Link from "next/link";
import Image from "next/image";
import { color } from "three/examples/jsm/nodes/Nodes.js";

export default function Navbar() {
  return (
    <div
      className="navbar justify-between items-center"
      style={{ backgroundColor: "#35cbb8" }}
    >
      <div className="">
        <Link href={"/"}>
          <Image
            className="rounded-full pb-4"
            src="/tt_logo_light2.png"
            alt="logo"
            width={170}
            height={10}
          />
        </Link>
      </div>
      <div>
        {/* <Link
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          href={"/patient"}
        >
          View Patients
        </Link> */}
        {/* <div className="relative flex flex-col space-y-10 justify-center overflow-hidden py-6 sm:py-12"> */}
        <Link
          className="bg-gradient-to-b w-max mx-auto text-blue-500 font-semibold from-slate-50 to-blue-100 px-10 py-3 rounded-2xl shadow-lg shadow-blue-950  transform hover:scale-95 hover:shadow-sm transition-all duration-300 ease-in-out border-b-4 border-blue-600"
          href={"/patient"}
          style={{
            color: "#120032",
            // boxShadow: "0 20px 20px -12px #120032",
          }}
        >
          View Patients
        </Link>
        {/* </div> */}
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li>
            <button className="btn bg-primary text-secondary border-none hover:bg-tertiary rounded-full p-4 pb-7 flex items-center justify-between">
              <Link href={"/login"}>Log in</Link>
            </button>
          </li>
          <li>
            <button className="btn bg-secondary text-primary border-none">
              <Link href={"/signup"}>Sign Up</Link>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
