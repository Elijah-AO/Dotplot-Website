"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
import { IPatient } from "@/app/models/patient";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const ageGroups = [
  "0-9",
  "10-19",
  "20-29",
  "30-39",
  "40-49",
  "50-59",
  "60-69",
  "70-79",
  "80-89",
  "90-100",
];
const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 400,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
    },
    dropShadow: {
      enabled: true,
      top: -2,
      left: 2,
      blur: 4,
      color: "#000",
      opacity: 0.1,
    },
  },
  colors: ["#2e3cab", "#80CAEE"],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 1,
      columnWidth: "65%",
      // endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
    style: {
      colors: ["#444"],
      fontSize: "12px",
      fontWeight: 600,
    },
  },
  xaxis: {
    categories: ageGroups,
    labels: {
      style: {
        fontSize: "14px",
        fontWeight: 500,
        colors: ["#333"],
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        fontSize: "14px",
        fontWeight: 500,
        colors: ["#333"],
      },
    },
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "right",
    fontSize: "14px",
    fontWeight: 600,
    labels: {
      colors: "#333",
      useSeriesColors: false,
    },

    itemMargin: {
      horizontal: 15,
      vertical: 8,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      shadeIntensity: 0.3,
      gradientToColors: ["#3C50E0", "#80CAEE"],
      inverseColors: false,
      opacityFrom: 0.85,
      opacityTo: 0.95,
      stops: [0, 100],
    },
  },
  grid: {
    borderColor: "#e7e7e7",
    strokeDashArray: 4,
  },
  tooltip: {
    theme: "dark",
    y: {
      formatter: (val: number) => `${val}`,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            columnWidth: "75%",
          },
        },
      },
    },
  ],
};

function ChartTwo({ patients }: { patients: IPatient[] }) {
  // Define age groups

  // Count patients with bc_history true for each age group
  const counts_BC = ageGroups.map((group) => {
    const [minAge, maxAge] = group.split("-").map(Number);
    return patients.filter((patient) => {
      return (
        patient.bc_history &&
        patient.age >= minAge &&
        (maxAge ? patient.age <= maxAge : true)
      );
    }).length;
  });
  const counts = ageGroups.map((group) => {
    const [minAge, maxAge] = group.split("-").map(Number);
    return patients.filter((patient) => {
      return patient.age >= minAge && (maxAge ? patient.age <= maxAge : true);
    }).length;
  });
  const series = [
    {
      name: "No. Patients",
      data: counts,
    },
    {
      name: "No. Patients (w/BC history)",
      data: counts_BC,
    },
    // {
    //   name: "Revenue",
    //   data: [13, 23, 20, 8, 13, 27, 15],
    // },
  ];

  return (
    <div className="col-span-12 text-black rounded-sm border border-stroke bg-white p-10 shadow-lg dark:border-strokedark dark:bg-boxdark xl:col-span-8">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black">
            No. Patients by Age Group
          </h4>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            {/* <select
              name="#"
              id="#"
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
            >
              <option value="" className="dark:bg-boxdark">
                This Week
              </option>
              <option value="" className="dark:bg-boxdark">
                Last Week
              </option>
            </select> */}
            {/* <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                  fill="#637381"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z"
                  fill="#637381"
                />
              </svg>
            </span> */}
          </div>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={400}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
}

export default ChartTwo;
