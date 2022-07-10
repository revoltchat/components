import React, { memo, useMemo, useState } from "react";
import { Avatar, Column, InputBox } from "../../atoms";
import { GroupedVirtuoso } from "react-virtuoso";
import styled from "styled-components";

/**
 * Category of emoji
 */
type Category = {
    id: string;
    name: string;
    emoji?: string;
    iconURL?: string;
};

interface Props {
    /**
     * All available emojis
     */
    emojis: Record<string | "default", string[]>;

    /**
     * Ordered list of categories
     */
    categories: Category[];

    /**
     * Emoji component
     */
    renderEmoji: React.FC<{ emoji: string }>;
}

/**
 * Base layout of the picker
 */
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

/**
 * Top search controls parent component
 */
const Controls = styled(Column)`
    padding: 0.5em;
`;

/**
 * Picker parent component
 */
const Parent = styled.div`
    flex-grow: 1;
`;

/**
 * Wrapper around individual emojis in the grid
 */
const EmojiContainer = styled.div`
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

/**
 * Wrapper around category rows
 */
const RowContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

/**
 * Custom component for category bar
 */
const CategoryBar = styled.div`
    display: flex;
    align-items: center;
    background: var(--background);
`;

/**
 * Custom component for category icon
 */
const CategoryIcon = styled.div`
    display: grid;
    place-items: center;

    width: 40px;
    height: 40px;

    user-select: none;
    pointer-events: none;
    filter: brightness(0.75);
`;

/**
 * Custom component for category name
 */
const CategoryName = styled.span`
    width: 100%;
    padding: 0 0.5em;
    text-align: left;
    color: var(--foreground);
    filter: brightness(0.75);
`;

/**
 * Generated information from query and given categories / emojis
 */
type Generated = {
    /**
     * Emoji items
     */
    items: string[][];

    /**
     * Emoji count for each category
     */
    categoryCounts: number[];

    /**
     * Currently visible categories
     */
    activeCategories: Category[];
};

/**
 * Hard-coded row size
 * ! FIXME: this will be calculated automatically later I guess
 */
const ROW_SIZE = 8;

/**
 * Emoji Picker (later media picker, will need to refactor slightly)
 */
export function Picker({ emojis, categories, renderEmoji: Emoji }: Props) {
    const [query, setQuery] = useState("");

    // Generate all the information required to render the grid
    const { items, categoryCounts, activeCategories }: Generated =
        useMemo(() => {
            // Prepare query
            const q = query.trim();

            // Prepare data structures
            const items: string[][] = [];
            const activeCategories: Category[] = [];
            const categoryCounts: number[] = [];

            // Iterate through all categories
            for (const cat of categories) {
                let append = emojis[cat.id] ?? [];

                // Check if we match search query
                if (q) {
                    // This may be quite slow
                    append = append.filter((emoji) => emoji.includes(q));

                    // Drop out if nothing found
                    if (append.length === 0) {
                        continue;
                    }
                }

                const sliceArray = (
                    array: string[],
                    size: number,
                ): string[][] => {
                    const result = [];
                    for (let i = 0; i < array.length; i += size) {
                        result.push(array.slice(i, i + size));
                    }
                    return result;
                };

                // Slice emoji collection into chunks of maximum length of ROW_SIZE
                const categoryEmojis = sliceArray(append, ROW_SIZE);

                // Append emojis to full list
                items.push(...categoryEmojis);

                // Append category to active list
                activeCategories.push(cat);

                // Append category length
                categoryCounts.push(categoryEmojis.length);
            }

            return {
                items,
                categoryCounts,
                activeCategories,
            };
        }, [query]);

    // Component for rendering each row of emojis
    const Row = useMemo(
        () =>
            memo(({ index }: { index: number }) => (
                <>
                    {items[index].map((emojiString) => (
                        <EmojiContainer>
                            <Emoji emoji={emojiString} />
                        </EmojiContainer>
                    ))}
                </>
            )),
        [items, Emoji],
    );

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
                <GroupedVirtuoso
                    style={{
                        height: "100%",
                        padding: "0 2px",
                        overflowX: "hidden",
                    }}
                    components={{
                        Item: RowContainer,
                    }}
                    groupCounts={categoryCounts}
                    groupContent={(groupIndex) => {
                        const category = activeCategories[groupIndex];

                        return (
                            <CategoryBar>
                                <CategoryIcon>
                                    {category.emoji ? (
                                        <EmojiContainer>
                                            <Emoji emoji={category.emoji} />
                                        </EmojiContainer>
                                    ) : (
                                        <Avatar
                                            size={32}
                                            fallback={category.name}
                                            src={category.iconURL}
                                        />
                                    )}
                                </CategoryIcon>
                                <CategoryName>{category.name}</CategoryName>
                            </CategoryBar>
                        );
                    }}
                    itemContent={(itemIndex) => <Row index={itemIndex} />}
                />
            </Parent>
        </Base>
    );
}
