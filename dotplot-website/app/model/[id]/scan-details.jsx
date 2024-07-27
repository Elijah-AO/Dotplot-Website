import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

export default function ScanDetails({ scan_id }) {
  const [scan, setScan] = useState(null > null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:5000/api/us-scan/${scan_id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setScan(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(`Failed to fetch scan data: ${err.message}`);
        setLoading(false);
      });
  }, [scan_id]);

  return (
    <div className="absolute top-10 left-10 bg-white bg-opacity-80 text-black p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-2">Scan Details</h2>
      {loading && (
        <div className=" flex items-center justify-center">
          <FaSpinner className="top-10 animate-spin text-gray-500 text-3xl" />
        </div>
      )}
      {!loading && (
        <>
          <div className="space-y-1">
            <div>
              <span className="font-semibold">Scan ID: </span>
              {scan.id}
            </div>
            <div>
              <span className="font-semibold">Coordinates: </span>
              {scan.coordinates}
            </div>
            <div>
              <span className="font-semibold">Scan Date: </span>
              {scan.scan_date}
            </div>
            <div>
              <span className="font-semibold">Diagnosis: </span>
              {scan.diagnosis}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
