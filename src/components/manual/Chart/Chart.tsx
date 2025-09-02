import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Colors,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import exp from "constants";

ChartJS.register(
  CategoryScale,
  Colors,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

type ChartProps = {
  label: string[];
  value: string[];
};

const Chart = ({ label, value }: ChartProps): JSX.Element => {
  const data =
  {
    labels: label,
    datasets: [
      {
        label: label,
        data: value

      }
    ]
  };

  return <Pie data={data} />
}

export default Chart;
