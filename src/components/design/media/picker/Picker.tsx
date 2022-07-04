import React, { useMemo, useState } from "react";
import { Column, InputBox } from "../../atoms";
import { VirtuosoGrid } from "react-virtuoso";
import styled from "styled-components";

interface Props {
    emojis: string[];
    renderEmoji: React.FC<{ emoji: string }>;
}

const Base = styled(Column)`
    overflow: hidden;
    user-select: none;
    position: absolute;

    right: 10px;
    bottom: 10px;

    width: 330px;
    height: 420px;

    max-width: calc(100vw - 20px);
    max-height: calc(75vh);

    background: var(--background);
    border-radius: var(--border-radius);
`;

const Controls = styled(Column)`
    padding: 0.5em;
`;

const Parent = styled.div`
    flex-grow: 1;
`;

const ItemContainer = styled.div`
    display: grid;
    place-items: center;

    width: 40px;
    height: 40px;

    cursor: pointer;
    transition: 0.1s ease all;
    border-radius: var(--border-radius);

    &:hover {
        background: var(--tertiary-background);
    }

    &:active {
        filter: brightness(0.9);
    }

    img {
        width: 28px;
        height: 28px;
        object-fit: contain;
    }
`;

const ListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export function Picker({ emojis, renderEmoji: Emoji }: Props) {
    const [query, setQuery] = useState("");
    const filtered: string[] = useMemo(() => {
        const q = query.toLowerCase().trim();
        if (!q) return emojis;

        // Low efficiency search algorithm
        return emojis.filter((key) => key.includes(q));
    }, [query]);

    return (
        <Base>
            <Controls>
                <InputBox
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    placeholder="Type to search..."
                />
            </Controls>
            <Parent>
                <VirtuosoGrid
                    style={{
                        height: "100%",
                        padding: "2px",
                        overflowX: "hidden",
                    }}
                    totalCount={filtered.length}
                    components={{
                        Item: ItemContainer,
                        List: ListContainer,
                    }}
                    itemContent={(index) => <Emoji emoji={filtered[index]} />}
                />
            </Parent>
        </Base>
    );
}
