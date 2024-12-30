"use server";
import { cookies } from "next/headers";
import "server-only";
import { cookieName } from "./constant";

export async function getSession(): Promise<{ token: string } | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(cookieName)?.value;
  console.log("ooooo", token);

  if (!token) {
    return null;
  }
  return { token };
}
