"use client";
import { useState } from "react";
import React from "react";

import ModelViewer from "./model-viewer";

export default function Model({ params }) {
  const [isViewing, setIsViewing] = useState(true);
  Model.getLayout = function toggleIsViewing() {
    setIsViewing(!isViewing);
  };
  return (
    <>
      {isViewing && (
        <div className="flex items-center justify-center mt-4 ml-10 mb-10">
          <a
            className="btn"
            id="view"
            onClick={toggleIsViewing}
            href="#manipulate"
          >
            manipulate model
          </a>
        </div>
      )}
      <ModelViewer params={params} />
      {!isViewing && (
        <div className="flex justify-center items-center">
          <a
            onClick={toggleIsViewing}
            href="#"
            id="manipulate"
            className="btn absolute text-center ml-10"
            style={{
              top: "60rem",
            }}
          >
            Back to View
          </a>
        </div>
      )}
    </>
  );
}
