"use server";
import { API_URL } from "@/configs/global";
import { Apies } from "@/constant/apis";
import axios from "axios";
import "server-only";
import { saveSession } from "./saveSession";
import { redirect } from "next/navigation";

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
  try {
    const res = await axios.post(`${API_URL}${Apies.Login}`, body);

    saveSession(res.data.data.jwt);
    // if (res.data.data.jwt) {
    //   redirect("/dashboard/home");
    // }

    return { success: true, data: res.data.data };
  } catch (error: any) {
    console.log(error);

    return { success: false, message: error.response.data };
  }
}
