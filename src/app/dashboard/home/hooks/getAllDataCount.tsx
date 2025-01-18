import { API_URL } from "@/configs/global";
import { Apies } from "@/constant/apis";
import { getData } from "@/core/http-service/http-service";
import { getSession } from "@/lib/auth/getSession";
import { useQuery } from "react-query";

const getAllDataCount = async () => {
  const session = await getSession();
  console.log("session", session?.token);

  try {
    const response = await fetch(`${API_URL}${Apies.GetAllDataCount}`, {
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    });
    const data = await response.json();
    console.log("1111", data.data);
    return data;
  } catch (e) {
    console.log(e);
  }
  // return getData(Apies.GetAllDataCount);
};

export const useGetAllDataCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["dataCount"],
    queryFn: () => getAllDataCount(),
  });
  return { data, isLoading };
};
