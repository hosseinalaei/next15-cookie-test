import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getBusinessAllCount = (): Promise<DataType> => {
  return getData(Apies.GetBusinessCount);
};

export const useGetBusinessAllCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["businessAllCount"],
    queryFn: () => getBusinessAllCount(),
  });
  return { data, isLoading };
};
