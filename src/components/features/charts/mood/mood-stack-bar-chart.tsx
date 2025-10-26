"use client";

import { useState } from "react";
import CustomTooltip from "@/components/charts/tooltip/custom-tooltip";
import { EMOTION_COLORS } from "@/lib/constants/chart-colors";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartDataItem {
  week: string;
  happy: number;
  tired: number;
  stressed: number;
}

interface MoodStackBarChartProps {
  data: ChartDataItem[];
}

const MoodStackBarChart = ({ data }: MoodStackBarChartProps) => {
  const [hiddenDataKeys, setHiddenDataKeys] = useState<Set<string>>(new Set());

  const handleLegendClick = (dataKey: string) => {
    setHiddenDataKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(dataKey)) {
        newSet.delete(dataKey);
        return newSet;
      }

      newSet.add(dataKey);
      return newSet;
    });
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Legend
          iconSize={20}
          wrapperStyle={{
            paddingTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          formatter={(value, entry) => {
            const dataKey = entry.dataKey as string;
            const isHidden = hiddenDataKeys.has(dataKey);
            return (
              <span
                className={`text-sm cursor-pointer ${
                  isHidden ? "text-gray-300 line-through" : "text-gray-600"
                }`}
              >
                {value}
              </span>
            );
          }}
          onClick={(e) => handleLegendClick(e.dataKey as string)}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="week"
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
            <CustomTooltip
              showMultiple={true}
              active={true}
              payload={[]}
              customLabel="감정 (단위: %)"
            />
          }
          cursor={false}
        />
        <Bar
          dataKey="happy"
          stackId="a"
          fill={EMOTION_COLORS.happy}
          name="행복"
          hide={hiddenDataKeys.has("happy")}
        />
        <Bar
          dataKey="tired"
          stackId="a"
          fill={EMOTION_COLORS.tired}
          name="피곤"
          hide={hiddenDataKeys.has("tired")}
        />
        <Bar
          dataKey="stressed"
          stackId="a"
          fill={EMOTION_COLORS.stressed}
          name="스트레스"
          hide={hiddenDataKeys.has("stressed")}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MoodStackBarChart;
