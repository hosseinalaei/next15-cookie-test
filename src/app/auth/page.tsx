"use client";
import { Apies } from "@/constant/apis";
import { getData, postData } from "@/core/http-service/http-service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthForm from "./_components/AuthForm";
import { signIn } from "@/lib/auth/signIn";
import { setCookie } from "cookies-next";
import { cookieName } from "@/lib/auth/constant";

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
      const res: any = await postData(Apies.Login, body);
      if (res?.statusCode === 200) {
        setCookie(
          cookieName,
          res.data.jwt
          //   , {
          //   httpOnly: true,
          //   secure: true,
          // }
        );
        router.push("/dashboard/home");
      } else {
        toast.error("خطا در ورود");
      }

      // const result = await signIn({
      //   username: formData.get("username") as string,
      //   password: formData.get("password") as string,
      //   captchaCode: formData.get("captchaCode") as string,
      //   captchaId: captchaId,
      // });

      // if (!result.success) {
      //   toast.error(result.message.message);
      // }
      // else {
      //   router.push("/dashboard/home");
      // }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getCaptcha() {
    try {
      const response: any = await getData(Apies.GetCaptcha);

      if (response) {
        setCaptcha(response?.data?.svg_captcha);
        setCaptchaId(response?.data?.captcha_id);
      }
    } catch (e) {
      console.log("error in get captcha", e);
    }
  }

  useEffect(() => {
    getCaptcha();
  }, []);

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
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSubmit(formData);
            }}
          >
            <div className="flex gap-6 my-4 justify-between items-center">
              <label>شناسه کاربری:</label>
              <Input name="userName" />
            </div>
            <div className="flex gap-6 my-4 justify-between items-center">
              <label>رمز عبور:</label>
              <Input type="password" name="password" />
            </div>
            <div className="flex justify-between items-center">
              <label>کد امنیتی:</label>
              <div className="flex items-center justify-end gap-2">
                <Image
                  className="cursor-pointer"
                  src="/images/svg/refresh.svg"
                  alt="captcha"
                  width={20}
                  height={20}
                  onClick={getCaptcha}
                />
                <Image
                  src={`data:image/jpeg;base64,${captcha}`}
                  alt="captcha"
                  width={90}
                  height={100}
                />
                <Input className="w-1/3" name="captchaCode" />
              </div>
            </div>
            <div className="flex justify-center my-6">
              <Button
                variant="primary"
                type="submit"
                className="w-full"
                isLoading={isLoading}
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
