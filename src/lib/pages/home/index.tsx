import { Flex } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import SomeText from '~/lib/components/samples/SomeText';

const Home = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      <NextSeo title="Home" />
      <SomeText />
    </Flex>
  );
};

export default Home;
