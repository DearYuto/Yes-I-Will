import {
  topCoffeeBrandsService,
  weeklyMoodTrendChartService,
} from "@/lib/services/chart-service";
import PageContainer from "@/components/common/page-container";
import CoffeeBarChart from "@/components/features/charts/coffee/coffee-bar-chart";
import CoffeeDonutChart from "@/components/features/charts/coffee/coffee-donut-chart";
import ChartHeader from "@/components/features/charts/chart-header";
import ChartBody from "@/components/features/charts/chart-body";
import MoodStackBarChart from "@/components/features/charts/mood/mood-stack-bar-chart";
import MoodStackAreaChart from "@/components/features/charts/mood/mood-stack-area-chart";

export default async function ChartsPage() {
  return (
    <PageContainer>
      <CoffeeCharts />
      <WeeklyMoodTrendCharts />
    </PageContainer>
  );
}

async function CoffeeCharts() {
  const coffeeDatas = await topCoffeeBrandsService.get();

  return (
    <>
      <ChartHeader
        title="인기 커피 브랜드"
        description="커피 브랜드별 인기도를 바 차트와 도넛 차트로 확인하세요."
      />
      <ChartBody>
        <CoffeeBarChart data={coffeeDatas} />
        <CoffeeDonutChart data={coffeeDatas} />
      </ChartBody>
    </>
  );
}

async function WeeklyMoodTrendCharts() {
  const stackBarChartData = await weeklyMoodTrendChartService.get();
  const stackAreaChartData = await weeklyMoodTrendChartService.get();

  return (
    <>
      <ChartHeader
        title="주간 감정 트렌드"
        description="주간 감정 트렌드를 스택형 바 차트와 면적 차트로 확인하세요."
      />
      <ChartBody>
        <MoodStackBarChart data={stackBarChartData} />
        <MoodStackAreaChart data={stackAreaChartData} />
      </ChartBody>
    </>
  );
}
