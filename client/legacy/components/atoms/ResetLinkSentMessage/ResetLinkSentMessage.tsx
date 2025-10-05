import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import linkImage from "@/assets/images/AuthPages/password to email.png";
import { getAlternativeText } from "@/utils/altSelector";
import { useAppDispatch } from "@/lib/hooks";
import { setAuthModal } from "@/lib/features/auth/authSlice";
import Image from "../../../../src/components/atoms/NextImageWrapper/Image";

export default function ResetLinkSentMessage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    router.push("/");
    dispatch(setAuthModal("login-form"));
  };
  return (
    <VStack gap={{ base: 4 }}>
      <Heading variant="tertiary">Password Reset Link Sent</Heading>
      <Image
        alt={getAlternativeText()}
        src={linkImage.src}
        w={"10rem"}
        aspectRatio={1 / 1}
      />
      <Text variant="description" textAlign="center">
        We have sent a password reset link to your registered email address.
        Please check your inbox and follow the instructions provided to reset
        your account access. If you don&apos;t see the email in your inbox,
        please check your spam folder.
      </Text>
      <Button variant="outlined" onClick={handleLogin}>
        Login Now
      </Button>
    </VStack>
  );
}
