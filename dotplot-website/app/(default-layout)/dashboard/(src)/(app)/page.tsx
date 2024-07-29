import ECommerce from "../components/Dashboard/dashboard";
import { Metadata } from "next";
import { IPatient } from "@/app/models/patient";
import IUS_scan from "@/app/models/us_scan";
import { useState, useEffect } from "react";

// export const metadata: Metadata = {
//   title:
//     "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
//   description: "This is Next.js Home for TailAdmin Dashboard Template",
// };

export default async function Home() {
  const res = await fetch("http://localhost:5000/api/patient");
  var patients = await res.json();
  const res2 = await fetch("http://localhost:5000/api/us-scan");
  var scans = await res2.json();
  return (
    <>
      <ECommerce patients={patients} scans={scans} />
    </>
  );
}
