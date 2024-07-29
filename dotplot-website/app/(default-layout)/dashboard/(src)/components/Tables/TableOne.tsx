import { IPatient } from "@/app/models/patient";
import IUS_scan from "@/app/models/us_scan";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

interface RecentScan {
  id: number;
  coordinates: string;
  scan_date: Date;
  diagnosis: string;
  patient_name: string;
  patient_id: number;
}

function TableOne({ patients }: { patients: IPatient[] }) {
  const allScans: RecentScan[] = patients.flatMap((patient) => {
    return patient.US_scans.map((scan) => ({
      id: scan.id,
      coordinates: scan.coordinates,
      scan_date: scan.scan_date,
      diagnosis: scan.diagnosis,
      patient_name: patient.patient_name,
      patient_id: scan.patient_id,
    }));
  });

  // Sort scans by date (most recent first)
  const sortedScans = allScans.sort(
    (a, b) => new Date(b.scan_date).getTime() - new Date(a.scan_date).getTime()
  );
  console.log(sortedScans);

  // Take the top 5 most recent scans
  const recentScans = sortedScans.slice(0, 5);
  const router = useRouter();
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex items-center mb-4 mt-0 justify-between align-middle">
        <h4 className="text-xl font-semibold text-black ">Recent Scans</h4>
        <button className="btn text-white">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Patient Name</th>
              <th className="py-3 px-6 text-left">Scan ID</th>
              <th className="py-3 px-6 text-left">Coordinates</th>
              <th className="py-3 px-6 text-left">Diagnosis</th>
              <th className="py-3 px-6 text-left">Scan Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light cursor-pointer">
            {recentScans.map((scan) => (
              <tr
                key={scan.id}
                onClick={() => {
                  router.push(`/patient/${scan.patient_id}`);
                }}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {scan.patient_name}
                </td>
                <td className="py-3 px-6 text-left">{scan.id}</td>
                <td className="py-3 px-6 text-left">{scan.coordinates}</td>

                <td className="py-3 px-6 text-left">{scan.diagnosis}</td>
                <td className="py-3 px-6 text-left">
                  {scan.scan_date.toString().slice(5, 16)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Source
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Visitors
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Revenues
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Sales
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Conversion
            </h5>
          </div>
        </div> */}

      {/* {patients.map((patient) => (
          <div className={`grid grid-cols-3 sm:grid-cols-5 `}>
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <Image src={brand.logo} alt="Brand" width={48} height={48} />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {brand.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.visitors}K</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">${brand.revenues}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.sales}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{brand.conversion}%</p>
            </div>
          </div>
        ))} */}
    </div>
    // </div>
  );
}

export default TableOne;
