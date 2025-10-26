"use client";

import { BRAND_COLORS } from "@/lib/constants/chart-colors";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "@/components/charts/tooltip/custom-tooltip";

interface CoffeeData {
  brand: string;
  popularity: number;
}

interface CoffeeBarChartProps {
  data: CoffeeData[];
}

const CoffeeBarChart = ({ data }: CoffeeBarChartProps) => {
  const dataWithColors = data.map((item) => ({
    ...item,
    fill: BRAND_COLORS[item.brand as keyof typeof BRAND_COLORS],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={dataWithColors}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="brand"
          tick={{ fontSize: 12 }}
          tickMargin={10}
          axisLine={{ stroke: "#E5E7EB" }}
        />
        <YAxis
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
          tick={{ fontSize: 12 }}
          tickMargin={10}
          axisLine={{ stroke: "#E5E7EB" }}
          width={50}
        />
        <Tooltip
          content={
            <CustomTooltip active={true} payload={[]} customLabel="인기도" />
          }
          cursor={false}
        />
        <Bar dataKey="popularity" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CoffeeBarChart;
