import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getWordcloudCount = (): Promise<DataType> => {
  return getData(Apies.GetNewsWordcloud);
};

export const useGetWordcloudCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["wordcloudCount"],
    queryFn: () => getWordcloudCount(),
  });
  return { data, isLoading };
};
