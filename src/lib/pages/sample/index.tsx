// eslint-disable-next-line import/order
import {
  VStack,
  Center,
  Spinner,
  Grid,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tag,
  HStack,
} from '@chakra-ui/react';

// eslint-disable-next-line import/no-extraneous-dependencies
import * as dayjs from 'dayjs';
import type { BigNumber } from 'ethers';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'dayjs/locale/zh-cn';
import { useSampleContractRead } from '~/hooks/scaffold-eth/useSampleContract';

dayjs.locale('zh-cn');

export interface Comment {
  id: string;
  topic: string;
  message: string;
  creator_address: string;
  display_address: string;
  created_at: BigNumber;
}

const SampleUI = () => {
  const { allComments, isLoading } = useSampleContractRead();

  return (
    <VStack>
      {isLoading && (
        <Center p={8}>
          <Spinner />
        </Center>
      )}
      <Grid
        width="100%"
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        gap={4}
      >
        {allComments.map((comment: Comment) => (
          <GridItem key={comment.id}>
            <Card minW="250">
              <CardHeader>{comment.display_address}</CardHeader>
              <CardBody>{comment.message}</CardBody>
              <CardFooter width="100%">
                <HStack spacing="10">
                  <Tag>{comment.topic}</Tag>
                  <Tag>
                    {dayjs
                      .default(comment.created_at.toNumber() * 1000)
                      .format('YYYY-MM-DD')}
                  </Tag>
                </HStack>
              </CardFooter>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};

export default SampleUI;
