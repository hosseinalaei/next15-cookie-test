// "use server";
// import { API_URL } from "@/configs/global";
// import { Apies } from "@/constant/apis";
// import { cookieName } from "@/lib/auth/constant";
// import axios from "axios";
// import { setCookie } from "cookies-next";
// import { redirect } from "next/navigation";

// export async function serverSideSubmit(formData: FormData) {
//   try {
//     const response = await axios.post(`${API_URL}${Apies.Login}`, {
//       username: formData.get("username") as string,
//       password: formData.get("password") as string,
//       captcha_text: formData.get("captcha_text") as string,
//       captcha_id: formData.get("captcha_id") as string,
//     });
//     if (response.data.data.jwt) {
//       console.log(response.data.data.jwt);

//       setCookie(cookieName, response.data.data.jwt, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//       });
//       redirect("/dashboard/home");
//     }
//   } catch (e: any) {
//     console.log(e);
//   }
// }
// app/auth/actions.ts
// app/auth/actions.ts
"use server";

import { API_URL } from "@/configs/global";
import { Apies } from "@/constant/apis";
import { cookieName } from "@/lib/auth/constant";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function serverSideSubmit(formData: FormData) {
  try {
    const response = await fetch(`${API_URL}${Apies.Login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
        captcha_text: formData.get("captcha_text"),
        captcha_id: formData.get("captcha_id"),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Login failed");
    }

    const data = await response.json();

    if (data.data.jwt) {
      cookies().set(cookieName, data.data.jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
    }
  } catch (e: any) {
    return { error: e.message };
  }
  redirect("/dashboard/home");
}
