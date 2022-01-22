import styled from "styled-components";

export const ComboBox = styled.select`
    min-height: 42px;
    width: 100%;
    padding: 8px 16px;

    font-size: 0.9375rem;
    font-family: inherit;
    font-weight: 500;

    color: var(--secondary-foreground);
    background: var(--secondary-background);

    border: none;
    border-radius: var(--border-radius);
    outline: none;
    cursor: pointer;

    transition: 0.1s ease-in-out all;

    &:focus-visible {
        box-shadow: 0 0 0 1.5pt var(--accent);
    }
`;
