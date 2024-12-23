import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getCurrencTopCount = (): Promise<DataType> => {
  return getData(Apies.GetCrypTop);
};

export const useGetCurrencyTopCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["currencyTopCount"],
    queryFn: () => getCurrencTopCount(),
  });
  return { data, isLoading };
};
