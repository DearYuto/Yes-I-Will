"use client";

import { TEAM_COLORS } from "@/lib/constants/chart-colors";
import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TeamData {
  team: string;
  series: Array<{
    cups: number;
    bugs: number;
    productivity: number;
  }>;
}

interface ChartData {
  cups: number;
  [key: string]: number;
}

interface TeamMultiLineChartProps {
  data: TeamData[];
}

interface CustomTooltipProps {
  active: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label: any;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bugsData = payload.filter((p: any) =>
      p.dataKey?.toString().endsWith("_bugs")
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const productivityData = payload.filter((p: any) =>
      p.dataKey?.toString().endsWith("_productivity")
    );

    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="font-semibold text-gray-500 mb-2">커피 {label}잔</p>

        {bugsData.length > 0 && (
          <div className="mb-2">
            <p className="text-xs text-gray-400 mb-1">버그 수</p>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {bugsData.map((entry: any, index: number) => {
              const team = entry.dataKey?.toString().replace("_bugs", "");
              return (
                <div key={index} className="flex items-center gap-2 py-0.5">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-gray-600">{team}:</span>
                  <span className="text-sm font-medium text-gray-500">
                    {entry.value}개
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {productivityData.length > 0 && (
          <div>
            <p className="text-xs text-gray-400 mb-1">생산성</p>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {productivityData.map((entry: any, index: number) => {
              const team = entry.dataKey
                ?.toString()
                .replace("_productivity", "");
              return (
                <div key={index} className="flex items-center gap-2 py-0.5">
                  <div
                    className="w-3 h-3"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-gray-600">{team}:</span>
                  <span className="text-sm font-medium text-gray-500">
                    {entry.value}점
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
  return null;
};

const TeamMultiLineChart = ({ data }: TeamMultiLineChartProps) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        <div className="flex w-full h-full items-center justify-center text-gray-400">
          데이터가 존재하지 않습니다.
        </div>
      </div>
    );
  }

  const chartData: ChartData[] = [];
  const cupSet = new Set<number>();

  data.forEach((team) => {
    if (team.series && Array.isArray(team.series)) {
      team.series.forEach((point) => {
        cupSet.add(point.cups);
      });
    }
  });

  Array.from(cupSet)
    .sort((a, b) => a - b)
    .forEach((cups) => {
      const dataPoint: ChartData = { cups };
      data.forEach((team) => {
        if (team.series && Array.isArray(team.series)) {
          const point = team.series.find((p) => p.cups === cups);
          if (point) {
            dataPoint[`${team.team}_bugs`] = point.bugs;
            dataPoint[`${team.team}_productivity`] = point.productivity;
          }
        }
      });
      chartData.push(dataPoint);
    });

  return (
    <ResponsiveContainer width="100%" height={500}>
      <RechartsLineChart
        data={chartData}
        margin={{
          top: 20,
          right: 60,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="cups"
          label={{
            value: "커피 섭취량 (잔/일)",
            position: "insideBottom",
            offset: -15,
            fontSize: 12,
          }}
          tick={{ fontSize: 12 }}
          tickMargin={10}
          axisLine={{ stroke: "#E5E7EB" }}
        />
        <YAxis
          yAxisId="left"
          label={{
            value: "버그 수",
            fontSize: 12,
            angle: -90,
            position: "insideLeft",
          }}
          tick={{ fontSize: 12 }}
          tickMargin={10}
          axisLine={{ stroke: "#E5E7EB" }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{
            value: "생산성 점수",
            fontSize: 12,
            angle: 90,
            position: "insideRight",
          }}
          tick={{ fontSize: 12 }}
          tickMargin={10}
          axisLine={{ stroke: "#E5E7EB" }}
        />
        <Tooltip
          content={<CustomTooltip active={true} payload={[]} label={""} />}
          cursor={false}
        />
        <Legend
          wrapperStyle={{
            paddingTop: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          formatter={(value) => (
            <span className="text-sm text-gray-600">{value}</span>
          )}
        />

        {data.map((team) => {
          const color =
            TEAM_COLORS[team.team as keyof typeof TEAM_COLORS] || "#888888";
          return (
            <React.Fragment key={team.team}>
              <Line
                yAxisId="left"
                type="monotone"
                dataKey={`${team.team}_bugs`}
                stroke={color}
                strokeWidth={2}
                dot={{ r: 4, fill: color }}
                name={`${team.team} (버그)`}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey={`${team.team}_productivity`}
                stroke={color}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4, fill: color }}
                name={`${team.team} (생산성)`}
              />
            </React.Fragment>
          );
        })}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default TeamMultiLineChart;
