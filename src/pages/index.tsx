import { ActionIcon, Button, Group, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Chat from "~/components/chat";
import { useUserId } from "~/hooks";

const Home: NextPage = () => {
  const { userId } = useUserId();
  return (
    <>
      <Head>
        <title>BOS Chat</title>
        <meta name="description" content="BOS Chat" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="">
        <div className="container flex h-screen">
          <div className="flex w-full max-w-[200px] flex-col bg-[#FBFBFB] p-4">
            <Text fw="bold" size="lg">
              BOS Chat
            </Text>
            <Text size="xs">DeFi AI assistant</Text>
            <Stack className="sticky bottom-0 mt-auto" spacing="xs">
              <Group>
                <ActionIcon
                  component={Link}
                  href="https://github.com/ciocan/boschat"
                  target="_blank"
                  variant="subtle"
                >
                  <ThemeIcon color="gray">
                    <IconBrandGithub size={18} />
                  </ThemeIcon>
                </ActionIcon>
                <Text color="dimmed" size="xs">
                  {userId}
                </Text>
              </Group>
            </Stack>
          </div>
          <div className="flex flex-1 flex-col">
            <Chat />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
