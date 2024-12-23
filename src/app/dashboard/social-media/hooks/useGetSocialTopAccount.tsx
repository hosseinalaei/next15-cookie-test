import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getSocialTopAccount = (): Promise<DataType> => {
  return getData(Apies.GetSocialTopAccount);
};

export const useGetSocialTopAccount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["socialTopAccount"],
    queryFn: () => getSocialTopAccount(),
  });
  return { data, isLoading };
};
