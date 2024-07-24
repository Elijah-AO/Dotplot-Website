// "use client";
// import { usePathname } from "next/navigation";
import { IPatient } from "@/app/models/patient";
import PatientDetails from "./patient-details";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";

export default async function Patient({ params }: { params: { id: string } }) {
  // console.log(params);
  // const pathname = usePathname();
  // const patient_id = pathname.split("/").at(-1);
  const { id } = params;
  const res = await fetch(`http://localhost:5000/api/patient/${id}`);
  const patient: IPatient = await res.json();
  // const res2 = await fetch(`http://localhost:5000/api/us-scan/${patient.id}`);
  // const image = await res2.blob;

  return (
    <>
      <Navbar />
      <PatientDetails patient={patient} />
    </>
  );
}
