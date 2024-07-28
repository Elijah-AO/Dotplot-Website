"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddPatientForm = () => {
  const [formData, setFormData] = useState({
    patient_name: '',
    age: '',
    height: '',
    weight: '',
    bc_history: '',
  });

  const [scan, setScan] = useState<File | null>(null);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setScan(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Step 1: Create the patient
      const patientResponse = await fetch('http://localhost:5000/api/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!patientResponse.ok) {
        const errorData = await patientResponse.json();
        alert('Failed to add patient: ' + (errorData.error || patientResponse.statusText));
        return;
      }

      const patientData = await patientResponse.json();

      if (scan) {
        // Step 2: Upload the scan for the created patient
        const scanFormData = new FormData();
        scanFormData.append('scan', scan);
        scanFormData.append('patient_id', patientData.id);

        const scanResponse = await fetch('http://localhost:5000/api/us-scan', {
          method: 'POST',
          body: scanFormData,
        });

        if (!scanResponse.ok) {
          const errorData = await scanResponse.json();
          alert('Failed to add scan: ' + (errorData.error || scanResponse.statusText));
          return;
        }
      }

      alert('Patient and scan added successfully');
      router.push('/patient'); // Redirect to patient list after patient has been aded
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-secondary">
        Add New Patient
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Patient Name</label>
          <input
            type="text"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            className="w-full p-4 pl-6 border rounded-full text-xs focus:text-lg transition-all duration-300 border-gray-300 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-4 pl-6 border rounded-full text-xs focus:text-lg transition-all duration-300 border-gray-300 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full p-4 pl-6 border rounded-full text-xs focus:text-lg transition-all duration-300 border-gray-300 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-4 pl-6 border rounded-full text-xs focus:text-lg transition-all duration-300 border-gray-300 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">
            History of Breast Cancer
          </label>
          <select
            name="bc_history"
            value={formData.bc_history}
            onChange={handleChange}
            className="w-full p-4 pl-6 border rounded-full text-xs mt-1"
            required
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Upload Scan</label>
          <input
            type="file"
            name="scan"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 hover:bg-blue-900 transition-all duration-300 rounded-full text-white mt-2"
          style={{
            marginTop: "2rem",
          }}
        >
          Add Patient
        </button>
      </form>
    </div>
  );
};
export default AddPatientForm;