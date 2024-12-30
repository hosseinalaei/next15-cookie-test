"use server";
import { cookies } from "next/headers";
import { cookieName } from "./constant";

export async function saveSession(accessToken: string) {
  const cookieStore = cookies();
  cookieStore.set("USER_SESSION", accessToken, {
    httpOnly: false,
    // secure: process.env.NODE_ENV === "production",
    secure: false,
  });
}

export async function removeSession() {
  const cookieStore = cookies();
  cookieStore.delete(cookieName);
}
