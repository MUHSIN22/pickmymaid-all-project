"use client";
import {
  Box,
  Button,
  Flex,
  HStack,
  Hide,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { Fragment, useEffect, useState } from "react";
import { PrimaryTopNavigationList } from "../PrimaryTopNav/PrimaryTopNav.data";
import { IPrimaryNavigationList } from "@/types/components/primaryTopNav/primaryTopNav.types";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import uaeFlag from "@/assets/icons/flags/uae.png";
import usFlag from "@/assets/icons/flags/us.png";
import { logoutUser } from "@/lib/features/auth/authAction";
import { setAuthModal } from "@/lib/features/auth/authSlice";
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
} from "@/components/atoms/Icons/Icons";
import bulb from "@/assets/images/Tips/bulb.webp";
import { usePathname, useRouter } from "next/navigation";
import Image from "../../../../../src/components/atoms/NextImageWrapper/Image";

export default function BottomNav() {
  const [navOpened, setNavOpen] = useState(false);
  const [isLogoutProcess, setLogoutProcess] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const { user, name } = useAppSelector((state) => state.auth);

  // const handleLanguageSwitching = (value) => {
  //   i18n.changeLanguage(value);
  // };

  const handleAuth = (type) => {
    dispatch(setAuthModal(type));
  };

  const handleBackdropClick = (event) => {
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
  };

  // useEffect(() => {
  //   const body: HTMLBodyElement = document.querySelector(
  //     "body"
  //   ) as HTMLBodyElement;
  //   if (navOpened) {
  //     body.style.maxHeight = "100vh";
  //     body.style.overflow = "hidden";
  //   } else {
  //     body.style.maxHeight = "auto";
  //     body.style.overflow = "auto";
  //   }
  // }, [navOpened]);

  console.log(user);
  return (
    <Hide above="sm">
      <Box overflow="hidden">
        <SimpleGrid
          bg="brand.primary.300"
          borderColor="white"
          columns={5}
          justifyContent="center"
          p={2}
          px={1}
          position="fixed"
          w="100%"
          zIndex={996}
          bottom={0}
          left={0}
          gap={3}
          boxShadow="-5px 0px 10px rgba(0,0,0,0.1)"
          color="white"
          height="4rem"
        >
          <VStack
            alignSelf="center"
            userSelect="none"
            _selection={{ backgroundColor: "transparent" }}
            _active={{ background: "transparent" }}
            _focus={{ background: "transparent" }}
            outline="none"
            _after={{ background: "transparent" }}
            gap={1}
            onClick={() => router.push("/")}
          >
            <Icon
              fontSize="1.3rem"
              as={["/", ""].includes(pathname) ? RiHome5Fill : RiHome5Line}
            />
            <Text fontSize="0.85rem" color="white" margin="0 !important">
              Home
            </Text>
          </VStack>

          <VStack
            alignSelf="center"
            gap={1}
            userSelect="none"
            _selection={{ backgroundColor: "transparent" }}
            _active={{ background: "transparent" }}
            _focus={{ background: "transparent" }}
            outline="none"
            _after={{ background: "transparent" }}
            onClick={() => router.push("/favorites")}
          >
            <Icon
              as={
                ["/favorites", "/favorites/"].includes(pathname)
                  ? PiHeartFill
                  : PiHeartStraight
              }
              fontSize="1.3rem"
            />
            <Text fontSize="0.85rem" color="white" margin="0 !important">
              Favorites
            </Text>
          </VStack>

          <VStack
            gap={1}
            userSelect="none"
            _selection={{ backgroundColor: "transparent" }}
            _active={{ background: "transparent" }}
            _focus={{ background: "transparent" }}
            outline="none"
            _after={{ background: "transparent" }}
            onClick={() => setNavOpen((prev) => !prev)}
          >
            <VStack
              aspectRatio={1 / 1}
              w="80%"
              maxW="3.5rem"
              margin="0 auto"
              borderRadius="50%"
              border="2px solid"
              borderColor="white"
              alignSelf="center"
              justifyContent="center"
              mt="-1.5rem"
              bg="brand.primary.300"
              gap={1}
            >
              <Icon
                fontSize="1.3rem"
                color="white"
                as={navOpened ? RiCloseLine : RiMenuFill}
              />
            </VStack>
            <Text fontSize="0.85rem" color="white" margin="0 !important">
              Menu
            </Text>
          </VStack>

          <VStack
            alignSelf="center"
            gap={1}
            userSelect="none"
            _selection={{ backgroundColor: "transparent" }}
            _active={{ background: "transparent" }}
            _focus={{ background: "transparent" }}
            outline="none"
            _after={{ background: "transparent" }}
            onClick={() => {
              window.location.href = "tel:+971566369736";
            }}
          >
            <Icon
              as={IoCallOutline}
              fontSize="1.3rem"
              style={{
                animation: "tilt 0.3s ease infinite",
              }}
            />
            <Text fontSize="0.85rem" color="white" margin="0 !important">
              Call
            </Text>
          </VStack>
          {!user?.first_name ? (
            <VStack
              alignSelf="center"
              animation="0.3s ease"
              gap={1}
              onClick={() => handleAuth("signup")}
            >
              <Icon as={AiOutlineLogin} fontSize="1.3rem" />
              <Text fontSize="0.85rem" color="white" margin="0 !important">
                Register
              </Text>
            </VStack>
          ) : (
            <VStack
              alignSelf="center"
              userSelect="none"
              _selection={{ backgroundColor: "transparent" }}
              _active={{ background: "transparent" }}
              _focus={{ background: "transparent" }}
              outline="none"
              overflow="hidden"
              gap={2}
            >
              <Icon as={RiAccountCircleLine} fontSize="1.3rem" />
              <Text
                textAlign="center"
                whiteSpace="nowrap"
                w="100%"
                fontSize="0.85rem"
                overflow="hidden"
                color="white"
                textOverflow="ellipsis"
                margin={0}
              >{`${name?.firstName} ${name?.lastName}`}</Text>
            </VStack>
          )}
        </SimpleGrid>
        <Box
          h="100%"
          pos="absolute"
          bottom="0"
          opacity={navOpened ? 1 : 0}
          display={navOpened ? "block" : "none"}
          transition="opacity 0.3s ease"
          left="0"
          w="100%"
          bg="rgba(0,0,0,0.3)"
          zIndex={100}
          onClick={handleBackdropClick}
          id="backdrop"
        >
          <Flex
            justifyContent="center"
            gap={4}
            pos="fixed"
            bottom={navOpened ? "3.5rem" : "-100%"}
            opacity={navOpened ? 1 : 0}
            left="0"
            zIndex={995}
            bg="white"
            p={6}
            pb="3rem"
            flexWrap="wrap"
            columnGap={6}
            boxShadow="3px 0px 15px rgba(0,0,0,0.2)"
            transition="all 0.3s ease"
          >
            {PrimaryTopNavigationList.map((navItem: IPrimaryNavigationList) => (
              <Fragment key={navItem.name}>
                <Text
                  key={navItem.name}
                  fontWeight={500}
                  fontSize={{ base: "sm", xl: "md" }}
                  color={
                    pathname === navItem.path || pathname === `${navItem.path}/`
                      ? "brand.primary.300"
                      : "text.black.700"
                  }
                  border="1px solid #FF8F5F"
                  borderRadius="30px"
                  p={1}
                  px={2}
                  boxShadow="0px 0px 5px 1px rgba(0,0,0,0.1)"
                  display="flex"
                  onClick={() => {
                    setNavOpen(false);
                    router.push(navItem.path);
                  }}
                >
                  {t(navItem.name)}
                  {/* TODO: Hiring tips buld */}
                  {/* <span>
                  {navItem.name.includes("hiringTips") && (
                    <Image
                      src={bulb.src}
                      w="1rem"
                      aspectRatio={1 / 1}
                      alt="hiring tips pickmymaid"
                    />
                  )}
                </span> */}
                </Text>
              </Fragment>
            ))}
            {/* <Button
            size="xs"
            variant="ghost"
          >
            {i18n.dir() === "ltr" ? (
              <>
                عربي
                <Image
                  src={uaeFlag}
                  aspectRatio={1 / 1}
                  w="16px"
                  h="auto"
                  ml="5px"
                />
              </>
            ) : (
              <>
                English
                <Image
                  src={usFlag}
                  aspectRatio={1 / 1}
                  w="16px"
                  h="auto"
                  mr="5px"
                />
              </>
            )}
          </Button> */}
            <HStack w="100%" justifyContent="center">
              {!user?.first_name ? (
                <>
                  <Button
                    variant="solid"
                    onClick={() => {
                      dispatch(setAuthModal("login"));
                      setNavOpen(false);
                    }}
                  >
                    {t("common.button.login")}
                  </Button>
                  <Button
                    variant="solid"
                    onClick={() => {
                      dispatch(setAuthModal("signup"));
                      setNavOpen(false);
                    }}
                  >
                    {t("common.button.signup")}
                  </Button>
                </>
              ) : (
                <Button
                  variant="solid"
                  colorScheme="red"
                  leftIcon={<RiLogoutCircleLine />}
                  isDisabled={isLogoutProcess}
                  onClick={handleLogout}
                >
                  {t("common.button.logout")}
                </Button>
              )}
            </HStack>
          </Flex>
        </Box>
      </Box>
    </Hide>
  );
}
