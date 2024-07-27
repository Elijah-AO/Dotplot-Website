import React from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";

import ModelViewer from "./model-viewer";

export default function Model({ params }) {
  return <ModelViewer params={params} />;
}

// import { IPatient } from "@/app/models/patient";
// import PatientDetails from "./patient-details";
// import Navbar from "@/app/components/Navbar";
// import Link from "next/link";

// export default async function Patient({ params }: { params: { id: string } }) {
//   const { id } = params;
//   const res = await fetch(`http://localhost:5000/api/patient/${id}`);
//   const patient: IPatient = await res.json();

//   return (
//     <>
//       <div className="flex flex-row">
//         <Link
//           className="m-3 bg-black h-min p-3 hover:bg-gray-900 hover:shadow-md rounded-md text-gray-100 hover:text-gray-400 transition-all duration-200 "
//           href={"/patient"}
//         >
//           {"<- Back"}
//         </Link>

//         <PatientDetails patient={patient} />
//         <Link
//           className="m-2 p-2 opacity-0 pointer-events-none"
//           href={"/patient"}
//         >
//           {"<- Back"}
//         </Link>
//       </div>
//     </>
//   );
// }
