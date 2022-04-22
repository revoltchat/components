import styled from "styled-components";

export interface Props {
    selected?: boolean;
    height?: "compact" | "normal";
}

export const ButtonItem = styled.button<Props>`
    padding: 0 8px;
    cursor: pointer;
    user-select: none;
    height: ${(props) => (props.height === "compact" ? "32px" : "42px")};

    border: 0;
    border-radius: var(--border-radius);

    color: var(--foreground);
    transition: 0.1s ease-in-out background-color;
    background: ${(props) => (props.selected ? "var(--hover)" : "transparent")};

    &:hover {
        background: var(--hover);
    }
`;
