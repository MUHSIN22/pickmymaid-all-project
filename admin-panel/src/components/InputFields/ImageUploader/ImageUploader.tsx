import {
  AspectRatio,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useController } from 'react-hook-form';
import { errorMessageStyle } from '../../styles';

export default function ImageUploader({
  name,
  control,
  rules,
  label,
  maxW = '10rem',
  required,
}: {
  name: string;
  control: any;
  rules: any;
  label: string;
  ratio?: string;
  maxW: string;
  required?: boolean;
}) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);

  const handleClickUpload = (event: any) => {
    const thumbnail = event?.target?.files[0];
    onChange(thumbnail);
    setPreview(URL.createObjectURL(thumbnail));
  };

  useEffect(() => {
    if ((value && typeof value === 'string') || !value) {
      setPreview(value);
    }
  }, [value]);

  return (
    <VStack w='max-content'>
      <FormControl isInvalid={error ? true : false} isRequired={required}>
        <FormLabel variant='primary'>{label}</FormLabel>
        <AspectRatio ratio={16 / 9} w={maxW}>
          {preview ? (
            <Image src={preview} objectFit='cover' objectPosition='center' />
          ) : (
            <Box w='100%' h='100%' bg='soft.gray'></Box>
          )}
        </AspectRatio>
        <FormErrorMessage sx={errorMessageStyle}>
          {error?.message}
        </FormErrorMessage>
      </FormControl>
      <Input
        type='file'
        onChange={handleClickUpload}
        name={name}
        ref={inputRef}
        h='0'
        w='0'
        accept='image/*'
        opacity='0'
      />

      <Button size='sm' onClick={() => inputRef?.current?.click()}>
        Choose Image
      </Button>
    </VStack>
  );
}
