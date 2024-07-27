import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

export default function PatientDetails({ patient_id }) {
  const [patient, setPatient] = useState(null > null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:5000/api/patient/${patient_id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPatient(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(`Failed to fetch scan data: ${err.message}`);
        setLoading(false);
      });
  }, [patient_id]);

  return (
    <div className="absolute top-0 right-0 m-4 bg-white bg-opacity-80 text-black p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-2">Patient Details</h2>
      {loading && (
        <div className=" flex items-center justify-center">
          <FaSpinner className="top-10 animate-spin text-gray-500 text-3xl" />
        </div>
      )}
      {!loading && (
        <>
          <div className="space-y-1">
            <div>
              <span className="font-semibold">Patient ID: </span>
              {patient.id}
            </div>
            <div>
              <span className="font-semibold">Name: </span>
              {patient.patient_name}
            </div>
            <div>
              <span className="font-semibold">Age: </span>
              {patient.age}
            </div>
            <div>
              <span className="font-semibold">Height (cm): </span>
              {patient.height}
            </div>
            <div>
              <span className="font-semibold">Weight (kg): </span>
              {patient.weight}
            </div>
            <div>
              <span className="font-semibold">BC History: </span>
              {patient.bc_history ? "Yes" : "No"}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
