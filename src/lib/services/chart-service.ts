import { apiClient } from "../client/api-client";

const WEEKLY_MOOD_TREND_CHART_ENDPOINT = "/mock/weekly-mood-trend";

interface WeeklyMoodTrendChartItem {
  week: string;
  happy: number;
  tired: number;
  stressed: number;
}

type WeeklyMoodTrendChartResponse = WeeklyMoodTrendChartItem[];

export const weeklyMoodTrendChartService = {
  get: () =>
    apiClient.get<WeeklyMoodTrendChartResponse>(
      WEEKLY_MOOD_TREND_CHART_ENDPOINT
    ),
};

const TEAM_BUG_AND_PRODUCTIVITY_TREND_CHART_ENDPOINT =
  "/mock/coffee-consumption";

interface TeamBugAndProductivityTrendChartItem {
  team: string;
  series: [
    {
      cups: number;
      bugs: number;
      productivity: number;
    }
  ][];
}

type TeamBugAndProductivityTrendChartResponse =
  TeamBugAndProductivityTrendChartItem[];

export const teamBugAndProductivityTrendChartService = {
  get: () =>
    apiClient.get<TeamBugAndProductivityTrendChartResponse>(
      TEAM_BUG_AND_PRODUCTIVITY_TREND_CHART_ENDPOINT
    ),
};
