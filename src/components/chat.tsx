import { useRef } from "react";
import { ActionIcon, Button, TextInput } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { IconSend } from "@tabler/icons-react";

import ChatHistory from "./chat-history";
import { useHistory, useQuestion } from "~/hooks";
import { useChatApi } from "~/hooks/useChatApi";

function Chat() {
  const { question, setQuestion } = useQuestion();
  const { setHistory } = useHistory();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { chatApi, handleSend } = useChatApi({ scrollToBottom });

  return (
    <>
      <div className="flex-1 overflow-y-auto bg-white p-8">
        <ChatHistory isLoading={chatApi.isLoading} />
        <div ref={messagesEndRef} />
      </div>
      <div className="sticky bottom-0 p-8">
        <div className="flex justify-center">
          <Button variant="subtle" color="gray" onClick={() => setHistory([])}>
            Clear messages
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <TextInput
            type="text"
            className="flex-1"
            placeholder="Type your message..."
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            disabled={chatApi.isLoading}
            onKeyDown={getHotkeyHandler([["Enter", handleSend]])}
          />
          <ActionIcon
            variant="filled"
            title="send"
            onClick={handleSend}
            disabled={chatApi.isLoading}
          >
            <IconSend size={18} />
          </ActionIcon>
        </div>
      </div>
    </>
  );
}

export default Chat;
