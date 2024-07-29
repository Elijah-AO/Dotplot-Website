"use client";
import { usePathname } from "next/navigation";
import { IPatient } from "@/app/models/patient";
import ExpandableImage from "./expandable-image";
import { useState } from "react";
import IUS_scan from "@/app/models/us_scan";
import Link from "next/link";
// import "./home.css";
import { useRouter } from "next/navigation";

export default function Scans({ scans }: { scans: IUS_scan[] }) {
  const router = useRouter();

  return (
    <>
      <div
        className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-md flex-1 min-w-150"
        style={{ backgroundColor: "#F0F8FF" }}
      >
        <h1 className="text-3xl font-bold mb-4 text-secondary">
          Ultrasound Scans
        </h1>
        {/* {patient.US_scans.length > 0 ? ( */}
        <div className="max-w-4xl mx-auto mt-6 p-4 shadow-md rounded-md">
          <table
            className="min-w-full bg-white border border-gray-200"
            style={{ backgroundColor: "#F0F8FF" }}
          >
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left">
                  Scan Date
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left">
                  Coordinates
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left">
                  Diagnosis
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left">
                  US Scan
                </th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan) => (
                <tr
                  key={scan.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    router.push(
                      "http://localhost:3000/patient/" + scan.patient_id
                    );
                  }}
                >
                  <td className="py-2 px-4 border-b">
                    {new Date(scan.scan_date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">{scan.coordinates}</td>
                  <td className="py-2 px-4 border-b">{scan.diagnosis}</td>
                  <td className="py-2 px-4 border-b flex items-center justify-center">
                    <ExpandableImage
                      src={`http://localhost:5000/api/us-scan/image/${scan.id}`}
                      alt={"ultrasound scan"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {scans.length == 0 && (
          <p className="text-gray-700">No ultrasound scans available.</p>
        )}
      </div>
    </>
  );
}
