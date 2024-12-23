import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getCoinAvgCount = (): Promise<DataType> => {
  return getData(Apies.GetCoinAvgCount);
};

export const useGetCoinAvgCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["coinAvgCount"],
    queryFn: () => getCoinAvgCount(),
  });
  return { data, isLoading };
};
