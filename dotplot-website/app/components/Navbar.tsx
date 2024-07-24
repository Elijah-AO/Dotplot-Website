import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="top-0 navbar bg-tertiary">
      <div className="flex-1 space-x-4">
        <Link href={"/"}>
          <Image
            className="rounded-full"
            src="/logo.jpeg"
            alt="logo"
            width={50}
            height={50}
          />
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li>
            <Link className="" href={"/patient"}>
              Patients
            </Link>
          </li>
          <li>
            <button className="btn bg-secondary text-primary">
              <Link href={"/login"}>Log in</Link>
            </button>
          </li>
          <li>
            <button className="btn bg-secondary text-primary">
              <Link href={"/signup"}>Sign Up</Link>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
