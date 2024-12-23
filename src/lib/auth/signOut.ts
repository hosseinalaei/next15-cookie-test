"use server";
import "server-only";
import { redirect } from "next/navigation";
import { removeSession } from "./saveSession";

export async function signOut(options?: { redirectoTo?: string }) {
  removeSession();
  redirect(options?.redirectoTo ?? "/auth");
}
