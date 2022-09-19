import React, { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";

import { API } from "revolt.js";
import styled from "styled-components";
import { Button, ButtonItem } from "../../../design";
import { Lock } from "@styled-icons/boxicons-solid";

const Base = styled.div`
    gap: 4px;
    display: flex;
    flex-direction: column;

    button {
        text-align: left;

        gap: 4px;
        display: flex;
        align-items: center;
        flex-direction: row;
    }
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
        roles: Exclude<API.Server["roles"], undefined> | null;
        orderedRoles: (API.Role & { id: string })[];
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
     * Rank of user looking at the list
     */
    rank?: number;
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
    ({
        server,
        showDefault,
        selected,
        rank,
        onSelect,
        onCreateRole,
    }: Props) => {
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
                    const role_rank = role.rank ?? 0;

                    return (
                        <ButtonItem
                            key={role.id}
                            selected={role.id === selected}
                            style={{ color: role.colour! }}
                            onClick={() => onSelect?.(role.id)}>
                            <Rank>{role_rank}</Rank>
                            {role.name}
                            {typeof rank === "number" && role_rank <= rank && (
                                <Lock size={16} />
                            )}
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
