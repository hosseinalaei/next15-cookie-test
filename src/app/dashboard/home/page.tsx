"use client";
import Card from "@/app/_component/Card";
import { useGetAllDataCount } from "./hooks/getAllDataCount";
import Loading from "@/app/_component/Loading";
import GaugeChart from "@/app/_component/Charts/GuageSpeed";
import { useGetHouseAvgCount } from "./hooks/getHouseAvgCount";
import { useGetCarAvgCount } from "./hooks/getCarAvgCount";
import BarChart from "@/app/_component/Charts/Bar";
import { useGetCoinAvgCount } from "./hooks/getCoinAvgCount";
import { useGetGoldAvgCount } from "./hooks/getGoldAvgCount";
import AllDataCount from "../../_component/AllDataCount/AllDataCount";
import { formatNumberIntl } from "@/utils/formatNumber";

const HomePage = () => {
  const { data: allData, isLoading: allDataIsLoading } = useGetAllDataCount();
  const { data: houseCount, isLoading: houseIsLoading } = useGetHouseAvgCount();
  const { data: carCount, isLoading: carIsLoading } = useGetCarAvgCount();
  const { data: coinCount, isLoading: coinIsLoading } = useGetCoinAvgCount();
  const { data: goldCount, isLoading: goldIsLoading } = useGetGoldAvgCount();

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 justify-center gap-2">
        {allDataIsLoading && <Loading />}
        {!allDataIsLoading && <AllDataCount data={allData?.data} />}
      </div>
      <div className="grid md:grid-cols-1  lg:grid-cols-2 gap-4 my-4 ">
        <Card className="bg-white">
          {houseIsLoading && <Loading />}
          {!houseIsLoading && (
            <GaugeChart
              data={houseCount?.data}
              title="میانگین قیمت مسکن (یک ماه اخیر)"
            />
          )}
          <span className="font-bold text-2xl -mt-24">
            {formatNumberIntl(houseCount?.data?.avg)}
          </span>
        </Card>

        <Card className="bg-white">
          {carIsLoading && <Loading />}
          {!carIsLoading && (
            <GaugeChart
              data={carCount?.data}
              title="میانگین قیمت خودرو (یک ماه اخیر)"
            />
          )}
          <span className="font-bold text-2xl -mt-24">
            {formatNumberIntl(carCount?.data?.avg)}
          </span>
        </Card>
        {/* </div>
      <div className="grid grid-cols-2 gap-4 my-4"> */}
        <Card className="bg-white">
          {coinIsLoading && <Loading />}
          {!coinIsLoading && (
            <BarChart
              title="میانگین قیمت سکه (یک ماه اخیر)"
              xAxisData={coinCount?.data?.avg?.map((item: any) => item.name)}
              yAxisData={coinCount?.data?.avg?.map((item: any) => item.value)}
            />
          )}
        </Card>
        <Card className="bg-white">
          {goldIsLoading && <Loading />}
          {!goldIsLoading && (
            <BarChart
              title="میانگین قیمت طلا (یک ماه اخیر)"
              xAxisData={goldCount?.data?.avg?.map((item: any) => item.name)}
              yAxisData={goldCount?.data?.avg?.map((item: any) => item.value)}
            />
          )}
        </Card>
        {/* <BarChart data={goldCount?.data} /> */}
      </div>
    </>
  );
};

export default HomePage;
