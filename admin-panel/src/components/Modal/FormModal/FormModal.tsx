import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

export default function FormModal({
  children,
  isOpen,
  onClose,
  title,
}: {
  children: any;
  isOpen: boolean;
  onClose: any;
  title?: string;
}) {
  return (
    <Modal blockScrollOnMount isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent m='auto'>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
