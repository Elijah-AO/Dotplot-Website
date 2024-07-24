"use client";

import Dropdown from "../components/dropdown";
import { IPatient } from "@/app/models/patient";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

type SortKey = keyof IPatient;

interface SortConfig {
  key: SortKey;
  direction: "ascending" | "descending";
}

const titleToProp: { [key: string]: keyof IPatient } = {
  Id: "id",
  Name: "patient_name",
  Age: "age",
  Height: "height",
  Weight: "weight",
  "BC History": "bc_history",
};
type TitleToPropKeys = keyof typeof titleToProp;

export default function PatientList({ patients }: { patients: IPatient[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [filterKey, setFilterKey] = useState<TitleToPropKeys>("Name");
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

  function filteredPatients(key: keyof IPatient) {
    return sortedPatients.filter((patient: IPatient) =>
      String(patient[key]).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  function onSelect(option: TitleToPropKeys) {
    setFilterKey(option);
  }

  return (
    <div id="1" className="flex flex-col justify-center items-center">
      <div className="container mx-auto p-4 content-center ">
        <div className="z-10 bg-white shadow-md p-4 flex flex-row">
          <input
            type="text"
            placeholder={`Search by ${filterKey}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 p-4 border rounded-md w-full"
          />
          <Dropdown
            options={["Id", "Name", "Age", "Height", "Weight", "BC History"]}
            onSelect={onSelect}
            buttonText={
              <span>
                Search by <strong className="font-bold">{filterKey}</strong>:▼
              </span>
            }
          ></Dropdown>
        </div>
        <table className="min-w-full bg-white border border-gray-200 shadow-sm">
          <thead>
            <tr>
              <th
                className="p-3 border-b-2 border-gray-200 cursor-pointer text-center"
                onClick={() => requestSort("id")}
              >
                {getSortIndicator("id", "Id")}
              </th>
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
            {filteredPatients(titleToProp[filterKey]).map((patient) => (
              <tr
                onClick={() => {
                  router.push("/patient/" + patient.id);
                }}
                key={patient.id}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <td className="p-3 border-b text-center">{patient.id}</td>
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
      {!filteredPatients(titleToProp[filterKey]).length && (
        <h1 className="text-center text-xl">No Patients Found</h1>
      )}
    </div>
  );
}
