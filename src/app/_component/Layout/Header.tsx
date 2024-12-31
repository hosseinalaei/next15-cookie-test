"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import UserInfo from "../UserInfo";
import { signOut } from "@/lib/auth/signOut";
import { useEffect, useRef, useState } from "react";
// import Modal from "@/app/_components/Modal/Modal";
// import ChangePassword from "../ChangePassword";
// import { signOut } from "next-auth/react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [changePasswordModal, setChangePasswordModal] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  return (
    <>
      <header className="flex justify-between h-20 items-center border-b px-8 bg-white sticky z-50 w-full">
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/user-avatar.svg"
            alt="icon"
            width={20}
            height={20}
            onClick={toggleMenu}
            className="cursor-pointer"
          />

          <div className="mx-2 text-xl">{/* <UserInfo /> */}</div>

          {/* {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute top-full right-5 shadow-lg rounded-md w-64 border bg-slate-100 min-h-20"
            >
              <div className=" m-4">
                <ul>
                  <li
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setChangePasswordModal(true)}
                  >
                    تغییر پسورد
                  </li>
                </ul>
              </div>
            </div>
          )} */}
        </div>
        <div className="flex gap-2">
          <div className="flex bg-neutral-100 rounded-full justify-center items-center px-4 py-2">
            <span
              className="cursor-pointer"
              onClick={() => {
                // signOut({ callbackUrl: "/auth" });
                signOut();
              }}
              title="خروج"
            >
              خروج
            </span>
            <Image
              src="/images/svg/logout.svg"
              alt="icon"
              width={20}
              height={20}
              className="mr-2"
            />
          </div>
        </div>
      </header>
      {/* {changePasswordModal && (
        <Modal closeModal={() => setChangePasswordModal(false)}>
          <ChangePassword setChangePasswordModal={setChangePasswordModal} />
        </Modal>
      )} */}
    </>
  );
};

export default Header;
