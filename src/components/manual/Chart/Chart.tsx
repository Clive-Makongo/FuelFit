import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
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
  value: number[];
};

const Chart = ({ label, value }: ChartProps): JSX.Element => {
  const data =
  {
    labels: label,
    datasets: [
      {
        label: ``,
        backgroundColour: "rgba(75, 192, 192, 1)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: value

      }
    ]
  };

  return <Pie data={data} />
}

export default Chart;
