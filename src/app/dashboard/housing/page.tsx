"use client";
import Card from "@/app/_component/Card";
import LineChart from "@/app/_component/Charts/Line";
import PieChart from "@/app/_component/Charts/Pie";
import { useGetHouseAvgPerMonthCount } from "./hooks/useGetHouseAvgPerMonthCount";
import { useGetHousePerCityCount } from "./hooks/useGetHousePerCityCount";
import { useGetHousePerMonthCount } from "./hooks/useGetHousePerMonthCount";
import { useGetMoneyCapacityPerMonthCount } from "./hooks/useGetMoneyCapacityPerMonthCount";
import BarMixChart from "@/app/_component/Charts/BarMix";
import { useGetHouseHasPriceCount } from "./hooks/useGetHouseHasPriceCount";
import { useGetHouseAllCount } from "./hooks/useGetHouseAllCount";
import { formatNumberIntl } from "@/utils/formatNumber";
import Loading from "@/app/_component/Loading";

const HousingPage = () => {
  const { data: housePerCityCount, isLoading: housePerCityIsLoading } =
    useGetHousePerCityCount();
  const { data: housePerMonthCount, isLoading: housePerMonthIsLoading } =
    useGetHousePerMonthCount();
  const {
    data: houseMoneyCapPerMonthCount,
    isLoading: houseMoneyCapPerMonthIsLoading,
  } = useGetMoneyCapacityPerMonthCount();
  const { data: houseAvgPerMonthCount, isLoading: houseAvgPerMonthIsLoading } =
    useGetHouseAvgPerMonthCount();
  const { data: houseHasPriceCount, isLoading: houseHasPriceIsLoading } =
    useGetHouseHasPriceCount();
  const { data: houseAllCount, isLoading: houseAllIsLoading } =
    useGetHouseAllCount();

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="px-24 rounded-md bg-sky-200 col-span-2">
        {!houseAllIsLoading && (
          <>
            <h3 className="text-2xl text-gray-700 dark:text-gray-400 my-4">
              تعداد کل آگهی‌ها
            </h3>
            <p className="text-2xl text-gray-700 dark:text-gray-400 font-bold">
              {formatNumberIntl(houseAllCount?.data?.count) ?? "-"}
            </p>
          </>
        )}
      </Card>

      <Card className="bg-white">
        {!housePerCityIsLoading && (
          <PieChart
            data={housePerCityCount?.data}
            title="تعداد آگهی مسکن براساس شهر"
          />
        )}
      </Card>

      <Card className="bg-white">
        {houseHasPriceIsLoading ? (
          <Loading />
        ) : (
          <PieChart
            data={houseHasPriceCount?.data}
            title="آگهی‌های دارای قیمت"
          />
        )}
      </Card>

      <Card className="bg-white">
        {!housePerMonthIsLoading && (
          <LineChart
            title="تعداد آگهی مسکن براساس ماه"
            xAxisData={housePerMonthCount?.data?.map((item: any) => item.date)}
            yAxisData={housePerMonthCount?.data?.map((item: any) => item.count)}
          />
        )}
      </Card>

      <Card className="bg-white">
        {!houseMoneyCapPerMonthIsLoading && (
          <LineChart
            title="حجم پول قیمت آگهی مسکن براساس ماه"
            xAxisData={houseMoneyCapPerMonthCount?.data?.map(
              (item: any) => item.date
            )}
            yAxisData={houseMoneyCapPerMonthCount?.data?.map(
              (item: any) => item.count
            )}
          />
        )}
      </Card>

      <Card className="bg-white col-span-2">
        {!houseAvgPerMonthIsLoading && (
          <BarMixChart
            normilize
            title="میانگین قیمت مسکن شهرهای مهم در ماه (میلیارد تومان)"
            xAxisData={houseAvgPerMonthCount?.data?.map(
              (item: any) => item.record
            )}
            yAxisData={houseAvgPerMonthCount?.data?.map(
              (item: any) => item.date
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default HousingPage;
