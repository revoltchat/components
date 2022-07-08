import styled from "styled-components";

/**
 * Stack elements on top of each other.
 */
export const Stacked = styled.div`
    display: grid;

    > * {
        grid-area: 1 / 1;
    }
`;
