// "use client";
"use client";
import AuthForm from "./_components/AuthForm";

export default function LoginPage() {
  return (
    <div className="flex justify-between items-center mx-auto min-h-screen bg-[url('/images/bg-login.webp')] bg-cover">
      {/* <div>
        <Image src="/images/login.jpeg" width={500} height={500} alt="login" />
      </div> */}
      <div className="m-auto bg-slate-100 bg-opacity-85 rounded-2xl">
        <div className=" flex flex-col items-center p-20">
          <h1 className="text-2xl">ورود به پنل مدیریت</h1>
          <hr className="w-full h-px mx-auto my-2 bg-gray-400 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

          <AuthForm />
        </div>
      </div>
    </div>
  );
}
