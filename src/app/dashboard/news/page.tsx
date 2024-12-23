"use client";
import Card from "@/app/_component/Card";
import LineChart from "@/app/_component/Charts/Line";
import PieChart from "@/app/_component/Charts/Pie";
import WordCloud from "@/app/_component/Charts/Wordcloud";
import { useGetNewsCount } from "./hooks/useGetNewsCount";
import { useGetNewsPerMonthCount } from "./hooks/useGetNewsPerMonthCount";
import { useGetWordcloudCount } from "./hooks/useGetWordcloudCount";
import { useGetAllDataCount } from "../home/hooks/getAllDataCount";
import { formatNumberIntl } from "@/utils/formatNumber";

const NewsPage = () => {
  const { data: allData, isLoading: allDataIsLoading } = useGetAllDataCount();
  const { data: newsCount, isLoading: newsIsLoading } = useGetNewsCount();
  const { data: newsPerMonthCount, isLoading: newsPerMonthIsLoading } =
    useGetNewsPerMonthCount();
  const { data: wordcloudCount, isLoading: wordcloudIsLoading } =
    useGetWordcloudCount();

  return (
    <>
      {!allDataIsLoading && (
        <Card className="px-24 rounded-md bg-sky-200 col-span-2 mb-4">
          <h3 className="text-2xl text-gray-700 dark:text-gray-400 my-4">
            تعداد کل اخبار
          </h3>
          <p className="text-2xl text-gray-700 dark:text-gray-400 font-bold">
            {allData
              ? formatNumberIntl(
                  allData?.data.filter((item: any) => item.cat === "news")[0]
                    .count
                )
              : "-"}
          </p>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white">
          {!newsIsLoading && (
            <PieChart data={newsCount?.data} title="تعداد اخبار رسانه‌ها" />
          )}
        </Card>

        <Card className="bg-white">
          {!wordcloudIsLoading && (
            <WordCloud
              data={wordcloudCount?.data?.map((item: any) => {
                return {
                  value: item.doc_count,
                  name: item.key,
                };
              })}
            />
          )}
        </Card>

        <Card className="bg-white col-span-2">
          {!newsPerMonthIsLoading && (
            <LineChart
              title="تعداد اخبار براساس ماه"
              xAxisData={newsPerMonthCount?.data?.map((item: any) => item.date)}
              yAxisData={newsPerMonthCount?.data?.map(
                (item: any) => item.count
              )}
            />
          )}
        </Card>
      </div>
    </>
  );
};

export default NewsPage;
