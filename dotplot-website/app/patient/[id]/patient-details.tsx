import { usePathname } from "next/navigation";
import { IPatient } from "@/app/models/patient";

export default function PatientDetails({ patient }: { patient: IPatient }) {
  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
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
      </div>

      <h3 className="text-xl font-bold mb-4">Ultrasound Scans</h3>
      {patient.US_scans.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
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
