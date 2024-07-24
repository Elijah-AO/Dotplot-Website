// "use client";
// import { usePathname } from "next/navigation";
import { IPatient } from "@/app/models/patient";
import PatientDetails from "./patient-details";

export default async function Patient({ params }: { params: { id: string } }) {
  // console.log(params);
  // const pathname = usePathname();
  // const patient_id = pathname.split("/").at(-1);
  const { id } = params;
  const res = await fetch(`http://localhost:5000/api/patient/${id}`);
  const patient: IPatient = await res.json();

  return <PatientDetails patient={patient} />;
}
