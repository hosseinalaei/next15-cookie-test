import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getDollarAvgPerMonthCount = (): Promise<DataType> => {
  return getData(Apies.GetDollarAvgPerMonth);
};

export const useGetDollarAvgPerMonthCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["dollarAvgperMonthCount"],
    queryFn: () => getDollarAvgPerMonthCount(),
  });
  return { data, isLoading };
};
