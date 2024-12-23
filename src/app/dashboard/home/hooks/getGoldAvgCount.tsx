import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getGoldAvgCount = (): Promise<DataType> => {
  return getData(Apies.GetGoldAvgCount);
};

export const useGetGoldAvgCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["goldAvgCount"],
    queryFn: () => getGoldAvgCount(),
  });
  return { data, isLoading };
};
