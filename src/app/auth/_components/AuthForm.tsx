"use client";
import Button from "@/app/_component/Button";
import Captcha from "@/app/_component/Captcha/Captcha";
import Input from "@/app/_component/Form/Input";
import { API_URL } from "@/configs/global";
import { Apies } from "@/constant/apis";
import { signIn } from "@/lib/auth/signIn";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { signIn } from "next-auth/react";

const AuthForm = () =>
  // getCaptcha,
  // captcha,
  // isLoading,
  // setUsername,
  // setPassword,
  // insertCaptcha,
  // setInsertCaptcha,
  {
    const router = useRouter();
    async function handleSubmit(formData: FormData) {
      // const body = {
      //   username: formData.get("username") as string,
      //   password: formData.get("password") as string,
      //   captcha_text: formData.get("captcha_text") as string,
      //   captcha_id: formData.get("captcha_id") as string,
      //   callbackUrl: "/dashboard/home",
      // };
      //"credentials",
      const result = await signIn({
        username: formData.get("username") as string,
        password: formData.get("password") as string,
        captcha_text: formData.get("captcha_text") as string,
        captcha_id: formData.get("captcha_id") as string,
        // callbackUrl: "/dashboard/home",
      });
      console.log("result", result);
      if (result?.data?.jwt) {
        router.push("/dashboard/home");
      }
    }

    const clientSideSubmit = async (formData: FormData) => {
      // e.preventDefault()
      try {
        const response = await axios.post(`${API_URL}${Apies.Login}`, {
          username: formData.get("username") as string,
          password: formData.get("password") as string,
          captcha_text: formData.get("captcha_text") as string,
          captcha_id: formData.get("captcha_id") as string,
        });
        console.log("response", response);
      } catch (e: any) {
        console.log(e);
      }
    };

    return (
      <form
        className="w-full"
        action={clientSideSubmit}
        // action={(e) => {
        //   // e.preventDefault();
        //   // const formData = new FormData(e.currentTarget);
        //   handleSubmit();
        // }}
      >
        <div className="flex gap-6 my-4 justify-between items-center">
          <label>شناسه کاربری:</label>
          <Input
            name="username"
            // onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex gap-6 my-4 justify-between items-center">
          <label>رمز عبور:</label>
          <Input
            type="password"
            name="password"
            // onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <label>کد امنیتی:</label>

          <Captcha

          // getCaptcha={getCaptcha}
          // captcha={captcha}
          // setInsertCaptcha={setInsertCaptcha}
          />
        </div>
        <div className="w-full my-6">
          <Button
            variant="primary"
            type="submit"
            className="w-full"
            // isLoading={isLoading}
            // isDisabled={insertCaptcha?.length < 5 ? true : false}
          >
            ورود
          </Button>
        </div>
      </form>
    );
  };

export default AuthForm;
