import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

type LineGraphProps = {
  data: { month: string; amount: number }[] | [];
};

export const LineGraph = ({ data }: LineGraphProps) => {
  return (
    <>
      <ResponsiveContainer width="90%" aspect={3.0}>
        <LineChart data={data}>
          <XAxis
            dataKey="month"
            width={70}
            tick={{
              fontSize: 10,
              fill: "#6b7280",
            }}
          />
          <YAxis
            width={70}
            tick={{
              fontSize: 10,
              fill: "#6b7280",
            }}
            tickFormatter={(value) =>
              value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            }
          />
          <CartesianGrid
            horizontal
            vertical
            stroke="#e5e7eb"
            strokeDasharray="3 3"
          />
          <Tooltip
            separator=": "
            labelStyle={{
              color: "gray"
            }}
            formatter={(value) => 
              value?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })
            }
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#fba91f"
            strokeWidth={3}
            name="Evolução da folha"
          />
        </LineChart>
      </ResponsiveContainer>

      <RechartsDevtools />
    </>
  );
};
