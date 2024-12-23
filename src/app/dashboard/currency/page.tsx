"use client";
import Card from "@/app/_component/Card";
import { useGetCryptoAvgPerMonthCount } from "./hooks/useGetCryptoAvgPerMonthCount";
import BarMixChart from "@/app/_component/Charts/BarMix";
import PieChart from "@/app/_component/Charts/Pie";
import { useGetCurrencyTopCount } from "./hooks/useGetCurrencyTopCount";
import { useGetDollarAvgPerMonthCount } from "./hooks/useGetDollarAvgPerMonthCount";

const CurrencyPage = () => {
  const {
    data: cryptoAvgPerMonthCount,
    isLoading: cryptoAvgPerMonthIsLoading,
  } = useGetCryptoAvgPerMonthCount();
  const {
    data: dollarAvgPerMonthCount,
    isLoading: dollarAvgPerMonthIsLoading,
  } = useGetDollarAvgPerMonthCount();
  const { data: cryptoTopCount, isLoading: cryptoTopCountIsLoading } =
    useGetCurrencyTopCount();

  return (
    <div className="flex flex-col gap-4">
      <Card className="bg-white">
        {!cryptoTopCountIsLoading && (
          <PieChart data={cryptoTopCount?.data} title="برترین ارزها" />
        )}
      </Card>

      <Card className="bg-white col-span-2">
        {!cryptoAvgPerMonthIsLoading && (
          <BarMixChart
            normilize={false}
            title="میانگین قیمت ارزهای دیجیتال در ماه "
            xAxisData={cryptoAvgPerMonthCount?.data?.map(
              (item: any) => item.record
            )}
            yAxisData={cryptoAvgPerMonthCount?.data?.map(
              (item: any) => item.date
            )}
          />
        )}
      </Card>

      <Card className="bg-white col-span-2">
        {!dollarAvgPerMonthIsLoading && (
          <BarMixChart
            normilize={false}
            title="میانگین قیمت دلار در ماه "
            xAxisData={dollarAvgPerMonthCount?.data?.map(
              (item: any) => item.record
            )}
            yAxisData={cryptoAvgPerMonthCount?.data?.map(
              (item: any) => item.date
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default CurrencyPage;
