"use server";
import { API_URL } from "@/configs/global";
import { Apies } from "@/constant/apis";
import { redirect } from "next/navigation";
import "server-only";
import { saveSession } from "./saveSession";

interface Props {
  username: string;
  password: string;
  redirectTo?: string;
  captcha_text: string;
  captcha_id: string;
}
export async function signIn({
  username,
  password,
  captcha_text,
  captcha_id,
}: Props) {
  const body = {
    username: username,
    password: password,
    captcha_text: captcha_text,
    captcha_id: captcha_id,
  };

  // const res = await axios.post(`${API_URL}${Apies.Login}`, body);
  const res = await fetch(`${API_URL}${Apies.Login}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res) {
    return null;

    // return { success: false, message: res };
  }
  const data = await res.json();
  console.log("mmmmmmmmmmm", data);
  if (data.statusCode !== 200) {
    return data.message;
  }
  if (data?.data?.jwt) {
    console.log("jjjjjjjjjjjjjjjjjjjjj", data.data.jwt);
    console.log("wwwwwwwwwwwwwwwwwwww", data.data);

    saveSession(data.data.jwt);
    redirect("/dashboard/home");
  }
}
