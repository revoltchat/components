import React, { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";

import { Role, Server } from "revolt-api";
import styled from "styled-components";
import { ButtonItem } from "../../design/navigation/ButtonItem";
import { Button } from "../../design";

const Base = styled.div`
    gap: 4px;
    display: flex;
    flex-direction: column;
`;

const Rank = styled.span`
    font-size: 0.8em;
    color: var(--tertiary-foreground);
`;

export interface Props {
    /**
     * Server to show role list for
     */
    server: {
        roles: Exclude<Server["roles"], undefined> | null;
        orderedRoles: (Role & { id: string })[];
    };
    /**
     * Whether to show the default role
     */
    showDefault?: boolean;
    /**
     * Currently selected role
     */
    selected: string;
    /**
     * Select a new role
     */
    onSelect: (value: string) => void;
    /**
     * Callback to create a new role
     */
    onCreateRole?: (callback: (role_id: string) => void) => void;
}

/**
 * Component displaying a list of roles on a server
 */
export const RoleList = observer(
    ({ server, showDefault, selected, onSelect, onCreateRole }: Props) => {
        // If a role gets deleted, unselect it immediately.
        useLayoutEffect(() => {
            if (!server.roles) return;
            if (selected !== "default" && !server.roles[selected]) {
                onSelect("default");
            }
        }, [server.roles, selected]);

        return (
            <Base>
                {server.orderedRoles.map((role) => {
                    return (
                        <ButtonItem
                            key={role.id}
                            selected={role.id === selected}
                            style={{ color: role.colour! }}
                            onClick={() => onSelect?.(role.id)}>
                            <Rank>{role.rank ?? 0}</Rank> {role.name}
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
                {onCreateRole && (
                    <Button
                        palette="plain-secondary"
                        onClick={() => onCreateRole(onSelect)}>
                        Create Role
                    </Button>
                )}
            </Base>
        );
    },
);
