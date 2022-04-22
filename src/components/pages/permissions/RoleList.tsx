import React from "react";

import { Server } from "revolt-api";
import styled from "styled-components";
import { ButtonItem } from "../../design/navigation/ButtonItem";

const Base = styled.div`
    gap: 4px;
    display: flex;
    flex-direction: column;
`;

export interface Props {
    /**
     * Server to show role list for
     */
    server: {
        orderedRoles: NonNullable<Server["roles"]>;
    };
    /**
     * Whether to show the default role
     */
    showDefault?: boolean;
    /**
     * Currently selected role
     */
    selected?: string;
    /**
     * Select a new role
     */
    onSelect?: (value: string) => void;
}

/**
 * Component displaying a list of roles on a server
 */
export function RoleList({ server, showDefault, selected, onSelect }: Props) {
    const roles = server.orderedRoles;

    return (
        <Base>
            {Object.keys(roles).map((key) => {
                const role = server.orderedRoles[key];

                return (
                    <ButtonItem
                        key={key}
                        selected={key === selected}
                        style={{ color: role.colour! }}
                        onClick={() => onSelect?.(key)}>
                        {role.name}
                    </ButtonItem>
                );
            })}
            {showDefault && (
                <ButtonItem
                    selected={"default" === selected}
                    onClick={() => onSelect?.("default")}>
                    Default
                </ButtonItem>
            )}
        </Base>
    );
}
