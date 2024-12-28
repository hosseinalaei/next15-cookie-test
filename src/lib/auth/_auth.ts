import { API_URL } from "@/configs/global";
import { Apies } from "@/constant/apis";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { postData } from "@/core/http-service/http-service";

declare module "next-auth" {
  interface User {
    accessToken: string;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  //   ...authConfig,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "text" },
        captcha_text: { label: "captcha_text", type: "text" },
        captcha_id: { label: "captcha_id", type: "text" },
      },
      async authorize(credentials: any) {
        const res = await fetch(`${API_URL}${Apies.Login}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        if (!res.ok) {
          return null;
        }
        const data = await res.json();
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa", data.data);

        return data.data;
      },
      //   async authorize(credentials: any) {
      //     try {
      //       const user = await postData(Apies.Login, {
      //         username: credentials.username as string,
      //         password: credentials.password as string,
      //         captcha_text: credentials.captcha_text as string,
      //         captcha_id: credentials.captcha_id as string,
      //       });
      //       return {
      //         accessToken: user?.token,
      //       };
      //     } catch (e) {
      //       console.log(e);
      //     }
      //   },
    }),
  ],
  // callbacks: {
  //   jwt: async ({ user, token }: any) => {
  //     if (user) {
  //       token.accessToken = data.user.accessToken;
  //     }
  //     return token;
  //   },
  //   session: async ({ session, token }: any) => {
  //     session.accessToken = data?.token.accessToken;

  //     return session;
  //   },
  //   authorized: async ({ auth, request }: any) => {
  //     const isAuthorized = !!auth?.accessToken;
  //     const isPrivatedRoute = request.nextUrl.pathname.startsWith("/dashboard");
  //     if (!isAuthorized && isPrivatedRoute) {
  //       const url = new URL(request.nextUrl);
  //       url.pathname = "/auth";
  //       Response.redirect(url);
  //     }
  //     return true;
  //   },
  // },
});
