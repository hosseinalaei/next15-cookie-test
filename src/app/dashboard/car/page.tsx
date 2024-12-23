"use client";
import Card from "@/app/_component/Card";
import { formatNumberIntl } from "@/utils/formatNumber";
import { useGetVehiclesAllCount } from "./hooks/useGetVehiclesAllCount";
import LineChart from "@/app/_component/Charts/Line";
import { useGetVehiclesPerMonthCount } from "./hooks/useGetVehiclesPerMonthCount";
import { useGetVehiclesMoneyCapacityPerMonthCount } from "./hooks/useGetVehiclesMoneyCapacityPerMonthCount";
import { useGetVehiclesTopBrandCount } from "./hooks/useGetVehiclesTopBrandCount";
import PieChart from "@/app/_component/Charts/Pie";

const CarPage = () => {
  const { data: vehiclesAllCount, isLoading: vehiclesIsLoading } =
    useGetVehiclesAllCount();
  const { data: vehiclesPerMonthCount, isLoading: vehiclesPerMonthIsLoading } =
    useGetVehiclesPerMonthCount();
  const {
    data: vehiclesMoneyCapacityPerMonthCount,
    isLoading: vehiclesMoneyCapacityPerMonthIsLoading,
  } = useGetVehiclesMoneyCapacityPerMonthCount();
  const { data: vehiclesTopBrandCount, isLoading: vehiclesTopBrandIsLoading } =
    useGetVehiclesTopBrandCount();
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="px-24 rounded-md bg-sky-200 col-span-2">
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
            title="تعداد آگهی خودرو براساس ماه"
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
            title="حجم پول قیمت آگهی خودرو براساس ماه"
            xAxisData={vehiclesMoneyCapacityPerMonthCount?.data?.map(
              (item: any) => item.date
            )}
            yAxisData={vehiclesMoneyCapacityPerMonthCount?.data?.map(
              (item: any) => item.count
            )}
          />
        )}
      </Card>
      <Card className="bg-white col-span-2">
        {!vehiclesTopBrandIsLoading && (
          <PieChart
            data={vehiclesTopBrandCount?.data}
            title="برترین خودرو براساس برند"
          />
        )}
      </Card>
    </div>
  );
};

export default CarPage;
