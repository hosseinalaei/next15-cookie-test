import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getFoodAvgCount = (): Promise<DataType> => {
  return getData(Apies.GetAllDataCount);
};

export const useGetFoodAvgCountt = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["foodAvgCount"],
    queryFn: () => getFoodAvgCount(),
  });
  return { data, isLoading };
};
