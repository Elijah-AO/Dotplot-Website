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

const AgeDistributionChart = ({ patients }) => {
  const ageGroups = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
  const ageDistribution = ageGroups.map((age, index) => {
    const nextAge = ageGroups[index + 1] || 100;
    return patients.filter((p) => p.age >= age && p.age < nextAge).length;
  });

  const data = {
    labels: ageGroups.map((age) => `${age}-${age + 9}`),
    datasets: [
      {
        label: "Number of Patients",
        data: ageDistribution,
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
        text: "Age Distribution of Patients",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default AgeDistributionChart;
