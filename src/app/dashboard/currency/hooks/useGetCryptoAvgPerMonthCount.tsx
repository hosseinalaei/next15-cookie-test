import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getCryptoAvgPerMonthCount = (): Promise<DataType> => {
  return getData(Apies.GetCryptoAvgPerMonth);
};

export const useGetCryptoAvgPerMonthCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["cryptoAvgperMonthCount"],
    queryFn: () => getCryptoAvgPerMonthCount(),
  });
  return { data, isLoading };
};
