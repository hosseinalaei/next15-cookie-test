import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getVehiclesMoneyCapacityPerMonthCount = (): Promise<DataType> => {
  return getData(Apies.GetVehiclesMoneyCapacityPerMonth);
};

export const useGetVehiclesMoneyCapacityPerMonthCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["vehiclesMoneyCapacityPerMonthCount"],
    queryFn: () => getVehiclesMoneyCapacityPerMonthCount(),
  });
  return { data, isLoading };
};
