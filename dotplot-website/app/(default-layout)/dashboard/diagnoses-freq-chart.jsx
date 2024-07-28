import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const DiagnosisFrequencyChart = ({ scans }) => {
  // Group scans by month and count diagnoses
  const scansByMonth = scans.reduce((acc, scan) => {
    const date = new Date(scan.scan_date);
    const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
    acc[monthYear] = acc[monthYear] ? acc[monthYear] + 1 : 1;
    return acc;
  }, {});

  const labels = Object.keys(scansByMonth).sort(
    (a, b) =>
      new Date(a.split("-")[1], a.split("-")[0] - 1) -
      new Date(b.split("-")[1], b.split("-")[0] - 1)
  );

  const dataPoints = labels.map((label) => scansByMonth[label]);

  const calculateSMA = (data, windowSize) => {
    let sma = [];
    for (let i = 0; i < data.length; i++) {
      if (i < windowSize - 1) {
        sma.push(null); // Not enough data to calculate SMA yet
      } else {
        const sum = data
          .slice(i - windowSize + 1, i + 1)
          .reduce((acc, val) => acc + val, 0);
        sma.push(sum / windowSize);
      }
    }
    return sma;
  };

  // Using a 3-month window for SMA
  const trendData = calculateSMA(dataPoints, 3);

  const data = {
    labels,
    datasets: [
      {
        label: "Diagnoses",
        data: dataPoints,
        borderColor: "#453365",
        backgroundColor: "#453365",
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 8,
      },
      {
        label: "Trend Line",
        data: trendData,
        borderColor: "#35cbb8",
        borderWidth: 2,
        fill: false,
        borderDash: [5, 5],
        pointRadius: 0,
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
        text: "Diagnosis Frequency Over Time",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Diagnoses",
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  return <Line data={data} options={options} />;
};

export default DiagnosisFrequencyChart;
