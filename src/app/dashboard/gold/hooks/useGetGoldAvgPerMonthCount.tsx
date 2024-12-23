import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getGoldAvgPerMonthCount = (): Promise<DataType> => {
  return getData(Apies.GetGoldAvgPerMonthCount);
};

export const useGetGoldAvgPerMonthCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["goldAvgPerMonthCount"],
    queryFn: () => getGoldAvgPerMonthCount(),
  });
  return { data, isLoading };
};
