import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';

export default function ModalForms({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: any;
  children: React.ReactNode;
}) {
  return (
    <Modal isOpen={isOpen} blockScrollOnMount onClose={onClose} isCentered>
      <ModalOverlay backdropFilter='blur(8px)' />
      <ModalContent mx={4}>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
