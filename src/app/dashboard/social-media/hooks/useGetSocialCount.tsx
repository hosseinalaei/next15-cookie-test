import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getSocialCount = (): Promise<DataType> => {
  return getData(Apies.GetSocialCount);
};

export const useGetSocialCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["socialCount"],
    queryFn: () => getSocialCount(),
  });
  return { data, isLoading };
};
