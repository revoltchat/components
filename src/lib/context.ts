import React, { createContext, Fragment, useContext } from "react";

export type ContextMenu =
    | {
          id: "Menu";
          data?: {
              server?: string;
              channel?: string;
              unread?: boolean;
          };
      }
    | { id: "Status" };

export type Action = {
    type: "WriteClipboard";
    text: string;
};

const UIContext = createContext<{
    Link: React.FC<{ to: string; replace?: boolean }>;
    Text: React.FC<{ id: string }>;
    Trigger: React.FC<ContextMenu>;
    emitAction: (action: Action) => void;
    // TODO: migrate to react router v6 and add `navigate`
}>({
    Link: Fragment,
    Text: Fragment,
    Trigger: Fragment,
    emitAction: () => {},
});

export const UIProvider = UIContext.Provider;

export const useLink = () => useContext(UIContext).Link;
export const useText = () => useContext(UIContext).Text;
export const useTrigger = () => useContext(UIContext).Trigger;
export const useEmitter = () => useContext(UIContext).emitAction;

export const useUI = () => useContext(UIContext);
