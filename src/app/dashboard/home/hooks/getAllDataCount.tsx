import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getAllDataCount = (): Promise<DataType> => {
  return getData(Apies.GetAllDataCount);
};

export const useGetAllDataCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["dataCount"],
    queryFn: () => getAllDataCount(),
  });
  return { data, isLoading };
};
