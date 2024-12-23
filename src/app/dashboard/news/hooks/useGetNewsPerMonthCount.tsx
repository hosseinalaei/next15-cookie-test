import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getNewsPerMonthCount = (): Promise<DataType> => {
  return getData(Apies.GetNewsPerMonthCount);
};

export const useGetNewsPerMonthCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["newsPerMonthCount"],
    queryFn: () => getNewsPerMonthCount(),
  });
  return { data, isLoading };
};
