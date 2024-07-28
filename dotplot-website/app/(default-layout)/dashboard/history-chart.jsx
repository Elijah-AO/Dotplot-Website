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

const BCHistoryCorrelationChart = ({ patients }) => {
  const ageGroups = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
  const historyData = ageGroups.map((age, index) => {
    const nextAge = ageGroups[index + 1] || 100;
    const withHistory = patients.filter(
      (p) => p.age >= age && p.age < nextAge && p.bc_history
    ).length;
    const withoutHistory = patients.filter(
      (p) => p.age >= age && p.age < nextAge && !p.bc_history
    ).length;
    return { withHistory, withoutHistory };
  });

  const data = {
    labels: ageGroups.map((age) => `${age}-${age + 9}`),
    datasets: [
      {
        label: "With History",
        data: historyData.map((d) => d.withHistory),
        backgroundColor: "#35cbb8",
      },
      {
        label: "Without History",
        data: historyData.map((d) => d.withoutHistory),
        backgroundColor: "#120032",
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
        text: "Breast Cancer History Correlation by Age Group",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BCHistoryCorrelationChart;
