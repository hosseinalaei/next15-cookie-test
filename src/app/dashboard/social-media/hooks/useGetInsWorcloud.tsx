import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getInsWordcloud = (): Promise<DataType> => {
  return getData(`${Apies.GetSocialWordcloud}/?plattform=instagram`);
};

export const useGetInsWorcloud = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["insWordcloud"],
    queryFn: () => getInsWordcloud(),
  });
  return { data, isLoading };
};
