import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  Box,
  Image,
  Spinner,
  Center,
} from "@chakra-ui/react";
const ImageComponent = ({ src, title, index }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Box p="3" overflow="hidden" onClick={onOpen} shadow="md" m="2">
        <Image
          fallback={
            <Center minH="sm">
              <Spinner />
            </Center>
          }
          objectFit="cover"
          src={src}
          key={index}
          width="full"
          rounded="sm"
          shadow="dark-lg"
        />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box p="2" overflow="hidden">
              <Image src={src} key={index} rounded="sm" />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageComponent;
