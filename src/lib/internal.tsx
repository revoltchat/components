import React, { useEffect, useState } from "react";
import type { Client } from "revolt.js";

import { UIProvider } from "./context";

import { Masks } from "../components/common/Masks";

export const mockClient = () => (window as any).mock as Client;

export const InjectMockClient = ({
    children: Child,
}: {
    children: React.FC<{ client: Client }>;
}) => {
    const [exists, setExists] = useState(typeof mockClient() === "object");

    // Poll for client to exist.
    useEffect(() => {
        if (typeof mockClient() === "undefined") {
            const int = setInterval(() => {
                if (typeof mockClient() === "object") {
                    setExists(true);
                }
            }, 100);

            return () => clearInterval(int);
        }
    }, [exists]);

    if (!exists)
        return (
            <h1 style={{ color: "white" }}>
                Loading mock client from Revolt.js...
            </h1>
        );

    return <Child client={mockClient()} />;
};

export const MaskDecorator = (Story: React.FC) => (
    <>
        <Story />
        <Masks />
    </>
);

export const ContextDecorator = (Story: React.FC) => (
    <UIProvider
        value={{
            Link: ({ to, children }) => (
                <a onClick={() => alert(`Navigate to ${to}!`)}>{children}</a>
            ),
            Text: ({ id }) => <>{id}</>,
            Trigger: ({ children }) => (
                <div onContextMenu={() => alert("CTX MENU")}>{children}</div>
            ),
            emitAction: (action) => console.info(action),
        }}>
        <Story />
    </UIProvider>
);
