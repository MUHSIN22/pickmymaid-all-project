"use client";
import { Fragment, useEffect, useState } from "react";
import { PrimaryTopNavigationList } from "../PrimaryTopNav/PrimaryTopNav.data";
import { IPrimaryNavigationList } from "../../../../types/components/primaryTopNav/primaryTopNav.types";
import {
  AiOutlineLogin,
  IoCallOutline,
  PiHeartFill,
  PiHeartStraight,
  RiAccountCircleLine,
  RiCloseLine,
  RiHome5Fill,
  RiHome5Line,
  RiLogoutCircleLine,
  RiMenuFill,
} from "../../Icons/Icons";
import bulb from "@/assets/images/Tips/bulb.webp";
import { usePathname, useRouter } from "next/navigation";
import Image from "../../NextImageWrapper/Image";
import bottomNavLinks from "./BottomNav.data";
import BottomNavButton from "./BottomNavButton";
import VStack from "../../../ui/VStack";
import clsx from "clsx";
import HStack from "../../../ui/HStack";
import { logoutUser } from "../../../../lib/features/auth/authAction";
import { useAppDispatch, useAppSelector } from "../../../../lib/hooks";
import { setAuthModal } from "../../../../lib/features/auth/authSlice";

export default function BottomNav() {
  const [navOpened, setNavOpen] = useState(false);
  const [isLogoutProcess, setLogoutProcess] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, name } = useAppSelector((state) => state.auth);

  const handleAuth = (type: string) => {
    dispatch(setAuthModal(type as any));
  };

  const handleBackdropClick = (event: any) => {
    event.stopPropagation();
    if (event.target.id === "backdrop") {
      setNavOpen(false);
    }
  };
  const handleLogout = async () => {
    setLogoutProcess(true);
    await dispatch(logoutUser());
    setNavOpen(false);
    setLogoutProcess(false);
    window.location.reload();
  };
  return (
    <div className="overflow-hidden block sm:hidden">
      <div className="grid border-white grid-cols-5 justify-center p-2 px-1 fixed w-[100%] z-[1001] bottom-0 left-0 gap-3 shadow-[0px_-5px_10px_rgba(0,0,0,0.1)] bg-primary-300 text-white h-[4rem]">
        <BottomNavButton
          label="Home"
          path=""
          OutlineIcon={RiHome5Line}
          FillIcon={RiHome5Fill}
          pathname={pathname}
          onClick={() => router.push("/")}
        />
        <BottomNavButton
          label="Favorites"
          path="/favorites"
          OutlineIcon={PiHeartStraight}
          FillIcon={PiHeartFill}
          pathname={pathname}
          onClick={() => router.push("/favorites")}
        />
        <VStack
          className="gap-1 user-select-none outline-none justify-between items-center"
          onClick={() => setNavOpen((prev) => !prev)}
        >
          <VStack className="aspect-square w-[80%] max-w-[3.5rem] margin-[0_auto] rounded-[50%] border-[2px] border-white justify-center self-center items-center mt-[-1.5rem] bg-primary-300 gap-[1rem]">
            {navOpened ? (
              <RiCloseLine className="w-4" />
            ) : (
              <RiMenuFill className="w-4" />
            )}
          </VStack>
          <p className="text-[0.85rem] text-white">Menu</p>
        </VStack>
        <BottomNavButton
          label="Call"
          path="tel:+971566369736"
          OutlineIcon={IoCallOutline}
          FillIcon={IoCallOutline}
          onClick={() => {
            window.location.href = "tel:+971566369736";
          }}
        />
        {/* Auth Button */}
        {!user?.first_name ? (
          <BottomNavButton
            label="Register"
            OutlineIcon={AiOutlineLogin}
            FillIcon={AiOutlineLogin}
            onClick={() => handleAuth("signup")}
            iconClass="h-5 w-3"
          />
        ) : (
          <BottomNavButton
            label={`${name?.firstName} ${name?.lastName}`}
            OutlineIcon={RiAccountCircleLine}
            FillIcon={RiAccountCircleLine}
            labelClass="truncate overflow-hidden whitespace-nowrap w-full"
            iconClass="h-5"
            mainClass="overflow-hidden text-overflow-ellipsis"
          />
        )}
      </div>

      <div
        className={clsx(
          "h-[100%] fixed bottom-0 transition-[opacity_0.3s_ease] z-[1000] left-0 w-[100%] bg-[rgba(0,0,0,0.3)] ",
          navOpened ? "opacity-100 block" : "opacity-0 pointer-events-none none"
        )}
        onClick={handleBackdropClick}
        id="backdrop"
      >
        <div
          className={clsx(
            "flex justify-center gap-4 fixed left-0 z-[995] bg-white p-6 pb-[3rem] flex-wrap gap-y-6 shadow-[3px_0px_15px_rgba(0,0,0,0.2) transition-[all_0.3s_ease]",
            navOpened
              ? "bottom-[3.5rem] opacity-100"
              : "bottom-[-100%] opacity-0"
          )}
        >
          {PrimaryTopNavigationList.map((navItem: IPrimaryNavigationList) => (
            <Fragment key={navItem.name}>
              <p
                className={clsx(
                  "font-[500] text-sm xl:text-md border-[1px_solid_#ff8f5f] rounded-[30px] p-1 px-2 shadow-[0px_0px_5px_1px_rgba(0,0,0,0.1)] flex",
                  pathname === navItem.path || pathname === `${navItem.path}/`
                    ? "text-primary-300"
                    : "text-black-700"
                )}
                onClick={() => {
                  router.push(navItem.path);
                  setNavOpen(false);
                }}
              >
                {navItem.name}
                <span>
                  {navItem.name.includes("hiringTips") && (
                    <Image
                      src={bulb.src}
                      className="aspect-sqaure w-[1rem]"
                      alt="hiring tips pickmymaid"
                    />
                  )}
                </span>
              </p>
            </Fragment>
          ))}
          <HStack className="w-[100%] justify-center">
            {user?.first_name ? (
              <button onClick={handleLogout} className="btn-solid">
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    dispatch(setAuthModal("login"));
                    setNavOpen(false);
                  }}
                  className="btn-solid"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    dispatch(setAuthModal("signup"));
                    setNavOpen(false);
                  }}
                  className="btn-solid"
                >
                  Register
                </button>
              </>
            )}
          </HStack>
        </div>
      </div>
    </div>
  );
}
