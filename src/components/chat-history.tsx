import { Flex, Group, Loader, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconRobot, IconUser } from "@tabler/icons-react";

import { useHistory } from "~/hooks";

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

export default ChatHistory;
