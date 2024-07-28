import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const BMIVsTumorCountChart = ({ patients }) => {
  const data = {
    datasets: [
      {
        label: "Patients",
        data: patients.map((patient) => {
          const bmi = patient.weight / (patient.height / 100) ** 2;
          const tumorCount = patient.US_scans.length;
          return {
            x: bmi,
            y: tumorCount,
            backgroundColor:
              tumorCount > 1
                ? "rgba(255, 99, 132, 0.6)"
                : "rgba(54, 162, 235, 0.6)",
          };
        }),
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "BMI",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Tumors",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const patient = patients[context.dataIndex];
            return `Name: ${patient.patient_name}, Tumors: ${
              context.raw.y
            }, BMI: ${context.raw.x.toFixed(2)}`;
          },
        },
      },
    },
  };

  return <Scatter data={data} options={options} />;
};

export default BMIVsTumorCountChart;
