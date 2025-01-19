"use client";
import { API_URL } from "@/configs/global";
import { Apies } from "@/constant/apis";
import { cookieName } from "@/lib/auth/constant";
// import { getData } from "@/core/http-service/http-service";
import { getSession } from "@/lib/auth/getSession";
import { useSession } from "@/lib/auth/useSession";
import { getCookie, hasCookie } from "cookies-next";
import { useQuery } from "react-query";

const getAllDataCount = async () => {
  console.log(await hasCookie("USER_SESSION", { httpOnly: true }));

  const token = await getCookie("USER_SESSION", { httpOnly: true });
  console.log("session1", cookieName, token);

  // const session = await getSession();
  // console.log("session", session);

  try {
    const response = await fetch(`${API_URL}${Apies.GetAllDataCount}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // console.log("1111", data.data);
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
