import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { errorMessageStyle, inputFontSize } from '../../styles';

export default function PrimaryTextField({
  label,
  errorMessage,
  register,
  required,
  isDisabled,
  placeholder,
}: {
  label: string;
  errorMessage: string | undefined;
  register: any;
  required: boolean;
  type?: string;
  isDisabled?: boolean;
  placeholder?: string;
}) {
  return (
    <FormControl isInvalid={errorMessage ? true : false} isRequired={required}>
      <FormLabel variant='primary'>{label}</FormLabel>
      <Textarea
        isDisabled={isDisabled}
        placeholder={placeholder}
        sx={inputFontSize}
        {...register}
      />
      <FormErrorMessage sx={errorMessageStyle}>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
