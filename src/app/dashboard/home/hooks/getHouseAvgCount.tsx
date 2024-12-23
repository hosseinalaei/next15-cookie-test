import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getHouseAvgCount = (): Promise<DataType> => {
  return getData(Apies.GetHouseAvgCount);
};

export const useGetHouseAvgCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["houseAvgCount"],
    queryFn: () => getHouseAvgCount(),
  });
  return { data, isLoading };
};
