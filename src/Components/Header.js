import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Stack,
  Text,
  useBoolean,
  useOutsideClick,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const Header = ({ handleSearch, handleSubmit }) => {
  const inputRef = useRef(null);
  const [toggle, setToggle] = useBoolean(false);
  const [query, setQuery] = useState("");
  const [list, setList] = useState([]);
  useOutsideClick({
    ref: inputRef,
    handler() {
      setToggle.off();
    },
  });
  const handleChange = (e) => {
    e.preventDefault();
    setToggle.off();
    handleSearch(e.target.value);
    setQuery(e.target.value);
  };
  const handleSubmits = (e) => {
    e.preventDefault();
    setToggle.off();
    if (localStorage.getItem("queries") == null) {
      localStorage.setItem("queries", JSON.stringify([e.target[0].value]));
      setList([e.target[0].value]);
    } else {
      var storedQueries = [...JSON.parse(localStorage.getItem("queries"))];
      storedQueries.push(e.target[0].value);
      storedQueries = [...new Set([...storedQueries])];
      localStorage.setItem("queries", JSON.stringify(storedQueries));
      setList(storedQueries);
    }
    handleSubmit(e.target[0].value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleSearch(e.target.innerText);
    setToggle.off();
  };

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem("queries"));
    if (value) {
      setList(value);
    }
  }, []);

  return (
    <Flex
      bg="red.100"
      py="10"
      justifyContent="center"
      alignItems="center"
      position="sticky"
      w="100%"
      flexDirection="column"
      className="font"
      top="0"
      zIndex="sticky"
    >
      <Text fontSize="4xl" py="3" fontWeight="semibold">
        Welcome
      </Text>
      <Text fontSize="2xl" py="4">
        Come On Search Something
      </Text>
      <Flex as="form" onSubmit={handleSubmits} position="relative">
        <Input
          onChange={handleChange}
          value={query}
          onClick={(e) => e.preventDefault() || setToggle.on()}
          mx="2"
        />

        <Button type="submit">Search</Button>
        {toggle && (
          <Box
            ref={inputRef}
            bg="white"
            shadow="base"
            position="absolute"
            w="72"
            top="10"
            my="2"
            alignItems="end"
            rounded="xl"
          >
            {list.length > 0 && (
              <Box overflowY="auto" height="60">
                {list?.map((item, index) => (
                  <Box
                    p="2"
                    m="2"
                    rounded="md"
                    bg="blue.100"
                    onClick={handleClick}
                    key={index}
                    cursor="pointer"
                  >
                    {item}
                  </Box>
                ))}
              </Box>
            )}
            {list.length > 0 && (
              <Button
                float="right"
                colorScheme="red"
                onClick={() =>
                  setList([]) ||
                  localStorage.removeItem("queries") ||
                  setToggle.off()
                }
              >
                Clear All
              </Button>
            )}
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
