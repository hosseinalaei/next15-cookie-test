import { API_URL } from "@/configs/global";
import { Apies } from "@/constant/apis";
import { cookieName } from "@/lib/auth/constant";
import axios from "axios";
import { setCookie } from "cookies-next";
import { redirect } from "next/navigation";

export async function serverSideSubmit(formData: FormData) {
  try {
    const response = await axios.post(`${API_URL}${Apies.Login}`, {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      captcha_text: formData.get("captcha_text") as string,
      captcha_id: formData.get("captcha_id") as string,
    });
    if (response.data.data.jwt) {
      setCookie(cookieName, response.data.data.jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      redirect("/dashboard/home");
    }
  } catch (e: any) {
    console.log(e);
  }
}
