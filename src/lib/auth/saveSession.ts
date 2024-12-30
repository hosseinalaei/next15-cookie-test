"use server";
import { cookies } from "next/headers";
import { cookieName } from "./constant";

export async function saveSession(accessToken: string) {
  const cookieStore = await cookies();
  cookieStore.set("USER_SESSION", accessToken);
}

export async function removeSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}
