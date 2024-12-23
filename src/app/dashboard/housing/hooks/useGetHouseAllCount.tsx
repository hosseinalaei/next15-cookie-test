import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";

const getAllCount = (): Promise<DataType> => {
  return getData(Apies.GetBuildingAll);
};

export const useGetHouseAllCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["allCount"],
    queryFn: () => getAllCount(),
  });
  return { data, isLoading };
};
