import styled, { css } from "styled-components";

export interface Props {
    readonly palette?: "primary" | "accent";
    readonly compact?: boolean;
}

export const LineDivider = styled.div<Props>`
    display: flex;
    margin: ${(props) => (props.compact ? "6px" : "18px")} auto;
    user-select: none;
    align-items: center;

    height: 1px;
    width: calc(100% - 10px);

    ${(props) =>
        props.palette === "accent"
            ? css`
                  background: var(--accent);
              `
            : css`
                  background: var(--secondary-header);
              `}
`;
