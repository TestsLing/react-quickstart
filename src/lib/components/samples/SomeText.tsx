import { Grid, Heading, Text } from '@chakra-ui/react';

const SomeText = () => {
  return (
    <Grid textAlign="center">
      <Heading as="h1" size="lg">
        DeMessageBoard
      </Heading>

      <Text fontSize="xs">
        使用去中心化留言板，确保数据安全，在链上和朋友一起交流想法吧。
      </Text>
    </Grid>
  );
};

export default SomeText;
