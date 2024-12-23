"use client";
import Card from "@/app/_component/Card";
import { formatNumberIntl } from "@/utils/formatNumber";
import LineChart from "@/app/_component/Charts/Line";
import PieChart from "@/app/_component/Charts/Pie";
import { useGetCoinAvgPerMonthCount } from "./hooks/useGetCoinAvgPerMonthCount";
import Loading from "@/app/_component/Loading";
import BarChart from "@/app/_component/Charts/Bar";
import { useGetGoldAvgPerMonthCount } from "./hooks/useGetGoldAvgPerMonthCount";

const GoldPage = () => {
  // const { data: vehiclesAllCount, isLoading: vehiclesIsLoading } =
  //   useGetVehiclesAllCount();
  const { data: coinAvgPerMonthCount, isLoading: coinAvgPerMonthIsLoading } =
    useGetCoinAvgPerMonthCount();
  const { data: goldAvgPerMonthCount, isLoading: goldAvgPerMonthIsLoading } =
    useGetGoldAvgPerMonthCount();
  // const {
  //   data: vehiclesMoneyCapacityPerMonthCount,
  //   isLoading: vehiclesMoneyCapacityPerMonthIsLoading,
  // } = useGetVehiclesMoneyCapacityPerMonthCount();
  // const { data: vehiclesTopBrandCount, isLoading: vehiclesTopBrandIsLoading } =
  //   useGetVehiclesTopBrandCount();
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="bg-white">
        {coinAvgPerMonthIsLoading && <Loading />}
        {!coinAvgPerMonthIsLoading && (
          <BarChart
            title="میانگین قیمت سکه (یک ماه اخیر)"
            xAxisData={coinAvgPerMonthCount?.data?.map(
              (item: any) => item.date
            )}
            yAxisData={coinAvgPerMonthCount?.data?.map(
              (item: any) => item.count
            )}
          />
        )}
      </Card>
      <Card className="bg-white">
        {goldAvgPerMonthIsLoading && <Loading />}
        {!goldAvgPerMonthIsLoading && (
          <BarChart
            title="میانگین قیمت طلا (یک ماه اخیر)"
            xAxisData={goldAvgPerMonthCount?.data?.map(
              (item: any) => item.date
            )}
            yAxisData={goldAvgPerMonthCount?.data?.map(
              (item: any) => item.count
            )}
          />
        )}
      </Card>
      {/* <Card className="px-24 rounded-md bg-sky-200 col-span-2">
        <h3 className="text-2xl text-gray-700 dark:text-gray-400 my-4">
          تعداد کل آگهی‌ها
        </h3>
        <p className="text-2xl text-gray-700 dark:text-gray-400 font-bold">
          {formatNumberIntl(vehiclesAllCount?.data?.count) ?? "-"}
        </p>
      </Card>
      <Card className="bg-white">
        {!vehiclesPerMonthIsLoading && (
          <LineChart
            title="تعداد خودرو براساس ماه"
            xAxisData={vehiclesPerMonthCount?.data?.map(
              (item: any) => item.date
            )}
            yAxisData={vehiclesPerMonthCount?.data?.map(
              (item: any) => item.count
            )}
          />
        )}
      </Card>
      <Card className="bg-white">
        {!vehiclesMoneyCapacityPerMonthIsLoading && (
          <LineChart
            title="حجم پول تبادل شده براساس ماه"
            xAxisData={vehiclesMoneyCapacityPerMonthCount?.data?.map(
              (item: any) => item.date
            )}
            yAxisData={vehiclesMoneyCapacityPerMonthCount?.data?.map(
              (item: any) => item.count
            )}
          />
        )}
      </Card>
      <Card className="bg-white">
        {!vehiclesTopBrandIsLoading && (
          <PieChart
            data={vehiclesTopBrandCount?.data}
            title="برترین خودرو براساس برند"
          />
        )}
      </Card> */}
    </div>
  );
};

export default GoldPage;
