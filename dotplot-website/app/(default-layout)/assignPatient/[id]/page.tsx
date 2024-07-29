import AssignPatient from "./patient-list";
import { IPatient } from "@/app/models/patient";
import IUS_scan from "@/app/models/us_scan";
import Typography from "@/app/components/typography";

export default async function Patients({ params }: { params: { id: string } }) {
  var patients: IPatient[] = [];
  const { id } = params;

  try {
    const res = await fetch("http://localhost:5000/api/patient");
    var patients: IPatient[] = await res.json();
    const res2 = await fetch("http://localhost:5000/api/us-scan/" + id);
    var scan: IUS_scan = await res2.json();
  } catch (error) {
    return {
      message: "error messaging backend",
    };
  }
  return (
    <div className="flex justify-center items-center flex-col">
      <Typography className="max-w-xl mb-6 text-center" variant="h2">
        Select Patient to Assign the Following Scan:
      </Typography>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white mb-4">
          <thead>
            <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">Scan ID</th>
              <th className="py-3 px-6 text-center">Coordinates</th>
              <th className="py-3 px-6 text-center">Diagnosis</th>
              <th className="py-3 px-6 text-center">Scan Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            <tr
              key={scan.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-center">{scan.id}</td>
              <td className="py-3 px-6 text-center">{scan.coordinates}</td>

              <td className="py-3 px-6 text-center">{scan.diagnosis}</td>
              <td className="py-3 px-6 text-center">
                {scan.scan_date.toString().slice(5, 16)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <AssignPatient patients={patients} scan_id={Number(id)} />
    </div>
  );
}
