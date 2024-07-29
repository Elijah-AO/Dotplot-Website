"use client";
import { usePathname } from "next/navigation";
import { IPatient } from "@/app/models/patient";
import ExpandableImage from "./expandable-image";
import { useState } from "react";
import IUS_scan from "@/app/models/us_scan";
import Link from "next/link";
import "./home.css";
import { useRouter } from "next/navigation";
import ConfirmModal from "./confirm-modal";

export default function PatientDetails({ patient }: { patient: IPatient }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [currPatient, setCurrPatient] = useState<IPatient>(patient);
  const [newScan, setNewScan] = useState<{
    scan_date: string;
    coordinates: string;
    diagnosis: string;
    image: File | null;
  }>({
    scan_date: "",
    coordinates: "",
    diagnosis: "",
    image: null, // New state for image upload
  });
  const [editingScanId, setEditingScanId] = useState<number | null>(null);
  const [editedScan, setEditedScan] = useState<Partial<IUS_scan> | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedScan, setSelectedScan] = useState<IUS_scan | null>(null);
  const openModal = (scan: IUS_scan) => {
    setSelectedScan(scan);
    setIsModalOpen(true);
  };
  const router = useRouter();
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewScan({ ...newScan, [name]: value });
  };

  const handleImageUpload = (current_scan_id: number) => {
    if (!selectedImage) {
      // alert("Please select a PNG image to upload.");
      return;
    }

    if (!selectedImage.name.toLowerCase().endsWith(".png")) {
      alert("Only PNG images are supported.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = fetch(
        "http://localhost:5000/api/us-scan/image/" + current_scan_id,
        {
          method: "POST",
          body: formData,
        }
      ).then(() => {
        console.log("finished");
      });

      // if (response.ok) {
      //   const result = await response.json();
      //   setUploadMessage(result.success || "Image uploaded successfully.");
      // } else {
      //   const errorResult = await response.json();
      //   setUploadMessage(errorResult.error || "Image upload failed.");
      // }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadMessage("An error occurred during the upload.");
    }
  };

  function handleDeleteScan() {
    let scan = selectedScan;
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this scan?"
    );

    if (!userConfirmed) {
      // User canceled the deletion
      return;
    }
    console.log("id: " + scan.id);
    const res = fetch(`http://localhost:5000/api/us-scan/${scan.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrPatient((prevPatient) => ({
          ...prevPatient,
          US_scans: prevPatient.US_scans.filter((s) => s.id !== scan.id),
        }));
        setIsModalOpen(false);
        // router.push("/dashboard");
        // router.refresh();
      });
  }

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setNewScan({ ...newScan, image: file });
    setSelectedImage(file);
  };

  const handleEditInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditedScan({ ...editedScan, [name]: value });
  };

  const handleAddScan = () => {
    setShowForm(!showForm);
  };

  const handleEditScan = (scan: IUS_scan) => {
    setEditingScanId(scan.id);
    setEditedScan({ ...scan });
  };

  const handleCancelEdit = () => {
    setEditingScanId(null);
    setEditedScan(null);
  };

  const handleSubmit = async () => {
    // Validate coordinates format
    const coordinateRegex = /^([A-Z]|[a-z])[0-9]$/;
    if (!coordinateRegex.test(newScan.coordinates)) {
      alert("Coordinates must be in the form [A-Z][0-9].");
      return;
    }

    // Create a FormData object to send the image
    const formData = new FormData();
    formData.append("scan_date", newScan.scan_date);
    formData.append("coordinates", newScan.coordinates.toUpperCase());
    formData.append("diagnosis", newScan.diagnosis);

    try {
      // Simulate API request for creating a new scan
      console.log("Submitting new scan:", formData);

      // Here you would typically use fetch or axios to send the formData to your API

      const scan = {
        scan_date: new Date(newScan.scan_date).toLocaleDateString(), // Convert string to Date
        coordinates: newScan.coordinates.toUpperCase(),
        diagnosis: newScan.diagnosis,
        patient_id: patient.id,
      };
      console.log(JSON.stringify(scan));

      const res = fetch(`http://localhost:5000/api/us-scan`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(scan),
      })
        .then((response) => response.json())
        .then((data) => {
          let id = data.id;
          const new_scan = {
            id: data.id, // Example ID generation
            scan_date: new Date(newScan.scan_date), // Convert string to Date
            coordinates: newScan.coordinates.toUpperCase(),
            diagnosis: newScan.diagnosis,
            patient_id: patient.id,
          };
          // patient.US_scans.push();
          setCurrPatient((prevPatient) => ({
            ...prevPatient,
            US_scans: prevPatient.US_scans.concat([new_scan]),
          }));

          handleImageUpload(id);

          // router.push("/dashboard");
          // router.refresh();
        });

      console.log(scan);
      setShowForm(false); // Hide the form after submission
      setNewScan({
        scan_date: "",
        coordinates: "",
        diagnosis: "",
        image: null,
      });
    } catch (error) {
      console.error("Error submitting new scan:", error);
    }
  };

  const handleEditSubmit = async () => {
    if (!editedScan) return;
    if (editingScanId != null) {
      handleImageUpload(editingScanId);
    }
    // Validate coordinates format
    const coordinateRegex = /^([A-Z]|[a-z])[0-9]$/;
    if (
      editedScan.coordinates &&
      !coordinateRegex.test(editedScan.coordinates)
    ) {
      alert("Coordinates must be in the form [A-Z][0-9].");
      return;
    }

    try {
      // Simulate API request for updating an existing scan
      console.log("Updating scan:", editedScan);
      const res = fetch(`http://localhost:5000/api/us-scan/${editedScan.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(editedScan),
      })
        .then((response) => response.json())
        .then((data) => {
          // router.push("/dashboard");
          // router.refresh();
        });
      // Update the scan in the patient's scan list
      const scanIndex = patient.US_scans.findIndex(
        (scan) => scan.id === editingScanId
      );
      if (scanIndex !== -1) {
        patient.US_scans[scanIndex] = {
          ...patient.US_scans[scanIndex],
          ...editedScan,
          scan_date: new Date(
            editedScan.scan_date || patient.US_scans[scanIndex].scan_date
          ),
        };
      }

      setEditingScanId(null);
      setEditedScan(null);
    } catch (error) {
      console.error("Error updating scan:", error);
    }
  };
  return (
    <>
      <div
        className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-md flex-1 min-w-150"
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
          <div className="">
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
        {/* {patient.US_scans.length > 0 ? ( */}
        <div className="max-w-4xl mx-auto mt-6 p-4 shadow-md rounded-md">
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
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currPatient.US_scans.map((scan) =>
                editingScanId === scan.id ? (
                  <tr key={scan.id} className="bg-gray-50">
                    <td className="py-2 px-4 border-b">
                      <input
                        type="date"
                        name="scan_date"
                        value={
                          editedScan?.scan_date?.toString().substring(0, 10) ||
                          ""
                        }
                        onChange={handleEditInputChange}
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="text"
                        name="coordinates"
                        value={editedScan?.coordinates || ""}
                        onChange={handleEditInputChange}
                        className="w-full border rounded px-2 py-1"
                        placeholder="Coordinates"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <select
                        name="diagnosis"
                        value={editedScan?.diagnosis}
                        onChange={handleEditInputChange}
                        className="w-full border rounded px-2 py-1 min-w-max"
                      >
                        <option value={"Malignant"}>Malignant</option>
                        <option value={"Benign"}>Benign</option>
                      </select>
                    </td>
                    <td className="py-2 px-4 pl-0 border-b text-center">
                      <input
                        type="file"
                        accept="image/png"
                        onChange={(e) => handleImageChange(e)}
                        className="w-full pl-0"
                      />
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <div className="flex flex-col p-2 w-34">
                        <button
                          onClick={handleEditSubmit}
                          className="bg-green-500 mb-2 text-white py-1 px-3 rounded mr-2 w-full"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-red-500 text-white py-1 px-3 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
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
                      />
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <div className="flex flex-col">
                        <button
                          onClick={() => handleEditScan(scan)}
                          className="bg-blue-500 mb-2 text-white py-1 px-3 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openModal(scan)}
                          className="bg-red-500 text-white py-1 px-3 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
              {showForm && (
                <tr className="bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    <input
                      type="date"
                      name="scan_date"
                      value={newScan.scan_date}
                      onChange={handleInputChange}
                      className="w-full border rounded px-2 py-1"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="coordinates"
                      value={newScan.coordinates}
                      onChange={handleInputChange}
                      className="w-20 border rounded px-2 py-1 "
                      placeholder="Coords"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <select
                      name="diagnosis"
                      value={newScan.diagnosis}
                      onChange={handleInputChange}
                      className="w-full border rounded px-2 py-1 min-w-max"
                    >
                      <option value={"Malignant"}>Malignant</option>
                      <option value={"Benign"}>Benign</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 pl-0 border-b text-center">
                    <input
                      type="file"
                      accept="image/png"
                      onChange={handleImageChange}
                      className="w-full pl-0"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={handleSubmit}
                      className="bg-green-500 text-white py-1 px-3 rounded"
                    >
                      Submit
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAddScan}
                className=" btn text-white py-2 px-4 rounded"
              >
                {showForm ? "Cancel" : "+ Add New Scan"}
              </button>
            </div>
          }
        </div>

        {patient.US_scans.length == 0 && (
          <p className="text-gray-700">No ultrasound scans available.</p>
        )}
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleDeleteScan}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
}
