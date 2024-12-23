import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getPerMonthCount = (): Promise<DataType> => {
  return getData(Apies.GetBuildingPerMonth);
};

export const useGetHousePerMonthCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["perMonthCount"],
    queryFn: () => getPerMonthCount(),
  });
  return { data, isLoading };
};
