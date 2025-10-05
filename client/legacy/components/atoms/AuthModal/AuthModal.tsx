import { Center, Grid, Hide, Icon, Image, Modal, ModalBody, ModalContent, ModalOverlay, VStack } from "@chakra-ui/react";
import registerBanner from "@/assets/images/AuthPages/register-banner.png";
import { useEffect } from "react";
import { RiCloseLine } from "../Icons/Icons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import useCustomToast from "@/lib/hooks/useCustomToast";
import { resetAuthState, setAuthModal } from "@/lib/features/auth/authSlice";

export default function AuthModal({ isOpen, onClose, children }) {
  const { status, message } = useAppSelector((state) => state.auth);
  const customToast = useCustomToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status !== "idle") {
      if (status === "success" && message) {
        customToast("Great!", message as string, "success");
        onClose();
        setAuthModal(null);
      } else if (status === "error" && message) {
        customToast("Ugh no!", message as string, "error");
      }
      dispatch(resetAuthState());
    }
  }, [status, message]);
  return (
    // <Center
    //   w='100%'
    //   h='100vh'
    //   bg='rgba(28,39,48,.5)'
    //   backdropFilter='blur(4px)'
    //   pos='fixed'
    //   top='0'
    //   left='0'
    //   zIndex='99999'
    // >
    //   <Grid bg='white' w='50rem' height='30rem' borderRadius='15px'>

    //   </Grid>
    // </Center>
    <Modal
      isOpen={isOpen}
      isCentered
      size="4xl"
      blockScrollOnMount
      closeOnOverlayClick={false}
      onClose={onClose}>
      <ModalOverlay
        backdropFilter="blur(4px)"
        zIndex={1000}
        bg="rgba(28,39,48,.5)"
      />
      <ModalContent
        zIndex={999999}
        mx="1rem"
        w="max-content"
        borderRadius="15px"
        p={0}>
        <Center
          w="2rem"
          aspectRatio={1 / 1}
          borderRadius="50%"
          pos="absolute"
          bg="rgba(0,0,0,0.5)"
          right={{ base: 0, lg: "-0.5rem" }}
          cursor="pointer"
          top={{ base: "-0.5rem", lg: 0 }}
          transform={{ base: "translateY(-100%)", lg: "translateX(100%)" }}
          onClick={() => {
            onClose();
            localStorage.setItem("isUnlock", "");
          }}>
          <Icon
            as={RiCloseLine}
            fontSize="1.5rem"
            color="white"
          />
        </Center>
        <ModalBody p={0}>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }}>
            <VStack
              p="1.5rem"
              gap={{ base: "1rem", md: "2rem" }}
              py="2rem">
              {children}
              {/* <HStack
                w='100%'
                py='0.3rem'
                rounded='10px'
                // bg='#8080803b'
                justifyContent='space-between'
              >
                <Image
                  src={reviewImage}
                  w={{ base: '5rem', sm: '8rem' }}
                  h='auto'
                />
                <Image
                  src={supportImage}
                  w={{ base: '5rem', sm: '8rem' }}
                  h='auto'
                />
              </HStack> */}
            </VStack>
            <Hide below="md">
              <Image
                src={registerBanner.src}
                alt="Register Now"
                objectFit="cover"
                objectPosition="center"
                filter="brightness(0.7)"
                w="100%"
                h="100%"
                borderRadius="0 15px 15px 0"
              />
            </Hide>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
