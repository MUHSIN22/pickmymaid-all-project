import { Center } from '@chakra-ui/react';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';

export default function Login() {
  return (
    <Center w='100%' minH='100vh' bg='soft.gray'>
      <LoginForm />
    </Center>
  );
}
