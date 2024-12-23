import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getProfileAllDataCount = (): Promise<DataType> => {
  return getData(Apies.GetProfileAllDataCount);
};

export const useGetProfileAllDataCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["profileDataCount"],
    queryFn: () => getProfileAllDataCount(),
  });
  return { data, isLoading };
};
