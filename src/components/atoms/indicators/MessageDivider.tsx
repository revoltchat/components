import React from "react";
import styled, { css } from "styled-components";

const Base = styled.div<{ unread?: boolean }>`
    display: flex;
    align-items: center;
    height: 0;
    margin: 17px 12px 5px;
    border-top: thin solid var(--tertiary-foreground);
    user-select: none;

    time {
        margin-top: -2px;
        font-size: 0.6875rem;
        line-height: 0.6875rem;
        font-weight: 600;
        padding-inline: 5px 5px;

        // We set the background to mask the border.
        color: var(--tertiary-foreground);
        background: var(--primary-background);
    }

    ${(props) =>
        props.unread &&
        css`
            border-top: thin solid var(--accent);
        `}
`;

const Unread = styled.div`
    font-size: 0.625rem;
    font-weight: 600;
    background: var(--accent);
    color: var(--accent-contrast);

    padding: 2px 6px;
    margin-top: -1px;
    border-radius: 60px;
`;

interface Props {
    date?: string;
    unread?: boolean;
}

export function MessageDivider({ unread, date }: Props) {
    return (
        <Base unread={unread}>
            {unread && <Unread>NEW</Unread>}
            {date && <time>{date}</time>}
        </Base>
    );
}
