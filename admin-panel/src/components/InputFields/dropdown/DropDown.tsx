import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { errorMessageStyle } from '../../styles';

export default function DropDown({
  label,
  errorMessage,
  register,
  required,
  values,
  defaultValue,
}: {
  label: string;
  errorMessage: string | undefined;
  register: any;
  required: boolean;
  values?: any;
  defaultValue?: string;
}) {
  return (
    <FormControl isInvalid={errorMessage ? true : false} isRequired={required}>
      <FormLabel variant='primary'>{label}</FormLabel>
      <Select {...register}>
        <option selected disabled value=''>
          {defaultValue}
        </option>
        {values?.map((item: any, i: number) => (
          <option key={i} value={item.key}>
            {item.value}
          </option>
        ))}
      </Select>
      <FormErrorMessage sx={errorMessageStyle}>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
