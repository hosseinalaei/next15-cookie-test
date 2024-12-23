import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getNewsCount = (): Promise<DataType> => {
  return getData(Apies.GetNewsCount);
};

export const useGetNewsCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["newsCount"],
    queryFn: () => getNewsCount(),
  });
  return { data, isLoading };
};
