"use client";
// "use server";
import { API_URL } from "@/configs/global";
import { Apies } from "@/constant/apis";
// import { signIn } from "@/lib/auth/signIn";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthForm from "./_components/AuthForm";
import Input from "../_component/Form/Input";
import Button from "../_component/Button";
import { setCookie } from "cookies-next";
// import { signIn } from "@/lib/auth/signIn";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [captcha, setCaptcha] = useState<string>("");
  const [insertCaptcha, setInsertCaptcha] = useState<string>("");
  const [captchaId, setCaptchaId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function handleSubmitLogin(e: any) {
    e.preventDefault();

    setIsLoading(true);
    const body = {
      username: username,
      password: password,
      captcha_text: insertCaptcha,
      captcha_id: captchaId,
    };
    try {
      const res = await axios.post(`${API_URL}${Apies.Login}`, body);
      console.log("aaaaaaaaa", res.data.data.jwt);

      // if (res?.data?.data?.jwt) {
      setCookie("USER_SESSION", res.data.data.jwt);

      router.push("/dashboard/home");
      // return { success: true, data: res.data.data };
      // }
    } catch (e: any) {
      console.log(e);
    }
    // const res: any = await postData(Apies.Login, body);
    // if (res?.statusCode === 200) {
    //   setCookie(
    //     cookieName,
    //     res.data.jwt
    //     //   , {
    //     //   httpOnly: true,
    //     //   secure: true,
    //     // }
    //   );
    //   router.push("/dashboard/home");
    // } else {
    //   toast.error("خطا در ورود");
    // }
    // const result = await signIn(body);
    // const result = await signIn({
    //   username: formData.get("username") as string,
    //   password: formData.get("password") as string,
    //   captcha_text: formData.get("captcha_text") as string,
    //   captcha_id: formData.get("captcha_id") as string,
    // });
    // console.log("result", result);
    // if (!result?.success) {
    //   toast.error(result?.message);
    // }
    // else {
    //   router.push("/dashboard/home");
    // }
    // toast.error(error.message);
    // console.log(error);
    // setIsLoading(false);
  }

  async function getCaptcha() {
    try {
      const response: any = await axios.get(`${API_URL}${Apies.GetCaptcha}`);
      if (response.status === 200) {
        setCaptcha(response?.data?.data?.svg_captcha);
        setCaptchaId(response?.data?.data?.captcha_id);
      }
    } catch (e) {
      console.log("error in get captcha", e);
    }
  }

  useEffect(() => {
    getCaptcha();
  }, []);

  // async function handleSubmit(formData: FormData) {
  //   console.log("aaaas");
  // }
  return (
    <div className="flex justify-between items-center mx-auto min-h-screen bg-[url('/images/bg-login.webp')] bg-cover">
      {/* <div>
        <Image src="/images/login.jpeg" width={500} height={500} alt="login" />
      </div> */}
      <div className="m-auto bg-slate-100 bg-opacity-85 rounded-2xl">
        <div className=" flex flex-col items-center p-20">
          <h1 className="text-2xl">ورود به پنل مدیریت</h1>
          <hr className="w-full h-px mx-auto my-2 bg-gray-400 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

          <AuthForm
            handleSubmit={handleSubmitLogin}
            setUsername={setUsername}
            setPassword={setPassword}
            setInsertCaptcha={setInsertCaptcha}
            insertCaptcha={insertCaptcha}
            getCaptcha={getCaptcha}
            captcha={captcha}
            isLoading={isLoading}
          />

          {/* <form
            className="w-full"
            action={handleSubmitLogin}
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   const formData = new FormData(e.currentTarget);
            //   handleSubmit(formData);
            // }}
          >
            <div className="flex gap-6 my-4 justify-between items-center">
              <label>شناسه کاربری:</label>
              <Input name="username" />
            </div>
            <div className="flex gap-6 my-4 justify-between items-center">
              <label>رمز عبور:</label>
              <Input type="password" name="password" />
            </div>
            <div className="flex justify-between items-center">
              <label>کد امنیتی:</label>
              <div className="flex items-center justify-end gap-2">
                <Input className="w-1/3" name="captchaCode" />
              </div>
            </div>
            <div className="flex justify-center my-6">
              <Button
                variant="primary"
                type="submit"
                className="w-full"
                // isLoading={isLoading}
              >
                ورود
              </Button>
            </div>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
