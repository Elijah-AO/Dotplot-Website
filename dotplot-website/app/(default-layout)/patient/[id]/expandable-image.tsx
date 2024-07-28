"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { LuExpand } from "react-icons/lu";

interface Props {
  src: string;
  alt: string;
}

export default function ExpandableImage({ src, alt }: Props) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Handler when image is loaded
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Handler when image fails to load
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const toggleFullscreen = (e: any) => {
    e.stopPropagation();
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <div
        className={`relative ${
          isFullscreen
            ? "inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
            : "hover:brightness-75 w-24	 h-24 flex items-center justify-center"
        }`}
        onClick={toggleFullscreen}
        style={{
          cursor: isFullscreen ? "zoom-out" : "pointer",
          transition: "all 0.5s ease-in-out",
          position: isFullscreen ? "fixed" : "relative",
        }}
      >
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <FaSpinner className="animate-spin text-gray-500 text-3xl" />
          </div>
        )}
        <img
          alt={alt}
          src={src}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-all duration-500 ${
            isFullscreen
              ? "w-auto h-auto max-w-full max-h-full"
              : "object-scale-down hover:brightness-50"
          }`}
          style={{
            transition: "transform 0.5s ease-in-out",
            position: isFullscreen ? "fixed" : "relative",
            transform: isFullscreen ? "scale(1.8)" : "scale(1)",
            maxHeight: isFullscreen ? "30vh" : "100px", // Initial height for non-fullscreen
            maxWidth: isFullscreen ? "30vw" : "100px", // Initial width for non-fullscreen
          }}
        />

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <p className="text-gray-700 text-center">No Image</p>
          </div>
        )}
        {!isFullscreen && (
          <div className="absolute inset-0 flex justify-center items-center opacity-0 active:pointer-events-none hover:opacity-100 transition-opacity duration-300">
            <LuExpand className="text-white text-4xl" />
          </div>
        )}
      </div>
    </>
  );
}
