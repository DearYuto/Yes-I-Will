"use client";

import CustomTooltip from "@/components/charts/tooltip/custom-tooltip";
import { BRAND_COLORS } from "@/lib/constants/chart-colors";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface CoffeeData {
  brand: string;
  popularity: number;
}

interface CoffeeDonutChartProps {
  data: CoffeeData[];
}

const CoffeeDonutChart = ({ data }: CoffeeDonutChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data.map((item) => ({
            ...item,
            fill: BRAND_COLORS[item.brand as keyof typeof BRAND_COLORS],
          }))}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={120}
          paddingAngle={2}
          dataKey="popularity"
          nameKey="brand"
          label={({ name, value }) => `${name}: ${value}%`}
          labelLine={{ stroke: "#E5E7EB" }}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={BRAND_COLORS[entry.brand as keyof typeof BRAND_COLORS]}
            />
          ))}
        </Pie>
        <Tooltip
          content={
            <CustomTooltip customLabel="인기도" active={true} payload={[]} />
          }
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          formatter={(value) => (
            <span className="text-sm text-gray-600">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CoffeeDonutChart;
