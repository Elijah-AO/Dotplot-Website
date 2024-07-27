import { usePathname } from "next/navigation";
import { IPatient } from "@/app/models/patient";
import ExpandableImage from "./expandable-image";
import Link from "next/link";
import "./home.css";

export default function PatientDetails({ patient }: { patient: IPatient }) {
  return (
    <div
      className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-md flex-1"
      style={{ backgroundColor: "#F0F8FF" }}
    >
      <h2 className="text-2xl font-bold mb-4">Patient Details</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-lg font-semibold">Name:</p>
          <p className="text-gray-700">{patient.patient_name}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Age:</p>
          <p className="text-gray-700">{patient.age}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Height:</p>
          <p className="text-gray-700">{patient.height} cm</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Weight:</p>
          <p className="text-gray-700">{patient.weight} kg</p>
        </div>
        <div className="col-span-2">
          <p className="text-lg font-semibold">Breast Cancer History:</p>
          <p className="text-gray-700">{patient.bc_history ? "Yes" : "No"}</p>
        </div>
        <div className="">
          <p className="text-lg font-semibold">View 3D Model</p>
          <Link className="btn ml-2 mt-4" href={`/model/${patient.id}`}>
            View model
          </Link>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4">Ultrasound Scans</h3>
      {patient.US_scans.length > 0 ? (
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
            {patient.US_scans.map((scan) => (
              <tr key={scan.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">
                  {new Date(scan.scan_date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">{scan.coordinates}</td>
                <td className="py-2 px-4 border-b">{scan.diagnosis}</td>
                <td className="py-2 px-4 border-b flex items-center justify-center">
                  <ExpandableImage
                    src={`http://localhost:5000/api/us-scan/image/${scan.id}`}
                    alt={"ultrasound scan"}
                  ></ExpandableImage>
                  {/* <img
                    alt={"ultrasound scan"}
                    src={`http://localhost:5000/api/us-scan/${patient.US_scans[0].id}`}
                    className="object-scale-down hover:brightness-50"
                  ></img> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-700">No ultrasound scans available.</p>
      )}
    </div>
  );
}
