"use client";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../lib/hooks";
import { verifyAuthentication } from "../../../../lib/features/auth/authAction";
import { usePathname } from "next/navigation";
import Loading from "../../../../app/loading";
const PrimaryTopNavClient = dynamic(() => import("./PrimaryTopNavClient"), {
  ssr: false,
});

export default function PrimaryTopNavWrapper() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);
  const redirection = useAppSelector((state) => state?.utils?.redirection);
  const pathname = usePathname();
  const name = useAppSelector((state) => state?.auth?.name);

  useEffect(() => {
    dispatch(verifyAuthentication());
  }, [status, redirection, pathname]);

  return <PrimaryTopNavClient name={name} />;
}
