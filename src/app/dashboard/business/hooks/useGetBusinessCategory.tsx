import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getBusinessCategory = (): Promise<DataType> => {
  return getData(Apies.GetBusinessCategory);
};

export const useGetBusinessCategory = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["businessCategory"],
    queryFn: () => getBusinessCategory(),
  });
  return { data, isLoading };
};
