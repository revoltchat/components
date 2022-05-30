import styled from "styled-components";

export interface Props {
    compact?: boolean;
}

export const Category = styled.div<Props>`
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--foreground);
    text-transform: uppercase;

    margin-top: 4px;
    margin-bottom: 4px;
    white-space: nowrap;
    padding: ${(props) => (props.compact ? "0 4px" : "6px 0 6px 8px")};

    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    &:first-child {
        margin-top: 0;
        padding-top: 0;
    }
`;
