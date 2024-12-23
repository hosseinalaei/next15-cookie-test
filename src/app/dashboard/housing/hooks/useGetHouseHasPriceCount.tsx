import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getHasPriceCount = (): Promise<DataType> => {
  return getData(Apies.GetBuildingHasPrice);
};

export const useGetHouseHasPriceCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["hasPriceCount"],
    queryFn: () => getHasPriceCount(),
  });
  return { data, isLoading };
};
