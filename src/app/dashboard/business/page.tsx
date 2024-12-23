"use client";
import Card from "@/app/_component/Card";
import { formatNumberIntl } from "@/utils/formatNumber";
import { useGetBusinessAllCount } from "./hooks/useGetBusinessAllCount";
import { useGetBusinessCategory } from "./hooks/useGetBusinessCategory";
import PieChart from "@/app/_component/Charts/Pie";
import { useGetBusinessStateCategory } from "./hooks/useGetBusinessStateCategory";
import BarChart from "@/app/_component/Charts/Bar";
import Loading from "@/app/_component/Loading";
import BarYChart from "@/app/_component/Charts/BarY";

const BusinessPage = () => {
  const { data: businessAllCount, isLoading: businessIsLoading } =
    useGetBusinessAllCount();
  const { data: businessCategory, isLoading: businessCategoryIsLoading } =
    useGetBusinessCategory();
  const {
    data: businessStateCategory,
    isLoading: businessStateCategoryIsLoading,
  } = useGetBusinessStateCategory();

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="px-24 rounded-md bg-sky-200 col-span-2">
        <h3 className="text-2xl text-gray-700 dark:text-gray-400 my-4">
          تعداد کل کسب‌و‌کارها
        </h3>
        <p className="text-2xl text-gray-700 dark:text-gray-400 font-bold">
          {formatNumberIntl(businessAllCount?.data?.count) ?? "-"}
        </p>
      </Card>

      <Card className="bg-white">
        {!businessCategoryIsLoading ? (
          <BarYChart
            yAxisData={businessCategory?.data?.map((item: any) => item.key)}
            xAxisData={businessCategory?.data?.map(
              (item: any) => item.doc_count
            )}
            title="دسته‌بندی کسب‌و‌کارها"
          />
        ) : (
          <Loading />
        )}
      </Card>

      <Card className="bg-white">
        {!businessStateCategoryIsLoading ? (
          <PieChart
            data={businessStateCategory?.data}
            title="دسته‌بندی کسب‌و‌کارها به تفکیک استان"
          />
        ) : (
          <Loading />
        )}
      </Card>
    </div>
  );
};

export default BusinessPage;
