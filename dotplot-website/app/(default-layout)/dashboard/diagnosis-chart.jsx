// components/MalignantVsBenignChart.js

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement, Title } from "chart.js";

ChartJS.register(Tooltip, Legend, ArcElement, Title);

const MalignantVsBenignChart = ({ scans }) => {
  const diagnosisCounts = scans.reduce(
    (acc, scan) => {
      if (scan.diagnosis.toLowerCase() === "malignant") {
        acc.malignant += 1;
      } else if (scan.diagnosis.toLowerCase() === "benign") {
        acc.benign += 1;
      }
      return acc;
    },
    { malignant: 0, benign: 0 }
  );

  const data = {
    labels: ["Malignant", "Benign"],
    datasets: [
      {
        data: [diagnosisCounts.malignant, diagnosisCounts.benign],
        backgroundColor: ["#35cbb8", "#120032"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Malignant vs. Benign Diagnoses",
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default MalignantVsBenignChart;
