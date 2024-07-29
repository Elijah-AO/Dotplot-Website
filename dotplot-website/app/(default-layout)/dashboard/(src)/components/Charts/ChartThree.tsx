import IUS_scan from "@/app/models/us_scan";
import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
    },
    dropShadow: {
      enabled: true,
      top: 5,
      left: 0,
      blur: 3,
      color: "#000",
      opacity: 0.2,
    },
  },
  colors: ["#080871", "#00b9fb"],
  labels: ["Benign", "Malignant"],
  legend: {
    show: true,
    position: "bottom",
    horizontalAlign: "center",
    fontSize: "16px",
    fontWeight: 600,
    markers: {
      // width: 12,
      // height: 12,
      // radius: 12,
    },
    itemMargin: {
      horizontal: 10,
      vertical: 5,
    },
  },
  plotOptions: {
    pie: {
      donut: {
        size: "50%",
        background: "transparent",
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: "22px",
            fontWeight: 600,
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: "16px",
            fontWeight: 400,
            color: "#4E4E4E",
            offsetY: 10,
            formatter: (val) => val,
          },
          total: {
            show: true,
            label: "Total",
            fontSize: "16px",
            fontWeight: 500,
            color: "#373d3f",
          },
        },
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val.toFixed(1) + "%";
    },
    style: {
      fontSize: "14px",
      fontWeight: 600,
      colors: ["#FFF"],
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 1,
      color: "#000",
      opacity: 0.45,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "diagonal1",
      shadeIntensity: 0.5,
      gradientToColors: ["#8484d3", "#d9fffd"],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 0.9,
      stops: [0, 100],
    },
  },
  tooltip: {
    enabled: false,
    y: {
      formatter: (value) => `${value}`,
    },
    theme: "dark",
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 280,
        },
      },
    },
  ],
};

function ChartThree({ scans }: { scans: IUS_scan[] }) {
  const no_malig = scans.filter((scan) => {
    return scan.diagnosis == "Malignant";
  }).length;
  const no_benign = scans.filter((scan) => {
    return scan.diagnosis == "Benign";
  }).length;
  const series = [no_benign, no_malig];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-lg dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black mb-4 mt-6">
            Benign vs Malignant Pie Chart
          </h5>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            {/* <select
              name=""
              id=""
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none text-black"
            >
              <option value="" className="dark:bg-boxdark">
                Monthly
              </option>
              <option value="" className="dark:bg-boxdark">
                Yearly
              </option> */}
            {/* </select> */}
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

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {/* <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#263492]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black ">
              <span> Benign </span>
              <span>
                {((no_benign * 100) / (no_benign + no_malig)).toFixed(1)}%
              </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#8FD0EF]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black ">
              <span> Malignant </span>
              <span>
                {" "}
                {((no_malig * 100) / (no_benign + no_malig)).toFixed(1)}%{" "}
              </span>
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default ChartThree;
