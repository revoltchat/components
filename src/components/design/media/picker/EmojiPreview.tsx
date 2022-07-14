import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import { EmojiInfo } from "./Picker";

interface Props {
    /**
     * Active emoji information
     */
    active: {
        emoji: EmojiInfo | null;
    };

    /**
     * Emoji component
     */
    renderEmoji: React.FC<{ emoji: string }>;
}

const Base = styled.div`
    gap: 8px;
    padding: 8px;
    display: flex;
    align-items: center;
    flex-direction: row;

    color: var(--foreground);
    border-top: 3px solid var(--secondary-background);

    img {
        width: 48px;
        height: 48px;
        object-fit: contain;
    }
`;

export const EmojiPreview = observer(
    ({ active, renderEmoji: Emoji }: Props) => {
        if (!active.emoji) return null;

        return (
            <Base>
                <Emoji emoji={active.emoji.id} />
                <span>:{active.emoji.name ?? active.emoji.id}:</span>
            </Base>
        );
    },
);
