import {
  FormControl,
  FormErrorMessage,
  Input as InputChakra,
  InputGroup,
  InputLeftAddon,
  InputProps,
} from "@chakra-ui/react";
import { LegacyRef, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputBaseProps extends InputProps {
  label: string;
  name?: string;
  type?: string;
  error?: { message: string } | null | FieldError | undefined;
}

function InputBase(
  { label, name, type, error = null, ...rest }: InputBaseProps,
  ref: any | LegacyRef<HTMLInputElement> | undefined
) {
  return (
    <FormControl>
      <InputGroup size={{ base: "sm", md: "md" }}>
        <InputLeftAddon
          bgColor={"blue.700"}
          fontWeight={"bold"}
          color={"white"}
          minW={28}
          fontSize={{ base: "xs", md: "sm" }}
        >
          {label}
        </InputLeftAddon>

        <InputChakra
          name={name}
          ref={ref}
          type={type}
          color={"white"}
          bgColor={"blue.600"}
          {...rest}
        />
      </InputGroup>

      {!!error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
    </FormControl>
  );
}

export const Input = forwardRef(InputBase);
