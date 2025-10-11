"use client";
import linkImage from "@/assets/images/AuthPages/password-to-email.png";
import { getAlternativeText } from "@/utils/altSelector";
import { useAppDispatch } from "@/lib/hooks";
import { setAuthModal } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ResetLinkSentMessage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    router.push("/");
    dispatch(setAuthModal("login-form"));
  };
  return (
    <div className="flex flex-col justify-center items-center gap-4 p-4">
      <h2 className="heading-tertiary">Password Reset Link Sent</h2>
      <div className="relative w-[10rem] aspect-square">
        <Image
          loading="lazy"
          alt={getAlternativeText()}
          src={linkImage.src}
          fill
          className="object-contain"
        />
      </div>
      <p className="text-fade text-center max-w-[50rem]">
        We have sent a password reset link to your registered email address. Please check your inbox and follow the instructions provided to reset your account
        access. If you don&apos;t see the email in your inbox, please check your spam folder.
      </p>
      <button
        className="border-2 border-primary-300 px-4 py-2 rounded-md text-primary-300"
        onClick={handleLogin}>
        Login Now
      </button>
    </div>
  );
}
