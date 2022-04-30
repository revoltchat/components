import React, { useState } from "react";
import styled from "styled-components";
import { Props as RoleListProps, RoleList } from "./RoleList";

const Base = styled.div`
    gap: 24px;
    padding: 8px;
    display: flex;

    > :nth-child(1) {
        width: 120px;
        flex-shrink: 0;
    }

    > :nth-child(2) {
        flex-grow: 1;
    }
`;

export type Props = Omit<
    RoleListProps,
    "server" | "showDefault" | "selected" | "onSelect"
> & {
    editor: React.FC<{ selected: string }>;
    server?: RoleListProps["server"];
    channel?: {
        server?: RoleListProps["server"];
    };
};

/**
 * Component to add a role list sidebar to a role editor
 */
export function PermissionsLayout({
    channel,
    server: givenServer,
    editor: Editor,
    ...listProps
}: Props) {
    const [selected, setSelected] = useState("default");

    const editor = <Editor selected={selected} />;
    const server = givenServer ?? channel?.server;

    return server ? (
        <Base>
            <RoleList
                showDefault
                server={server}
                selected={selected}
                onSelect={setSelected}
                {...listProps}
            />
            {editor}
        </Base>
    ) : (
        editor
    );
}
