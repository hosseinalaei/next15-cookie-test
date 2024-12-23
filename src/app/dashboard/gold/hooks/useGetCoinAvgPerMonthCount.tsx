import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getCoinAvgPerMonthCount = (): Promise<DataType> => {
  return getData(Apies.GetCoinAvgPerMonthCount);
};

export const useGetCoinAvgPerMonthCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["coinAvgPerMonthCount"],
    queryFn: () => getCoinAvgPerMonthCount(),
  });
  return { data, isLoading };
};
