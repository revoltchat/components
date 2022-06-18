import styled, { css } from "styled-components";

interface Props {
    /**
     * Gap between child elements.
     */
    gap?: string;

    /**
     * The contents of this row be vertically centred.
     */
    centred?: boolean;

    /**
     * This row should grow to fit parent container.
     */
    grow?: boolean;
}

/**
 * Generic Flex Column
 */
export const Row = styled.div<Props>`
    display: flex;
    flex-direction: row;
    gap: ${(props) => props.gap ?? "8px"};

    ${(props) =>
        props.centred &&
        css`
            align-items: center;
        `}

    ${(props) =>
        props.grow &&
        css`
            flex-grow: 1;
        `}
`;
