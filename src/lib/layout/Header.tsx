import { Box, Flex, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { HiClipboardList, HiFingerPrint, HiRss } from 'react-icons/hi';

import { RainbowKitCustomConnectButton } from '~/lib/layout/ConnectButton';

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Button isActive={isActive} onClick={() => router.push(href)}>
      {children}
    </Button>
  );
};

const navLinks = (
  <>
    <li>
      <NavLink href="/">Home</NavLink>
    </li>
    <li>
      <NavLink href="/sample">
        <HiClipboardList />
        留言板
      </NavLink>
    </li>
    <li>
      <NavLink href="/message">
        <HiFingerPrint />
        写留言
      </NavLink>
    </li>
  </>
);

const Header = () => {
  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" gap={4}>
        <Flex gap={4} alignItems="center">
          {navLinks}
          <HiRss fontSize="24px" />
        </Flex>
        <RainbowKitCustomConnectButton />
      </Flex>
    </Box>
  );
};

export default Header;
