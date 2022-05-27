import React from "react";
import { User } from "revolt.js";
import styled from "styled-components";
import { Tooltip, TooltipProps } from "./Tooltip";

const Base = styled.div`
    display: flex;
    flex-direction: column;

    .username {
        font-size: 13px;
        font-weight: 600;
    }

    .status {
        font-size: 11px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;

type Props = Omit<TooltipProps, "content"> & {
    /**
     * User to display
     */
    user: User;
};

/**
 * User tooltip component
 */
export function UserTooltip({ user, ...props }: Props) {
    return (
        <Tooltip
            {...props}
            content={
                <Base>
                    <span className="username">{user.username}</span>
                    <span className="status">{user.status?.presence}</span>
                </Base>
            }
        />
    );
}
