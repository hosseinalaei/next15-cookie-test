import Image from "next/image";
import Input from "../Form/Input";

const Captcha = ({ getCaptcha, captcha, setInsertCaptcha }: Captcha) => {
  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <Image
          className="cursor-pointer"
          src="/images/svg/refresh.svg"
          alt="captcha"
          width={20}
          height={20}
          onClick={getCaptcha}
        />
        <div dangerouslySetInnerHTML={{ __html: captcha }} />
        {/* <Image src={captcha} alt="captcha" width={90} height={100} /> */}
        <Input
          className="w-1/3"
          name="captchaCode"
          onChange={(e) => setInsertCaptcha(e.target.value)}
        />
      </div>
    </>
  );
};

export default Captcha;
