import { topCoffeeBrandsService } from "@/lib/services/chart-service";
import PageContainer from "@/components/common/page-container";
import CoffeeBarChart from "@/components/features/charts/coffee/coffee-bar-chart";
import CoffeeDonutChart from "@/components/features/charts/coffee/coffee-donut-chart";
import ChartHeader from "@/components/features/charts/chart-header";
import ChartBody from "@/components/features/charts/chart-body";

export default async function ChartsPage() {
  return (
    <PageContainer>
      <CoffeeCharts />
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
