import styled, { css } from "styled-components";

export interface Props {
    rotate?: string;
    shape?: "default" | "circle";
}

const normal = `var(--secondary-foreground)`;
const hover = `var(--foreground)`;
// TODO: add active modifier

export const IconButton = styled.a<Props>`
    width: fit-content;

    z-index: 1;
    display: grid;
    cursor: pointer;
    place-items: center;

    transition: 0.1s ease all;

    svg {
        transition: 0.2s ease transform;
    }

    fill: ${normal};
    color: ${normal};

    a {
        color: ${normal};
    }

    &:hover {
        fill: ${hover};
        color: ${hover};

        a {
            color: ${hover};
        }
    }

    ${(props) =>
        props.shape === "circle" &&
        css`
            padding: 4px;
            border-radius: var(--border-radius-half);
            background-color: var(--secondary-header);

            &:hover {
                background-color: var(--primary-header);
            }
        `}

    ${(props) =>
        props.rotate &&
        css`
            svg {
                transform: rotateZ(${props.rotate});
            }
        `}
`;
