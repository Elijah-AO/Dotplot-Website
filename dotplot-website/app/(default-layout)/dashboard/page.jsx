"use client";
import AgeDistributionChart from "./age-chart";
import BMIAnalysisChart from "./bmi-chart";
import DiagnosisFrequencyChart from "./diagnoses-freq-chart";
import BCHistoryCorrelationChart from "./history-chart";
import BMIVsTumorCountChart from "./bmi-count-chart";
import TumorFrequencyChart from "./tumor-freq-chart";
import MalignantVsBenignChart from "./diagnosis-chart";
import Typography from "@/app/components/typography";

const Dashboard = async () => {
  const res = await fetch("http://localhost:5000/api/patient");
  var patients = await res.json();
  const res2 = await fetch("http://localhost:5000/api/us-scan");
  var scans = await res2.json();
  return (
    <div className=" min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <Typography
          className="max-w-2xl mb-10 text-center text-secondary"
          variant="h1"
        >
          Patient Insights Dashboard
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Age Distribution
            </h2>
            <AgeDistributionChart patients={patients} />
            <p className="mt-2 text-gray-600">
              This chart shows the distribution of patient ages.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              BMI Analysis
            </h2>
            <BMIAnalysisChart patients={patients} />
            <p className="mt-2 text-gray-600">
              Visual representation of BMI across patients.
            </p>
          </div>
          <div
            style={{
              gridColumn: "span 3 / span 2",
            }}
            className="bg-white shadow-md rounded-lg p-6 col-span-1 md:col-span-2"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Diagnosis Frequency Over Time
            </h2>
            <DiagnosisFrequencyChart scans={scans} />
            <p className="mt-2 text-gray-600 col-span-3 md:col-span-2">
              Frequency of diagnoses recorded each month with a trend line.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Malignant vs. Benign
            </h2>
            <MalignantVsBenignChart scans={scans} />
            <p className="mt-2 text-gray-600">
              Comparison between malignant and benign cases.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 col-span-1 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Tumor Frequency Distribution
            </h2>
            <TumorFrequencyChart patients={patients} />
            <p className="mt-2 text-gray-600">
              Frequency distribution of tumor counts across patients.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              BC History Correlation
            </h2>
            <BCHistoryCorrelationChart patients={patients} />
            <p className="mt-2 text-gray-600">
              Correlation between BC history and diagnoses.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              BMI vs. Tumor Count
            </h2>
            <BMIVsTumorCountChart patients={patients} />
            <p className="mt-2 text-gray-600">
              Analyzing BMI in relation to the number of tumors detected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
