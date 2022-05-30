import styled from "styled-components";

interface Props {
    gap?: string;
}

/**
 * Generic Flex Column
 */
export const Row = styled.div<Props>`
    display: flex;
    flex-direction: row;
    gap: ${(props) => props.gap ?? "8px"};
`;
