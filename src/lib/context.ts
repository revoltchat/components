import React, { createContext, useContext } from "react";

const LinkComponentContext = createContext<React.FC<{ to: string }>>(null!);
const TextComponentContext = createContext<React.FC<{ id: string }>>(null!);

export const LinkProvider = LinkComponentContext.Provider;
export const TextProvider = TextComponentContext.Provider;

export const useLink = () => useContext(LinkComponentContext);
export const useText = () => useContext(TextComponentContext);
