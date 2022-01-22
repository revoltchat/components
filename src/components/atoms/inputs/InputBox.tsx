import styled, { css } from "styled-components";

export interface Props {
    readonly palette?: "primary" | "secondary";
}

export const InputBox = styled.input<Props>`
    font-size: 1rem;
    font-family: inherit;

    z-index: 1;
    border: none;
    padding: 8px 16px;
    outline: 2px solid transparent;
    border-radius: var(--border-radius);

    transition: 0.2s ease background-color;
    transition: box-shadow 0.2s ease-in-out;
    transition: outline-color 0.2s ease-in-out;

    &:focus {
        box-shadow: 0 0 0 1.5pt var(--accent);
    }

    ${(props) =>
        props.palette === "primary"
            ? css`
                  color: var(--foreground);
                  background: var(--primary-background);

                  &:hover {
                      background: var(--secondary-background);
                  }
              `
            : css`
                  color: var(--secondary-foreground);
                  background: var(--secondary-background);

                  &:hover {
                      background: var(--hover);
                  }
              `}
`;
