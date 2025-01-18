// "use client";
import Button from "@/app/_component/Button";
import Captcha from "@/app/_component/Captcha/Captcha";
import Input from "@/app/_component/Form/Input";
import { API_URL } from "@/configs/global";
import { Apies } from "@/constant/apis";
import { cookieName } from "@/lib/auth/constant";
import { signIn } from "@/lib/auth/signIn";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const AuthForm = () => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    // try {
    //   const response = await axios.post(`${API_URL}${Apies.Login}`, {
    //     username: formData.get("username"),
    //     password: formData.get("password"),
    //     captcha_text: formData.get("captcha_text"),
    //     captcha_id: formData.get("captcha_id"),
    //   });
    //   console.log(response.data.data.jwt);
    //   if (response.data.data.jwt) {
    //     setCookie(cookieName, response.data.data.jwt);
    //     router.push("/dashboard/home");
    //   }
    // } catch (e: any) {
    //   console.log(e);
    //   toast.error(e.response.data.message);
    // }
    const result = await signIn({
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      captcha_text: formData.get("captcha_text") as string,
      captcha_id: formData.get("captcha_id") as string,
    });
    // if (result) {
    //   console.log("result", result);
    // }
    if (!result.success) {
      toast.error(result.message?.message);
    }
    if (result.success) {
      console.log(result);
      router.push("/dashboard/home");
    }
  }

  return (
    <form className="w-full" action={handleSubmit}>
      <div className="flex gap-6 my-4 justify-between items-center">
        <label>شناسه کاربری:</label>
        <Input name="username" required />
      </div>
      <div className="flex gap-6 my-4 justify-between items-center">
        <label>رمز عبور:</label>
        <Input type="password" name="password" required />
      </div>
      <div className="flex justify-between items-center">
        <label>کد امنیتی:</label>
        <Captcha />
      </div>
      {error && (
        <div className="text-red-500 my-4">
          <p>{error}</p>
        </div>
      )}
      <div className="w-full my-6">
        <Button
          variant="primary"
          type="submit"
          className="w-full"
          isDisabled={isSubmitting}
        >
          {isSubmitting ? "در حال ورود..." : "ورود"}
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;
