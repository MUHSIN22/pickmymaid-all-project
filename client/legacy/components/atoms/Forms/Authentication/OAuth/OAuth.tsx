import { Button, Icon, Text, VStack } from "@chakra-ui/react";
import { BaselineApple, FcGoogle, MdOutlineMail } from "../../../Icons/Icons";

const authOptions: { title: string; icon: JSX.Element; type: string; link?: string }[] = [
  {
    title: "Continue with Google",
    icon: (
      <Icon
        as={FcGoogle}
        fontSize="1.5rem"
      />
    ),
    type: "google",
    link: "auth/google",
  },
  {
    title: "Continue with Apple",
    icon: (
      <Icon
        as={BaselineApple}
        fontSize="1.6rem"
      />
    ),
    type: "apple",
    link: "auth/apple",
  },
  {
    title: "Continue with Email",
    icon: (
      <Icon
        as={MdOutlineMail}
        color="red"
        fontSize="1.5rem"
      />
    ),
    type: "email",
  },
];

export default function OAuth({ setCustom }) {
  const handleOAuth = (type: string, link: string) => {
    const baseURL: string =
      process.env.NEXT_PUBLIC_CUSTOM_MODE === "PROD" ? (process.env.NEXT_PUBLIC_API_URL_PROD as string) : (process.env.NEXT_PUBLIC_API_URL as string);

    if (type === "email") {
      setCustom(type);
      return true;
    }

    setCustom(type);
    window.location.href = `${baseURL}v2/${link}?redirect=${encodeURIComponent(location.href)}`;
  };
  return (
    <VStack
      gap={{ base: 4 }}
      w="100%">
      {authOptions.map((option, index) => (
        <Button
          key={index}
          leftIcon={option?.icon}
          bg="#f2f3f5"
          _hover={{
            bg: "#d4d7de",
          }}
          justifyContent="center"
          // gap='20%'
          border="1px solid #f2f3f5"
          color="#2e2e2e"
          w="100%"
          fontWeight={700}
          onClick={() => handleOAuth(option?.type as string, option?.link as string)}>
          <Text flexGrow={10}>{option?.title}</Text>
        </Button>
      ))}

      {/* <Text
        variant='description'
        display='flex'
        alignItems='center'
        gap='1rem'
        w='100%'
        _before={{
          content: "''",
          display: 'block',
          flex: 1,
          height: '1px',
          background: '#2e2e2e',
        }}
        _after={{
          content: "''",
          display: 'block',
          flex: 1,
          height: '1px',
          background: '#2e2e2e',
        }}
      >
        OR
      </Text> */}
    </VStack>
  );
}
