import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getVehiclesTopBrandCount = (): Promise<DataType> => {
  return getData(Apies.GetVehiclesTopBrand);
};

export const useGetVehiclesTopBrandCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["vehiclesTopBrandCount"],
    queryFn: () => getVehiclesTopBrandCount(),
  });
  return { data, isLoading };
};
