"use server";
import { Apies } from "@/constant/apis";
import axios from "axios";
import "server-only";
import { saveSession } from "./saveSession";
import { postData } from "@/core/http-service/http-service";
import { cookies } from "next/headers";

interface Props {
  username: string;
  password: string;
  redirectTo?: string;
  captchaCode: string;
  captchaId: string;
}
export async function signIn({
  redirectTo = "/",
  username,
  password,
  captchaCode,
  captchaId,
}: Props) {
  const body = {
    username,
    password,
    captcha_text: captchaCode,
    captcha_id: captchaId,
  };
  try {
    const res: any = await postData(Apies.Login, body);
    console.log("ressss", res?.data?.jwt);

    // saveSession(res?.data?.jwt);

    const cookieStore = await cookies();
    cookieStore.set("USER_SESSION", res?.data?.jwt);

    // redirect("/cooperate/admin/dashboard");
    return { success: true, username: res.data.username };
  } catch (error: any) {
    return { success: false, message: error?.response?.data };
  }
}
