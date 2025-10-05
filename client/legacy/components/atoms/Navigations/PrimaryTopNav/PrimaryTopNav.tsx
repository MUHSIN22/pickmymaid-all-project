"use client";
import {
  Avatar,
  Button,
  Flex,
  Link as ChakraLink,
  HStack,
  Menu,
  Image as ChakraImage,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Text,
} from "@chakra-ui/react";
import { Fragment, useEffect } from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { PrimaryTopNavigationList } from "./PrimaryTopNav.data";
import Link from "next/link";
import uaeFlag from "@/assets/icons/flags/uae.png";
import usFlag from "@/assets/icons/flags/us.png";
import { RiLogoutCircleLine } from "../../Icons/Icons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  logoutUser,
  verifyAuthentication,
} from "@/lib/features/auth/authAction";
import { IPrimaryNavigationList } from "@/types/components/primaryTopNav/primaryTopNav.types";
import { setAuthModal } from "@/lib/features/auth/authSlice";
import Image from "../../../../../src/components/atoms/NextImageWrapper/Image";
import { usePathname, useParams } from "next/navigation";
import { Locale } from "@/types/i18n.type";

export default function PrimaryTopNav() {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { changeLang } = useTranslation();
  const { locale } = useParams();
  const { user, status } = useAppSelector((state) => state?.auth);
  const { redirection } = useAppSelector((state) => state.utils);
  const name = useAppSelector((state) => state?.auth?.name);

  // todo_add_function
  const handleLanguageSwitching = (value: Locale) => {
    changeLang(value);
  };

  useEffect(() => {
    dispatch(verifyAuthentication());
  }, [status, redirection, pathname]);

  return (
    <Flex
      pos="sticky"
      top={0}
      left={0}
      zIndex={1500}
      justifyContent="space-between"
      py={{ base: 2, md: 4 }}
      px={{ base: 4, md: 6, lg: 8, xl: 8, "2xl": 32 }}
      pb={{ base: 1, md: 4 }}
      w={{ base: "max-content", md: "100%" }}
      h={{ base: "4rem", md: "5rem" }}
      bg={{ base: "transparent", lg: "white" }}
      boxShadow={{ base: "none", lg: "0px 0px 12.0198px rgba(0, 0, 0, 0.2)" }}
    >
      <Link href={`/${locale ?? "en"}`} onClick={() => window.scrollTo(0, 0)}>
        <ChakraImage
          aspectRatio={155 / 42}
          src="/logo/logo-orange.webp"
          w={{ base: "8rem", sm: "11rem" }}
          alt="pickmymaid"
        />
      </Link>
      {/* <Spacer /> */}
      <Show above="lg">
        <HStack gap={{ base: 2, xl: 5 }}>
          {PrimaryTopNavigationList.map((navItem: IPrimaryNavigationList) => (
            <Fragment key={navItem.name}>
              {!navItem.name.includes("hiringTips") && (
                <ChakraLink
                  as={Link}
                  fontWeight={500}
                  fontSize={{ base: "sm", xl: "md" }}
                  color={
                    pathname === navItem.path || pathname === `${navItem.path}/`
                      ? "brand.primary.300"
                      : "text.black.700"
                  }
                  key={navItem.name}
                  href={`/${locale ?? "en"}${navItem.path}`}
                >
                  {t(navItem.name)}
                </ChakraLink>
              )}
            </Fragment>
          ))}
          {!user ? (
            <>
              <Button
                variant="solid"
                onClick={() => dispatch(setAuthModal("login"))}
              >
                {t("common.button.login")}
              </Button>
              <Button
                variant="solid"
                onClick={() => {
                  dispatch(setAuthModal("signup"));
                  localStorage.setItem("isUnlock", "clicked");
                }}
              >
                {t("common.button.signup")}
              </Button>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar
                  size={"sm"}
                  src={user?.profile}
                  name={`${name?.firstName} ${name?.lastName}`}
                />
                <Text>{`${name?.firstName} ${name?.lastName}`}</Text>
              </MenuButton>
              <MenuList>
                <Text p="2" variant="description">
                  Hy, {name?.firstName}
                </Text>
                <MenuItem onClick={() => dispatch(logoutUser())}>
                  <HStack color="red">
                    <RiLogoutCircleLine />
                    <span>{t("common.button.logout")}</span>
                  </HStack>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
          {/* <Select w='max-content' onChange={handleLanguageSwitching} size='xs'>
            <option value='en'>{t('common.english')}</option>
            <option value='ar'>{t('common.arabic')}</option>
          </Select> */}
          <Button
            size="xs"
            variant="ghost"
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
            onClick={() =>
              handleLanguageSwitching(i18n.dir() === "ltr" ? "ar" : "en")
            }
          >
            {i18n.dir() === "ltr" ? (
              <>
                عربي
                <Image
                  src={uaeFlag?.src}
                  alt="uae flag"
                  aspectRatio={1 / 1}
                  w="22px"
                  h="auto"
                />
              </>
            ) : (
              <>
                English
                <Image
                  src={usFlag?.src}
                  alt="us flag"
                  aspectRatio={1 / 1}
                  w="22px"
                  h="auto"
                />
              </>
            )}
          </Button>
        </HStack>
      </Show>
    </Flex>
  );
}
