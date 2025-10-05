import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { errorMessageStyle, inputFontSize } from '../../styles';

export default function PrimaryInput({
  label,
  errorMessage,
  register,
  required,
  type,
  isDisabled,
  placeholder,
}: {
  label: string;
  errorMessage: string | undefined;
  register: any;
  required?: boolean;
  type?: string;
  isDisabled?: boolean;
  placeholder?: string;
}) {
  return (
    <FormControl isInvalid={errorMessage ? true : false} isRequired={required}>
      <FormLabel variant='primary'>{label}</FormLabel>
      <Input
        type={type || 'text'}
        isDisabled={isDisabled}
        placeholder={placeholder}
        sx={inputFontSize}
        {...register}
      />
      <FormErrorMessage sx={errorMessageStyle}>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
