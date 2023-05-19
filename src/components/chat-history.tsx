import { Accordion, Flex, Group, Loader, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconRobot, IconUser } from "@tabler/icons-react";
import Link from "next/link";

import { useHistory } from "~/hooks";
import { type Source } from "~/state";

function ChatHistory({ isLoading = false }: { isLoading?: boolean }) {
  const { history } = useHistory();

  return (
    <Stack>
      {history.map((item, index) => {
        const isAi = item.agent === "ai";
        return (
          <Flex key={index} className="bg-slate-50 p-4">
            <ThemeIcon color="gray" size={24} radius="xl" mr="sm">
              {isAi ? <IconRobot size={18} /> : <IconUser size={18} />}
            </ThemeIcon>
            <Text size="sm" className="">
              {item.text}
              {isAi && <Sources list={item.source} />}
            </Text>
          </Flex>
        );
      })}
      {isLoading && (
        <Group className="bg-slate-50 p-4" spacing={0}>
          <ThemeIcon color="gray" size={24} radius="xl" mr="sm">
            <IconRobot size={18} />
          </ThemeIcon>
          <Loader size="xs" variant="dots" color="gray" />
        </Group>
      )}
    </Stack>
  );
}

const Sources = ({ list }: { list?: Source[] }) => {
  console.log(list);
  return (
    <Accordion defaultValue="sources">
      <Accordion.Item value="souces">
        <Accordion.Control className="text-xs text-gray-400">Sources</Accordion.Control>
        <Accordion.Panel>
          <Stack spacing="xs">
            {list?.map((item, index) => (
              <Link key={index} href={item.url} target="_blank" className="no-underline">
                <Stack bg="white" p="xs" spacing={0}>
                  <Text size="xs" fw="bold" className="text-gray-400">
                    {item.title}
                  </Text>
                  <Text size="xs" className="text-gray-400">
                    {item.url}
                  </Text>
                </Stack>
              </Link>
            ))}
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default ChatHistory;
