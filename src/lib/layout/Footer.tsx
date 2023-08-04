import { Flex, Spacer } from '@chakra-ui/react';

// import ThemeToggle from './ThemeToggle';

const Footer = () => {
  return (
    <Flex
      as="footer"
      width="full"
      justifyContent="space-between"
      alignItems="center"
    >
      <Spacer />
      <Spacer />
      {/* <ThemeToggle /> */}
    </Flex>
  );
};

export default Footer;
