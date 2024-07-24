"use client";

import Navbar from "@/app/components/Navbar";
import { IPatient } from "@/app/models/patient";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

type SortKey = keyof IPatient;

interface SortConfig {
  key: SortKey;
  direction: "ascending" | "descending";
}

export default function PatientList({ patients }: { patients: IPatient[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const router = useRouter();
  const getSortIndicator = (key: SortKey, title: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <span style={{ color: "black" }}>{title} ⇅</span>;
    }
    return sortConfig.direction === "ascending" ? (
      <span style={{ color: "red" }}>{title} ↑</span>
    ) : (
      <span style={{ color: "red" }}>{title} ↓</span>
    );
  };

  const sortedPatients = useMemo(() => {
    let sortablePatients = patients;
    if (sortConfig !== null) {
      patients.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortablePatients;
  }, [patients, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filteredPatients = sortedPatients.filter((patient) =>
    patient.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />
      <div className="container mx-auto p-4 content-center	">
        <div className="z-10 bg-white shadow-md p-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 p-2 border rounded-md w-full"
          />
        </div>
        <table className="min-w-full bg-white border border-gray-200 shadow-sm">
          <thead>
            <tr>
              <th
                className="p-3 border-b-2 border-gray-200 cursor-pointer text-center"
                onClick={() => requestSort("patient_name")}
              >
                {getSortIndicator("patient_name", "Name")}
              </th>
              <th
                className="p-3 border-b-2 border-gray-200 cursor-pointer text-center"
                onClick={() => requestSort("age")}
              >
                {getSortIndicator("age", "Age")}
              </th>
              <th
                className="p-3 border-b-2 border-gray-200 cursor-pointer text-center"
                onClick={() => requestSort("height")}
              >
                {getSortIndicator("height", "Height (cm)")}
              </th>
              <th
                className="p-3 border-b-2 border-gray-200 cursor-pointer text-center"
                onClick={() => requestSort("weight")}
              >
                {getSortIndicator("weight", "Weight (kg)")}
              </th>
              <th
                className="p-3 border-b-2 border-gray-200 cursor-pointer text-center"
                onClick={() => requestSort("bc_history")}
              >
                {getSortIndicator("bc_history", "BC History")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr
                onClick={() => {
                  router.push("/patient/" + patient.id);
                }}
                key={patient.id}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <td className="p-3 border-b text-center">
                  {patient.patient_name}
                </td>
                <td className="p-3 border-b text-center">{patient.age}</td>
                <td className="p-3 border-b text-center">{patient.height}</td>
                <td className="p-3 border-b text-center">{patient.weight}</td>
                <td className="p-3 border-b text-center">
                  {patient.bc_history ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!!patients && (
        <h1 className="text-center  text-xl">
          No Patients Found (is the backend running?)
        </h1>
      )}
    </div>
  );
}
