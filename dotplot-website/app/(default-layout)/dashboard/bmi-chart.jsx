import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const BMIAnalysisChart = ({ patients }) => {
  const maligPatients = patients.filter((patient) => {
    const scans = patient.US_scans;
    var hasMalig = false;
    scans.forEach((scan) => {
      if (scan.diagnosis == "Malignant") {
        hasMalig = true;
      }
    });
    return hasMalig;
  });
  const data = {
    datasets: [
      {
        label: "Patients",
        data: maligPatients.map((patient) => ({
          x: patient.weight / (patient.height / 100) ** 2,
          y: patient.age,
          backgroundColor: patient.bc_history
            ? "rgba(255, 99, 132, 0.6)"
            : "rgba(54, 162, 235, 0.6)",
        })),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
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
          text: "Age",
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
            return `Name: ${patient.patient_name}, Age: ${
              patient.age
            }, BMI: ${context.raw.x.toFixed(2)}, History: ${
              patient.bc_history ? "Yes" : "No"
            }`;
          },
        },
      },
    },
  };

  return <Scatter data={data} options={options} />;
};

export default BMIAnalysisChart;
