import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth",
  },
  callbacks: {},
  providers: [],
} satisfies NextAuthConfig;

type Config = {
  username: string;
  password: string;
  captcha_text: string;
  captcha_id: string;
};
// fetch("url", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     username: "",
//     password: "",
//     captcha_text: "",
//     captcha_id: "",
//   } satisfies Config),
// });
