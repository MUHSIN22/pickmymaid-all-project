import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  Text,
  Textarea,
  UnorderedList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { errorMessageStyle, inputFontSize } from "../../styles";
import { AiOutlineEye, AiOutlineEyeInvisible } from "../../Icons/Icons";

export default function PrimaryInput({
  label,
  errorMessage,
  register,
  required,
  type = "text",
  isDisabled,
  placeholder,
  isList,
  handleSuggestionClick,
  bg,
  ...inputStyles
}: {
  label?: string;
  errorMessage: string | undefined;
  register: any;
  required?: boolean;
  type?: string;
  isDisabled?: boolean;
  placeholder?: string;
  handleSuggestionClick?: any;
  isList?: string[];
  bg?: string;
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isListActive, setListActive] = useState<boolean>(false);

  const handleSearchBoxAppearance = () => {
    document.addEventListener("click", (event) => {
      if (
        !(event?.target as any)?.className?.includes("search-input") &&
        !(event?.target as any)?.className?.includes("list-item")
      ) {
        setListActive(false);
      }
    });
  };

  useEffect(() => {
    handleSearchBoxAppearance();
  }, []);

  return (
    <FormControl
      isInvalid={errorMessage ? true : false}
      isRequired={required}
      zIndex={10}
    >
      {label && <FormLabel variant="primary">{label}</FormLabel>}
      {type === "textarea" ? (
        <Textarea
          isDisabled={isDisabled}
          placeholder={placeholder}
          sx={inputFontSize}
          {...register}
        />
      ) : (
        <InputGroup pos="relative">
          <Input
            type={type === "password" && showPassword ? "text" : type}
            isDisabled={isDisabled}
            placeholder={placeholder}
            className={isList ? "search-input" : ""}
            sx={inputFontSize}
            bg={bg}
            {...inputStyles}
            {...register}
            list={`form_${label}_list`}
            onFocus={() => setListActive(true)}
          />
          {isListActive && isList && isList?.length > 0 && (
            <UnorderedList
              pos="absolute"
              bottom={0}
              left={0}
              transform="translateY(calc(100% + 0.5rem))"
              bg="white"
              styleType="none"
              boxShadow="0px 0px 10px rgba(0,0,0,0.1)"
              m={0}
              minW="80%"
              overflow="hidden"
              borderRadius="8px"
              maxH="10rem"
              overflowY="scroll"
            >
              {isList?.map((item, index) => (
                <ListItem
                  className="list-item"
                  p="0.5rem"
                  py="0.3rem"
                  _hover={{
                    bg: "rgba(189, 224, 254, 0.3)",
                  }}
                  key={index}
                  cursor="pointer"
                  onClick={() => {
                    handleSuggestionClick(item);
                    setListActive(false);
                  }}
                >
                  <Text variant="description">{item}</Text>
                </ListItem>
              ))}
            </UnorderedList>
          )}
          {type === "password" && (
            <InputRightElement>
              <IconButton
                border="none"
                variant="outline"
                aria-label="password-btn"
                onClick={() => setShowPassword(!showPassword)}
                icon={
                  showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />
                }
              />
            </InputRightElement>
          )}
        </InputGroup>
      )}

      <FormErrorMessage sx={errorMessageStyle}>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
