import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getHouseAvgPerMonthCount = (): Promise<DataType> => {
  return getData(Apies.GetBuildingAvgPerMonth);
};

export const useGetHouseAvgPerMonthCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["houseAvgperMonthCount"],
    queryFn: () => getHouseAvgPerMonthCount(),
  });
  return { data, isLoading };
};
