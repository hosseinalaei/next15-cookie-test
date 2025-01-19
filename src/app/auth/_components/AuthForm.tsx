"use client";
import Button from "@/app/_component/Button";
import Captcha from "@/app/_component/Captcha/Captcha";
import Input from "@/app/_component/Form/Input";
import { signIn } from "@/lib/auth/signIn";
import { useState } from "react";
import { toast } from "react-toastify";

const AuthForm = () => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    const result = await signIn({
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      captcha_text: formData.get("captcha_text") as string,
      captcha_id: formData.get("captcha_id") as string,
    });
    console.log(result);
    if (result) {
      toast.error(result);
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
