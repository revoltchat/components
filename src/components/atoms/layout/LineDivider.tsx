import styled, { css } from "styled-components";

export interface Props {
    readonly palette: "primary" | "accent";
}

export const LineDivider = styled.div<Props>`
    display: flex;
    margin: 18px auto;
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
