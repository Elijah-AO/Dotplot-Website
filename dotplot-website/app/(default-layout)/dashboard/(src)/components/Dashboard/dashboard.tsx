"use client";
import dynamic from "next/dynamic";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import { useEffect, useState } from "react";
import { IPatient } from "@/app/models/patient";
import IUS_scan from "@/app/models/us_scan";
import Image from "next/image";
import { useRouter } from "next/navigation";

// const MapOne = dynamic(() => import("../../components/Maps/MapOne"), {
//   ssr: false,
// });

const ChartThree = dynamic(() => import("../Charts/ChartThree"), {
  ssr: false,
});

function ECommerce({
  patients,
  scans,
}: {
  patients: IPatient[];
  scans: IUS_scan[];
}) {
  const router = useRouter();
  const nullScans = scans.filter((scan) => {
    return scan.patient_id == null;
  });

  const anyScansNull = scans.some((scan) => {
    return scan.patient_id == null;
  });
  return (
    <>
      {anyScansNull && (
        <>
          <div className="mt-4 mb-6 shadow-lg bg-red-600 text-sm text-white rounded-lg p-4">
            <div className="flex items-center justify-between align-middle m-4 mt-0">
              <h4 className=" text-xl font-normal text-white ">
                ⚠ Warning: scan with no linked patient
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-center">Scan ID</th>
                    <th className="py-3 px-6 text-center">Coordinates</th>
                    <th className="py-3 px-6 text-center">Diagnosis</th>
                    <th className="py-3 px-6 text-center">Scan Date</th>
                    <th className="py-3 px-6 text-center">Patient ID</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {nullScans.map((scan) => (
                    <tr
                      key={scan.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 font-normal text-lg text-center">
                        {scan.id}
                      </td>
                      <td className="py-3 px-6 font-normal text-lg text-center">
                        {scan.coordinates}
                      </td>

                      <td className="py-3 px-6 font-normal text-lg text-center">
                        {scan.diagnosis}
                      </td>
                      <td className="py-3 px-6 font-normal text-lg text-center">
                        {scan.scan_date.toString().slice(5, 16)}
                      </td>
                      <td className="flex items-center align-middle justify-center">
                        <button
                          onClick={() => {
                            router.push(`/assignPatient/${scan.id}`);
                          }}
                          className="btn text-white"
                        >
                          Assign patient
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Total Patients"
          total={String(patients.length)}
          rate="0.43%"
          levelUp
        >
          <svg
            className="fill-secondary dark:fill-black "
            width="24"
            height="18"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
              fill=""
            />
            <path
              d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats
          title="Total Scans"
          total={String(scans.length)}
          rate="4.35%"
          levelUp
        >
          <Image
            className="rounded-xl"
            src="/camera.png"
            alt="logo"
            width={150}
            height={50}
          />
        </CardDataStats>

        <CardDataStats title="Total Users" total="356" rate="1.15%" levelUp>
          <svg
            className="fill-secondary dark:fill-black"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
              fill=""
            />
            <path
              d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
              fill=""
            />
            <path
              d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats
          title="Scans in Lask Month"
          total="12"
          rate="2.59%"
          levelDown
        >
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 30 30"
            className="fill-black"
          >
            <path d="M9.731,14.075c-1.387,0.252 -2.676,0.921 -3.687,1.932c-1.309,1.309 -2.044,3.084 -2.044,4.935l0,4.039c0,1.657 1.343,3 3,3c4.184,-0 13.816,-0 18,-0c1.657,-0 3,-1.343 3,-3l0,-4.039c0,-1.851 -0.735,-3.626 -2.044,-4.935c-1.011,-1.011 -2.3,-1.68 -3.687,-1.932c0.468,-0.939 0.731,-1.997 0.731,-3.117c0,-3.863 -3.137,-7 -7,-7c-3.863,0 -7,3.137 -7,7c0,1.12 0.263,2.178 0.731,3.117Zm11.169,1.88c-1.262,1.239 -2.993,2.003 -4.9,2.003c-1.907,0 -3.638,-0.764 -4.9,-2.003c-0.04,0.005 -0.08,0.007 -0.12,0.007c-1.321,0 -2.588,0.525 -3.521,1.459c-0.934,0.934 -1.459,2.201 -1.459,3.521c0,0 0,4.039 0,4.039c0,0.552 0.448,1 1,1l18,-0c0.552,-0 1,-0.448 1,-1c-0,-0 0,-4.039 0,-4.039c0,-1.32 -0.525,-2.587 -1.459,-3.521c-0.933,-0.934 -2.2,-1.459 -3.521,-1.459c-0.04,0 -0.08,-0.002 -0.12,-0.007Zm-4.9,-9.997c2.76,0 5,2.241 5,5c0,2.76 -2.24,5 -5,5c-2.76,0 -5,-2.24 -5,-5c0,-2.759 2.24,-5 5,-5Z" />
            <path d="M20,20.008l-1,-0c-0.552,-0 -1,0.448 -1,1c-0,0.552 0.448,1 1,1l1,-0l0,1c-0,0.552 0.448,1 1,1c0.552,-0 1,-0.448 1,-1l0,-1l1,-0c0.552,-0 1,-0.448 1,-1c-0,-0.552 -0.448,-1 -1,-1l-1,-0l0,-1c-0,-0.552 -0.448,-1 -1,-1c-0.552,-0 -1,0.448 -1,1l0,1Z" />
          </svg>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 w-max ">
        <div className="col-span-12 xl:col-span-12 shadow-xl">
          <TableOne patients={patients} />
        </div>
        <ChartOne scans={scans} />
        <ChartTwo patients={patients} />
        <ChartThree scans={scans} />
        {/* <MapOne /> */}

        {/* <ChatCard /> */}
      </div>
    </>
  );
}

export default ECommerce;
