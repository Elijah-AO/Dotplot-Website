"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmModal from "./confirm-modal";

function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  function deletePatient() {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!userConfirmed) {
      // User canceled the deletion
      return;
    }
    const res = fetch(`http://localhost:5000/api/patient/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        router.push("/patient");
      });
  }

  return (
    <>
      <button
        className="btn bg-red-500 mt-4 text-xl pb-10 pt-3 text-center text-white w-fit rounded hover:bg-red-700"
        onClick={openModal}
      >
        Delete Patient
      </button>
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={deletePatient}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default DeleteButton;
