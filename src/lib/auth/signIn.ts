// "use server";
// import { API_URL } from "@/configs/global";
// import { Apies } from "@/constant/apis";
// import axios from "axios";
// import { cookies } from "next/headers";
// import "server-only";
// import { cookieName } from "./constant";

// interface Props {
//   username: string;
//   password: string;
//   redirectTo?: string;
//   captcha_text: string;
//   captcha_id: string;
// }
// export async function signIn({
//   username,
//   password,
//   captcha_text,
//   captcha_id,
// }: Props) {
//   const body = {
//     username,
//     password,
//     captcha_text: captcha_text,
//     captcha_id: captcha_id,
//   };
//   if (!API_URL) {
//     console.error('API_URL is not defined');
//     return {
//       success: false,
//       message: "Configuration error"
//     };
//   }
//   try {
//     console.log('Making request to:', `${API_URL}${Apies.Login}`);
//     console.log('Request body:', { username, captcha_text, captcha_id });

//     const res: any = await axios.post(`${API_URL}${Apies.Login}`, body);

//     // saveSession(res?.data?.jwt);
//     if (res?.data?.jwt) {
//       const cookieStore = await cookies();
//       cookieStore.set(cookieName, res?.data?.jwt, {
//         httpOnly: true,
//         // secure: process.env.NODE_ENV === "production" ? true : false,
//         secure: true,
//         sameSite: "lax",
//         path: "/dashboard/home",
//       });
//       return { success: true, res: res };
//     }
//     return {
//       success: false,
//       message: res.data.message,
//       res: res,
//     };
//     // redirect("/cooperate/admin/dashboard");
//   } catch (error: any) {
//     return { success: false, message: error };
//   }
// }

// "use server";
// import { Apies } from "@/constant/apis";
// import { cookies } from "next/headers";
// import { cookieName } from "./constant";
// import { API_URL } from "@/configs/global";
// import axios from "axios";
// import { redirect } from "next/navigation";
// interface Props {
//   username: string;
//   password: string;
//   redirectTo?: string;
//   captcha_text: string;
//   captcha_id: string;
// }
// export async function signIn({
//   username,
//   password,
//   captcha_text,
//   captcha_id,
// }: Props) {
//   if (!API_URL) {
//     console.error("API_URL is not defined");
//     return {
//       success: false,
//       message: "Configuration error",
//     };
//   }

//   try {
//     // Log the request URL and body (remove in production)
//     console.log("Making request to:", `${API_URL}${Apies.Login}`);
//     console.log(
//       "Request body:",
//       JSON.stringify({
//         username: username,
//         password: password,
//         captcha_text: captcha_text,
//         captcha_id: captcha_id,
//       })
//     );

//     const response = await fetch(`${API_URL}${Apies.Login}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({
//         username: username,
//         password: password,
//         captcha_text: captcha_text,
//         captcha_id: captcha_id,
//       }),
//       credentials: "include",
//     });
//     // console.log("response", response.json());

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Error response:", errorText);

//       try {
//         const errorJson = JSON.parse(errorText);
//         return {
//           success: false,
//           message: errorJson.message || `Server error: ${response.status}`,
//         };
//       } catch {
//         return {
//           success: false,
//           message: `Server error: ${response.status} - ${errorText.slice(
//             0,
//             100
//           )}`,
//         };
//       }
//     }

//     const data = await response.json();

//     if (!data?.data?.jwt) {
//       console.error("No JWT in response:", data, data?.data?.jwt);
//       return {
//         success: false,
//         message: "Invalid server response",
//       };
//     }

//     // Set the cookie
//     try {
//       const cookieStore = cookies();
//       cookieStore.set(cookieName, data.data.jwt, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         path: "/",
//       });
//       return {
//         success: true,
//         data: {
//           jwt: data?.data?.jwt,
//         },
//       };
//     } catch (cookieError) {
//       console.error("Failed to set cookie:", cookieError);
//       return {
//         success: false,
//         message: "Failed to set authentication cookie",
//       };
//     }
//   } catch (error) {
//     // Log the full error for debugging
//     console.error("Login error:", error);

//     return {
//       success: false,
//       message: "An unexpected error occurred during login",
//     };
//   }
// }

"use server";
import { API_URL } from "@/configs/global";
import { Apies } from "@/constant/apis";
import axios from "axios";
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
  redirectTo = "/",
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
    console.log("aaaaaaaaa", res.data.data.jwt);

    saveSession(res.data.data.jwt);

    // redirect("/cooperate/admin/dashboard");
    return { success: true, data: res.data.data };
  } catch (error: any) {
    return { success: false, message: error?.response?.data };
  }
}
