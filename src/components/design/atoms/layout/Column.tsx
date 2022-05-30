import styled, { css } from "styled-components";

interface Props {
    /**
     * Gap between child elements.
     */
    gap?: string;

    /**
     * This column is a group of elements and should be visually distinct.
     */
    group?: boolean | string;
}

/**
 * Generic Flex Column
 */
export const Column = styled.div<Props>`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.gap ?? "8px"};

    ${(props) =>
        props.group &&
        css`
            margin: ${typeof props.group === "string" ? props.group : "16px"} 0;
        `}
`;
