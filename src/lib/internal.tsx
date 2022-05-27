import React, { useEffect, useState } from "react";

import type { Client } from "revolt.js";
import { Masks } from "../../lib";
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
