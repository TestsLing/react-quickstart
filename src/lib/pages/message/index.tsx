import {
  VStack,
  Textarea,
  Button,
  useToast,
  Flex,
  Tag,
  Input,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import {
  useSampleContractWrite,
  useSampleContractRead,
} from '~/hooks/scaffold-eth/useSampleContract';

const Message = () => {
  const [message, setMessage] = useState<string>();
  const [topic, setTopic] = useState<string>();
  const { write, isSuccess } = useSampleContractWrite(topic, message);
  const { topics } = useSampleContractRead();

  const toast = useToast();
  const id = 'test-toast';

  useEffect(() => {
    if (isSuccess && !toast.isActive(id)) {
      const showError = (errorMessage: boolean) => {
        toast({
          id,
          title: 'Waiting...',
          description: errorMessage,
          status: 'info',
          duration: 10000,
          isClosable: true,
        });
      };
      showError(isSuccess);
    }
  }, [isSuccess, toast]);

  return (
    <VStack spacing={12}>
      <Flex justifyContent="start" gap={4} width="100%">
        {topics.map((item) => (
          <Tag key={item.topic} onClick={() => setTopic(item.topic)}>
            {item.topic}
          </Tag>
        ))}
        <Input
          htmlSize={10}
          width="auto"
          value={topic}
          placeholder="主题"
          onChange={(e) => setTopic(e.target.value)}
        />
      </Flex>
      <Textarea
        placeholder="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button disabled={!write} onClick={() => write?.()}>
        Submit
      </Button>
    </VStack>
  );
};

export default Message;
