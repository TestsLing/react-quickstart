/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from 'wagmi';

import Comments from '../../lib/pages/sample/Comments.json';
import { getTargetNetwork } from '~/utils/scaffold-eth/network';

export interface Comment {
  id: string;
  topic: string;
  message: string;
  creator_address: string;
  display_address: string;
  created_at: BigNumber;
}

export const useSampleContractRead = () => {
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [topics, setTopics] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // const contractRead = useContractRead({
  //   chainId: getTargetNetwork().id,
  //   abi: Comments.abi,
  //   address: '0x4cDbC68201b04EF334b866FA97fC3dCE51106057',
  //   functionName: 'getComments',
  //   args: ['cold'],
  // });

  const contractAllRead = useContractRead({
    chainId: getTargetNetwork().id,
    abi: Comments.abi,
    address: '0xD2DA63d5541022445a33aBe6fB33a3Ad1e777e11',
    functionName: 'getAllComments',
    args: [],
  });

  // const fetchData = () => {
  //   const { data } = contractRead;

  //   if (data && Array.isArray(data)) {
  //     const parsedComments: Comment[] = data.map((comment) => ({
  //       id: comment[0],
  //       topic: comment[1],
  //       creator_address: comment[2],
  //       message: comment[3],
  //       created_at: comment[4],
  //       display_address: `${comment[2]?.slice(0, 5)}...${comment[2]?.slice(
  //         -4
  //       )}`,
  //     }));
  //     setComments(parsedComments);
  //   }
  //   setIsLoading(false);
  // };
  function flattenAndRemoveDuplicatesById(array: any[][]): any[] {
    const flattenedArray = array.reduce((acc, row) => {
      acc.push(...row);
      return acc;
    }, []);
    return flattenedArray.reduce((acc, value) => {
      if (!acc.some((item: { id: any }) => item.id === value.id)) {
        acc.push(value);
      }
      return acc;
    }, []);
  }
  function getUniqueTopics(messages: Comment[]): any[] {
    const topicsSet = new Set<any>();
    for (const message of messages) {
      topicsSet.add(message.topic);
    }
    return Array.from(topicsSet).map((topic) => ({ topic }));
  }
  const { data } = contractAllRead;
  const fetchAllData = () => {
    if (data && Array.isArray(data)) {
      const parsedComments: Comment[] = flattenAndRemoveDuplicatesById(
        data
      ).map((comment: any) => ({
        id: comment[0],
        topic: comment[1],
        creator_address: comment[2],
        message: comment[3],
        created_at: comment[4],
        display_address: `${comment[2]?.slice(0, 5)}...${comment[2]?.slice(
          -4
        )}`,
      }));
      setAllComments(parsedComments);
      setTopics(getUniqueTopics(parsedComments));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { isLoading, allComments, topics };
};

export const useSampleContractWrite = (
  topic: string | undefined,
  message: string | undefined
) => {
  const { config } = usePrepareContractWrite({
    address: '0xD2DA63d5541022445a33aBe6fB33a3Ad1e777e11',
    abi: Comments.abi,
    functionName: 'addComment',
    args: [topic, message],
  });
  const { write, data, isLoading, isSuccess } = useContractWrite(config);

  return { write, data, isLoading, isSuccess };
};
