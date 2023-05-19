import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useState, useEffect } from "react";

export interface Source {
  url: string;
  title: string;
}

export interface Message {
  agent: "human" | "ai";
  text: string;
  source?: Source[];
}

interface AppState {
  userId: string;
  question: string;
  history: Message[];
  setUserId: (userId: string) => void;
  setQuestion: (question: string) => void;
  setHistory: (history: Message[]) => void;
  addToHistory: (message: Message) => void;
}

const useAppState = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        userId: "anonymous",
        question: "",
        files: [],
        history: [],
        setUserId: (userId: string) => set({ userId }),
        setQuestion: (question: string) => set({ question }),
        setHistory: (history: Message[]) => set({ history }),
        addToHistory: (message: Message) =>
          set((state) => ({ history: [...state.history, message] })),
      }),
      { name: "bos-state" },
    ),
  ),
);

// fix for hydration issue
// https://dev.to/abdulsamad/how-to-use-zustands-persist-middleware-in-nextjs-4lb5
export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

export default useAppState;
