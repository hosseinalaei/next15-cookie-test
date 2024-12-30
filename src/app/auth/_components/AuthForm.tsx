import Button from "@/app/_component/Button";
import Captcha from "@/app/_component/Captcha/Captcha";
import Input from "@/app/_component/Form/Input";
import { useState } from "react";

const AuthForm = ({
  handleSubmit,
  getCaptcha,
  captcha,
  isLoading,
  setUsername,
  setPassword,
  insertCaptcha,
  setInsertCaptcha,
}: any) => {
  return (
    <form
      className="w-full"
      // onSubmit={handleSubmit}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleSubmit(formData);
      }}
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
        {captcha.length > 0 && (
          <Captcha
            getCaptcha={getCaptcha}
            captcha={captcha}
            setInsertCaptcha={setInsertCaptcha}
          />
        )}
      </div>
      <div className="w-full my-6">
        <Button
          variant="primary"
          type="submit"
          className="w-full"
          isLoading={isLoading}
          isDisabled={insertCaptcha?.length < 5 ? true : false}
        >
          ورود
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;
