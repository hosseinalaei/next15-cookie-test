import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getVehiclesPerMonthCount = (): Promise<DataType> => {
  return getData(Apies.GetVehiclesPerMonth);
};

export const useGetVehiclesPerMonthCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["vehiclesPerMonthCount"],
    queryFn: () => getVehiclesPerMonthCount(),
  });
  return { data, isLoading };
};
