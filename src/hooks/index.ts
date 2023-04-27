import { useEffect } from "react";
import useAppState, { useStore } from "~/state";

import { getId } from "~/utils";

export function useUserId() {
  const userId = useStore(useAppState, (state) => state.userId) as string;
  const setUserId = useAppState((state) => state.setUserId);
  return { userId, setUserId };
}

export function useSetUserId() {
  const { userId, setUserId } = useUserId();

  useEffect(() => {
    if (userId === "anonymous") {
      setUserId("user-" + getId());
    }
  }, [userId, setUserId]);
}

export function useQuestion() {
  const question = useStore(useAppState, (state) => state.question);
  const setQuestion = useAppState((state) => state.setQuestion);
  return { question, setQuestion };
}

export function useHistory() {
  const history = useStore(useAppState, (state) => state.history) || [];
  const setHistory = useAppState((state) => state.setHistory);
  const addToHistory = useAppState((state) => state.addToHistory);
  return { history, setHistory, addToHistory };
}
