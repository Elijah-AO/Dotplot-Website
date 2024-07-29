"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
import IUS_scan from "@/app/models/us_scan";
import { count } from "console";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark", // You can set this to 'light' or 'dark'
    style: {
      fontSize: "12px",
      fontFamily: undefined,
      // colors: ['#ff0000'], // Array of colors to apply to the text
    },
    // You can also use the custom property to format tooltips
    // custom: ({ series, seriesIndex, dataPointIndex, w }) => {
    //   return `<div style="color: red">${series[seriesIndex][dataPointIndex]}</div>`;
    // },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: [
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 10,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}
function countScansPerMonth(scans: IUS_scan[]) {
  // Initialize arrays for storing counts
  const totalScansPerMonth = new Array(12).fill(0); // [0, 0, ..., 0]
  const malignantScansPerMonth = new Array(12).fill(0);

  // Get current date and one year ago date
  const currentDate = new Date();
  const oneYearAgo = new Date(
    currentDate.getFullYear() - 1,
    currentDate.getMonth() + 1,
    1
  );

  scans.forEach((scan) => {
    const scanDate = new Date(scan.scan_date);

    // Only process scans from the past year
    if (scanDate >= oneYearAgo && scanDate <= currentDate) {
      const monthIndex = scanDate.getMonth();

      // Increment total scans count for the month
      totalScansPerMonth[monthIndex]++;

      // Increment malignant scans count if the diagnosis is malignant
      if (scan.diagnosis.toLowerCase() === "malignant") {
        malignantScansPerMonth[monthIndex]++;
      }
    }
  });

  return { totalScansPerMonth, malignantScansPerMonth };
}

function ChartOne({ scans }: { scans: IUS_scan[] }) {
  const { totalScansPerMonth, malignantScansPerMonth } =
    countScansPerMonth(scans);
  const series = [
    {
      name: "Total Scans",
      data: totalScansPerMonth,
    },

    {
      name: "Malignant Scans",
      data: malignantScansPerMonth,
    },
  ];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 p-10 shadow-lg dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-blue-700"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Total Scans</p>
              <p className="text-sm text-secondary font-medium">
                12.04.2022 - 12.05.2022
              </p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-500"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Malignant scans</p>
              <p className="text-sm text-secondary font-medium">
                12.04.2022 - 12.05.2022
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white px-3 py-1 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-slate-100 dark:text-black dark:hover:bg-slate-200">
              Year
            </button>
            <button className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-black dark:hover:bg-slate-200">
              Month
            </button>
            <button className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-black dark:hover:bg-slate-200">
              Week
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
}

export default ChartOne;
