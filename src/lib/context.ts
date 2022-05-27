import React, { createContext, useContext } from "react";

const LinkComponentContext = createContext<React.FC<{ to: string }>>(null!);
const TextComponentContext = createContext<React.FC<{ id: string }>>(null!);
const TrigComponentContext = createContext<
    React.FC<
        | {
              id: "Menu";
              data?: { server?: string; channel?: string; unread?: boolean };
          }
        | { id: "Status" }
    >
>(null!);

export const LinkProvider = LinkComponentContext.Provider;
export const TextProvider = TextComponentContext.Provider;
export const TrigProvider = TrigComponentContext.Provider;

export const useLink = () => useContext(LinkComponentContext);
export const useText = () => useContext(TextComponentContext);
export const useTrigger = () => useContext(TrigComponentContext);
