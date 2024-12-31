import { API_URL } from "@/configs/global";
import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { cookieName } from "@/lib/auth/constant";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useQuery } from "react-query";

const getAllDataCount = async (): Promise<DataType> => {
  const token = getCookie(cookieName);
  const response = await axios.get(`${API_URL}${Apies.GetAllDataCount}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("eeeeeeeeee", response);

  return response.data;
};

export const useGetAllDataCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["dataCount"],
    queryFn: () => getAllDataCount(),
  });
  return { data, isLoading };
};
