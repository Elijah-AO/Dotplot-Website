"use client";
// import "jsvectormap/dist/jsvectormap.css";
// import "flatpickr/dist/flatpickr.min.css";
import "../css/satoshi.css";
import "../css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "../components/common/Loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className=" p-20 rounded shadow-xl w-max bg-primary">
      {loading ? (
        <div className="w-max bg-primary">
          <Loader />
        </div>
      ) : (
        children
      )}
    </div>
  );
}