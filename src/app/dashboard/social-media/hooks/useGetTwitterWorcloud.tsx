import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getTwitterWordcloud = (): Promise<DataType> => {
  return getData(`${Apies.GetSocialWordcloud}/?plattform=twitter`);
};

export const useGetTwitterWorcloud = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["twitterWordcloud"],
    queryFn: () => getTwitterWordcloud(),
  });
  return { data, isLoading };
};
