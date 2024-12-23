import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getVehiclesAllCount = (): Promise<DataType> => {
  return getData(Apies.GetAllVehiclesAllData);
};

export const useGetVehiclesAllCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["vehiclesAllCount"],
    queryFn: () => getVehiclesAllCount(),
  });
  return { data, isLoading };
};
