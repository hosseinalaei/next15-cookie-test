"use server";
import { Apies } from "@/constant/apis";
import { postData } from "@/core/http-service/http-service";
import { cookies } from "next/headers";
import "server-only";
import { cookieName } from "./constant";

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

    // saveSession(res?.data?.jwt);

    const cookieStore = await cookies();
    cookieStore.set(cookieName, res?.data?.jwt, {
      httpOnly: false,
      // secure: process.env.NODE_ENV === "production" ? true : false,
      secure: false,
    });

    // redirect("/cooperate/admin/dashboard");
    return { success: true, res: res };
  } catch (error: any) {
    return { success: false, message: error };
  }
}
