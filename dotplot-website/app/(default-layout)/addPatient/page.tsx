"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AddPatientForm = () => {
  const [formData, setFormData] = useState({
    patient_name: "",
    age: "",
    height: "",
    weight: "",
    bc_history: "",
  });
  const router = useRouter();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/patient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      alert("Patient added successfully");
      router.push("/patient"); // Redirect to patient list
    } else {
      alert("Failed to add patient");
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
