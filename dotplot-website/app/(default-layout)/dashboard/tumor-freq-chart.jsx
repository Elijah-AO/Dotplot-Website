import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TumorFrequencyChart = ({ patients }) => {
  const tumorCounts = patients.reduce((acc, patient) => {
    const count = patient.US_scans.length;
    acc[count] = acc[count] ? acc[count] + 1 : 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(tumorCounts),
    datasets: [
      {
        label: "Number of Patients",
        data: Object.values(tumorCounts),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
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
        text: "Tumor Frequency Distribution",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Number of Tumors",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Patients",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default TumorFrequencyChart;
