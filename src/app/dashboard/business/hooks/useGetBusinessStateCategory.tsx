import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getBusinessStateCategory = (): Promise<DataType> => {
  return getData(Apies.GetBusinessStateCategory);
};

export const useGetBusinessStateCategory = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["businessStateCategory"],
    queryFn: () => getBusinessStateCategory(),
  });
  return { data, isLoading };
};
