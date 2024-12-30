"use client";
import Image from "next/image";
import Input from "../Form/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/configs/global";
import { Apies } from "@/constant/apis";

const Captcha = ({ setInsertCaptcha, captcha, getCaptcha }: any) => {
  // const [captcha, setCaptcha] = useState<string>("");

  // const [captchaId, setCaptchaId] = useState<string>("");

  // async function getCaptcha() {
  //   try {
  //     const response: any = await axios.get(`${API_URL}${Apies.GetCaptcha}`);
  //     if (response.status === 200) {
  //       setCaptcha(response?.data?.data?.svg_captcha);
  //       setCaptchaId(response?.data?.data?.captcha_id);
  //     }
  //   } catch (e) {
  //     console.log("error in get captcha", e);
  //   }
  // }

  // useEffect(() => {
  //   getCaptcha();
  // }, []);
  return (
    <>
      <div className="flex items-center justify-end gap-2">
        {/* <Image
          className="cursor-pointer"
          src="/images/svg/refresh.svg"
          alt="captcha"
          width={20}
          height={20}
          onClick={getCaptcha}
        /> */}
        <div dangerouslySetInnerHTML={{ __html: captcha }} />
        {/* <Image src={captcha} alt="captcha" width={90} height={100} /> */}
        <Input
          className="w-1/3"
          name="captcha_text"
          onChange={(e) => setInsertCaptcha(e.target.value)}
        />
        {/* <Input
          value={captchaId}
          className="w-1/3 hidden"
          name="captcha_id"
          // onChange={(e) => setInsertCaptcha(e.target.value)}
        /> */}
      </div>
    </>
  );
};

export default Captcha;
