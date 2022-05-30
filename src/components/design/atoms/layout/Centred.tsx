import styled from "styled-components";

interface Props {
    padding?: string;
}

/**
 * Generic Centring Component
 */
export const Centred = styled.div<Props>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${(props) => props.padding ?? "0"};
`;
