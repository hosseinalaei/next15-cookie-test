"use client";
import Button from "@/app/_component/Button";
import Captcha from "@/app/_component/Captcha/Captcha";
import Input from "@/app/_component/Form/Input";
import { API_URL } from "@/configs/global";
import { Apies } from "@/constant/apis";
import { cookieName } from "@/lib/auth/constant";
import { serverSideSubmit } from "@/utils/loginAction";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";

const AuthForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { pending } = useFormStatus();
  // const clientSideSubmit = async (formData: FormData) => {
  //   try {
  //     const response = await axios.post(`${API_URL}${Apies.Login}`, {
  //       username: formData.get("username") as string,
  //       password: formData.get("password") as string,
  //       captcha_text: formData.get("captcha_text") as string,
  //       captcha_id: formData.get("captcha_id") as string,
  //     });
  //     if (response.data.data.jwt) {
  //       setCookie(cookieName, response.data.data.jwt, {
  //         httpOnly: true,
  //         secure: process.env.NODE_ENV === "production",
  //       });
  //       router.push("/dashboard/home");
  //     }
  //   } catch (e: any) {
  //     console.log(e);
  //   }
  // };

  async function handleSubmit(formData: FormData) {
    const result = await serverSideSubmit(formData);
    console.log("result", result);
    if (result) {
      if (result.data.data.jwt) {
        router.push("/dashboard/home");
      }

      if ("error" in result) {
        setError(result.error);
      }
    }
  }
  return (
    <form
      className="w-full"
      action={handleSubmit}
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
