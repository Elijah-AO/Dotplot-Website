import PatientList from "./patient_list";
import { IPatient } from "@/app/models/patient";
import Link from "next/link";

export default async function Patients() {
  var patients: IPatient[] = [];
  try {
    const res = await fetch("http://localhost:5000/api/patient");
    var patients: IPatient[] = await res.json();
  } catch (error) {
    return {
      message: "error messaging backend",
    };
  }
  return (
    <div className="">
      <Link href="/addPatient">
        <button className="m-3 bg-black h-min p-3 hover:bg-gray-900 hover:shadow-md rounded-md text-gray-100 hover:text-gray-400 transition-all duration-200 ">
          Add New Patient
        </button>
      </Link>

      <PatientList patients={patients} />
    </div>
  );
}
