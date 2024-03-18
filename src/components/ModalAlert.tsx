import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

import { useRef, useState } from "react";

export function Alert({ isOpen, onClose, onClick, data }) {
  const [isLoading, setLoading] = useState(false);
  const cancelRef = useRef();

  const handleOnClick = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);

    onClose();
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent bgColor='blue.700' color={"white"}>
        <AlertDialogHeader>{data.title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{data.description}</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose} colorScheme="orange">
            {data.labelButtonCancel}
          </Button>
          {onClick && (
            <Button
              isLoading={isLoading}
              colorScheme={data.buttonConfirmColor ?? "red"}
              ml={3}
              onClick={handleOnClick}
            >
              {data.labelButtonConfirmation}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
