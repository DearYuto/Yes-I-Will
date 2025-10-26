import { topCoffeeBrandsService } from "@/lib/services/chart-service";
import PageContainer from "@/components/common/page-container";
import CoffeeBarChart from "@/components/features/charts/coffee/coffee-bar-chart";
import CoffeeDonutChart from "@/components/features/charts/coffee/coffee-donut-chart";

export default async function ChartsPage() {
  const coffeeDatas = await topCoffeeBrandsService.get();

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">인기 커피 브랜드</h1>
        <p className="text-sm text-gray-500 mt-2">
          커피 브랜드별 인기도를 바 차트와 도넛 차트로 확인하세요.
        </p>
      </div>

      <div className="flex gap-6 rounded-lg border border-gray-200 bg-white p-6">
        <CoffeeBarChart data={coffeeDatas} />
        <CoffeeDonutChart data={coffeeDatas} />
      </div>
    </PageContainer>
  );
}
