import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { Input } from "./Input";

interface address {
  id: number;
  street: string;
  number: string;
}

export function ModalAddress({ isOpen, onClose, data }: any) {

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
      <ModalOverlay />

      <ModalContent bgColor="blue.700" color={"white"}>
        <ModalHeader>Endereços</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={4}>
          <Stack spacing={4}>
            {data?.addresses?.map((address: address, index: number) => (
              <Input
                key={address.id}
                label={`Endereço ${++index}`}
                value={`${address.street} - Nº ${address.number}`}
                isDisabled
              />
            ))}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
