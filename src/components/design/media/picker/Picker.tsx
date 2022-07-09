import React, { useMemo, useState } from "react";
import { Avatar, Column, InputBox } from "../../atoms";
import { VirtuosoGrid } from "react-virtuoso";
import styled, { css } from "styled-components";

/**
 * Category of emoji
 */
type Category = {
    id: string;
    name: string;
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
 * Wrapper around individual items in the grid
 */
const ItemContainer = styled.div<{ type: OverrideType["type"] }>`
    display: grid;
    place-items: center;

    width: ${(props) => (props.type === "name" ? "calc(100% - 40px)" : "40px")};
    height: 40px;

    ${(props) =>
        !props.type &&
        css`
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
        `}

    ${(props) =>
        props.type &&
        css`
            filter: brightness(0.75);
        `}
`;

/**
 * List component
 */
const ListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

/**
 * Custom component for category name
 */
const Name = styled.span`
    width: 100%;
    padding: 0 0.5em;
    text-align: left;
    color: var(--foreground);
`;

/**
 * Override entry
 */
type OverrideType =
    | { type: "empty" }
    | {
          type: "icon" | "name";
          cat: Category;
      };

/**
 * Generated information from query and given categories / emojis
 */
type Generated = {
    /**
     * Emoji items
     */
    items: string[];

    /**
     * Total item count
     */
    totalCount: number;

    /**
     * Index-specific overrides
     */
    overrides: Record<number, OverrideType>;

    /**
     * Calculate offset
     */
    calculateOffset: (index: number) => number;
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

    // Generate all the informaiton required to render the grid
    const { items, totalCount, overrides, calculateOffset }: Generated =
        useMemo(() => {
            // Prepare query
            const q = query.trim();

            // Prepare data structures
            const items: string[] = [];
            const overrides: Record<number, OverrideType> = {};
            const offsetIndices: [number, number][] = [];

            // Keep track of the offsets we've created
            let lastOffset = 0;
            let runningOffset = 0;

            // Iterate through all categories
            for (const cat of [
                ...categories,
                { id: "default", name: "Global" },
            ]) {
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

                // Create entries for the icon and name of category
                overrides[items.length + runningOffset++] = {
                    type: "icon",
                    cat,
                };

                overrides[items.length + runningOffset++] = {
                    type: "name",
                    cat,
                };

                // Push offset information to read correct emojis
                offsetIndices.push([
                    items.length + runningOffset,
                    runningOffset - lastOffset,
                ]);
                lastOffset = runningOffset;

                // Append emojis to full list
                items.push(...append);

                // Fill out the rest of the row with empty squares
                const remainder = ROW_SIZE - (append.length % ROW_SIZE);
                for (let i = 0; i < remainder; i++) {
                    overrides[items.length + runningOffset++] = {
                        type: "empty",
                    };
                }
            }

            /**
             * Calculate the offset from real array position given index
             * @param index Reading Index
             * @returns Offset into array
             */
            function calculateOffset(index: number) {
                let runningTotal = 0;

                // For each index, we need to add its offsets.
                for (const [i, v] of offsetIndices) {
                    if (i > index) break;
                    runningTotal += v;
                }

                return runningTotal;
            }

            // Calculate total number of grid entries
            const totalCount = items.length + Object.keys(overrides).length;

            return {
                items,
                totalCount,
                overrides,
                calculateOffset,
            };
        }, [query]);

    // Create a component to display overrides
    const Override: React.FC<OverrideType> = useMemo(
        () => (props: OverrideType) => {
            if (props.type === "empty") {
                // If empty, render nothing
                return null;
            } else if (props.type === "icon") {
                // Draw an emoji if default category
                if (props.cat.id === "default") {
                    return <Emoji emoji="smiley" />;
                }

                // Render the category icon, falling back to the name
                return (
                    <Avatar
                        size={32}
                        fallback={props.cat.name}
                        src={props.cat.iconURL}
                    />
                );
            } else {
                // Render category name
                return <Name>{props.cat.name}</Name>;
            }
        },
        [overrides],
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
                <VirtuosoGrid
                    style={{
                        height: "100%",
                        padding: "2px",
                        overflowX: "hidden",
                    }}
                    totalCount={totalCount}
                    overscan={200}
                    components={{
                        Item: ({ children, ...props }) => (
                            <ItemContainer
                                children={children}
                                type={overrides[props["data-index"]]?.type}
                            />
                        ),
                        List: ListContainer,
                    }}
                    itemContent={(index) => {
                        const override = overrides[index];
                        if (override) {
                            return <Override {...override} />;
                        } else {
                            return (
                                <Emoji
                                    emoji={
                                        items[index - calculateOffset(index)]
                                    }
                                />
                            );
                        }
                    }}
                />
            </Parent>
        </Base>
    );
}
