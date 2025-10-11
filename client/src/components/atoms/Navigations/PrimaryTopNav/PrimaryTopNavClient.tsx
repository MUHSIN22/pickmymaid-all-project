"use client";
import React from "react";
import HStack from "@/components/ui/HStack";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { IPrimaryNavigationList } from "@/types/components/primaryTopNav/primaryTopNav.types";
import { Fragment } from "react";
import { PrimaryTopNavigationList } from "./PrimaryTopNav.data";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import { setAuthModal } from "@/lib/features/auth/authSlice";
import Avatar from "../../avatar/Avatar";
import { logoutUser } from "@/lib/features/auth/authAction";

interface IPrimaryTopNavClient {
  name: {
    firstName: string;
    lastName: string;
  } | null;
}

export default function PrimaryTopNavClient({ name }: IPrimaryTopNavClient) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    await dispatch(logoutUser());
    window.location.reload();
  };
  return (
    <div className="items-center gap-4 hidden lg:flex">
      {PrimaryTopNavigationList.map((item: IPrimaryNavigationList, index) => {
        if (item.name.includes("Hiring Tips")) {
          return false;
        }
        return (
          <Fragment key={index}>
            <Link
              href={item.path}
              className={clsx(
                "text-description hover:underline xl:text-md font-[500]",
                pathname === item.path || pathname === `${item.path}/`
                  ? "text-primary-300"
                  : "text-black-700"
              )}
              key={item.name}
            >
              {item.name}
            </Link>
          </Fragment>
        );
      })}

      {!name && (
        <HStack>
          <button
            className="btn-solid"
            onClick={() => dispatch(setAuthModal("login"))}
          >
            Login
          </button>
          <button
            className="btn-solid"
            onClick={() => router.push("/register")}
          >
            Register
          </button>
        </HStack>
      )}
      {name && (
        <Avatar
          onLogout={handleLogout}
          fullName={name.firstName + " " + name.lastName}
        />
      )}
    </div>
  );
}
