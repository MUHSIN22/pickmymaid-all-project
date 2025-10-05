import { Button } from '@chakra-ui/react';
import { RiAddFill } from 'react-icons/ri';

export default function AddButton({
  children,
  onClick,
}: {
  children: any;
  onClick: any;
}) {
  return (
    <Button variant='primary' onClick={onClick} leftIcon={<RiAddFill />}>
      {children}
    </Button>
  );
}
