import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getPerCityCount = (): Promise<DataType> => {
  return getData(Apies.GetBuildingPerCity);
};

export const useGetHousePerCityCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["perCityCount"],
    queryFn: () => getPerCityCount(),
  });
  return { data, isLoading };
};
