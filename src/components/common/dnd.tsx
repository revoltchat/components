import React, { useCallback, useEffect, useState } from "react";
import { DraggableProvided, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";

export type DraggableProps<T> = {
    provided: DraggableProvided;
    item: T;
    isDragging: boolean;
};

/**
 * Base component for height preserving container
 */
const HeightPreservingContainer = styled.div`
    &:empty {
        min-height: calc(var(--child-height));
        box-sizing: border-box;
    }
`;

/**
 * Height Preserving Item
 *
 * https://codesandbox.io/s/react-virutoso-with-react-beautiful-dnd-e6vmq?file=/src/index.js:1734-2319
 */
export function useHeightPreservingItem() {
    return useCallback(
        ({
            children,
            ...props
        }: {
            children: React.ReactNode;
            "data-known-size": number;
        }) => {
            const [size, setSize] = useState(0);
            const knownSize = props["data-known-size"];

            useEffect(() => {
                setSize((prevSize) => {
                    return knownSize == 0 ? prevSize : knownSize;
                });
            }, [knownSize]);

            return (
                <HeightPreservingContainer
                    {...props}
                    style={
                        {
                            "--child-height": `${size}px`,
                        } as React.CSSProperties
                    }>
                    {children}
                </HeightPreservingContainer>
            );
        },
        [],
    );
}

/**
 * Short-hand for creating object with Item component
 * @returns Components
 */
export function useDndComponents() {
    return {
        Item: useHeightPreservingItem(),
    };
}

/**
 * Re-order a list
 *
 * https://codesandbox.io/s/react-virutoso-with-react-beautiful-dnd-e6vmq?file=/src/index.js:732-923
 *
 * @param list Input list
 * @param startIndex Start index
 * @param endIndex End index
 * @returns New list
 */
export function reorder(list: any[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

/**
 * Create a new drag end handler
 *
 * https://codesandbox.io/s/react-virutoso-with-react-beautiful-dnd-e6vmq?file=/src/index.js:1377-1733
 *
 * @param setItems Item setter
 * @returns Drag end handler
 */
export function useDragEndReorder(
    setItems: (v: (items: any[]) => any[]) => void,
) {
    return useCallback(
        (result: DropResult) => {
            if (!result.destination) {
                return;
            }
            if (result.source.index === result.destination.index) {
                return;
            }

            setItems((items) =>
                reorder(items, result.source.index, result.destination!.index),
            );
        },
        [setItems],
    );
}

/**
 * Modified version of above function to provide simple reordering interface
 *
 * @param reorder Reorder function
 * @returns Drag end handler
 */
export function useDragEndCustomReorder(
    reorder: (source: number, dest: number) => void,
) {
    return useCallback(
        (result: DropResult) => {
            if (!result.destination) {
                return;
            }
            if (result.source.index === result.destination.index) {
                return;
            }

            reorder(result.source.index, result.destination!.index);
        },
        [reorder],
    );
}
