import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getMoneyCapacityPerMonthCount = (): Promise<DataType> => {
  return getData(Apies.GetBuildingMoneyCapacityPerMonth);
};

export const useGetMoneyCapacityPerMonthCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["moneyCapacityPerMonthCount"],
    queryFn: () => getMoneyCapacityPerMonthCount(),
  });
  return { data, isLoading };
};
