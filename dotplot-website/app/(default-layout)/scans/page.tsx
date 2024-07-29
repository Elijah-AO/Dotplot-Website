import { IPatient } from "@/app/models/patient";
import IUS_scan from "@/app/models/us_scan";
import Scans from "./scan-details";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteButton from "../patient/[id]/delete-button";

export default async function Patient() {
  const res = await fetch(`http://localhost:5000/api/us-scan`);
  const scans: IUS_scan[] = await res.json();

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row">
        <Link
          className="btn m-3 bg-black h-min p-3 hover:bg-gray-900 hover:shadow-md rounded-md text-gray-100 hover:text-gray-400 transition-all duration-200 "
          href={"/patient"}
        >
          {"<- Back"}
        </Link>

        <Scans scans={scans} />
        <Link
          className="m-2 p-2 opacity-0 pointer-events-none"
          href={"/patient"}
        >
          {"<- Back"}
        </Link>
      </div>
    </div>
  );
}
