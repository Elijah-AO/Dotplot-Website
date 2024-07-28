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
    <div className="flex justify-center items-center flex-col">
      <Link href="/addPatient">
        <button className="m-3 bg-primary h-min p-3 hover:bg-black hover:shadow-md rounded-md text-secondary font-semibold hover:text-gray-100 transition-all duration-200 ">
          + Add New Patient
        </button>
      </Link>

      <PatientList patients={patients} />
    </div>
  );
}
