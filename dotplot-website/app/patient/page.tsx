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
      <PatientList patients={patients} />
    </div>
  );
}
