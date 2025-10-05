import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';

export default function AlertDialogRemoval({
  title,
  body,
  isOpen,
  onClose,
  onProceed
}: {
  title: string;
  body: string;
  isOpen: boolean;
  onClose: any;
  onProceed: any
}) {
  const cancelRef = useRef(null);
  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogBody>{body}</AlertDialogBody>
          <AlertDialogFooter gap={2}>
            <Button colorScheme='red' onClick={onProceed}>Proceed</Button>
            <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
