import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getCarAvgCount = (): Promise<DataType> => {
  return getData(Apies.GetCarAvgCount);
};

export const useGetCarAvgCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["carAvgCount"],
    queryFn: () => getCarAvgCount(),
  });
  return { data, isLoading };
};
