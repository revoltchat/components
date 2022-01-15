import styled, { css } from "styled-components/macro";

export interface Props {
    readonly compact?: boolean;
    readonly palette?:
        | "primary"
        | "secondary"
        | "plain"
        | "accent"
        | "success"
        | "warning"
        | "error";
}

export const Button = styled.button<Props>`
    z-index: 1;

    display: flex;
    min-width: 96px;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;
    font-weight: 500;
    font-family: inherit;

    transition: 0.1s ease all;

    border: none;
    cursor: pointer;
    border-radius: var(--border-radius);

    &:disabled {
        cursor: not-allowed;
    }

    ${(props) =>
        props.compact
            ? css`
                  height: 32px !important;
                  padding: 2px 12px !important;
                  font-size: 13px;
              `
            : css`
                  height: 38px;
                  padding: 2px 16px;
                  font-size: 0.8125rem;
              `}

    ${(props) => {
        switch (props.palette) {
            case "primary":
                return css`
                    font-weight: 500;
                    color: var(--foreground);
                    background: var(--primary-background);

                    &:hover {
                        background: var(--secondary-header);
                    }

                    &:disabled {
                        background: var(--primary-background);
                    }

                    &:active {
                        background: var(--secondary-background);
                    }
                `;
            case "secondary":
                return css`
                    font-weight: 500;
                    color: var(--foreground);
                    background: var(--secondary-header);

                    &:hover {
                        background: var(--primary-header);
                    }

                    &:disabled {
                        background: var(--secondary-header);
                    }

                    &:active {
                        background: var(--secondary-background);
                    }
                `;
            case "plain":
                return css`
                    color: var(--foreground);
                    background: transparent;

                    &:hover {
                        text-decoration: underline;
                    }

                    &:disabled {
                        opacity: 0.5;
                    }

                    &:active {
                        color: var(--secondary-foreground);
                    }
                `;
            case "accent":
            case "success":
            case "warning":
            case "error":
                return css`
                    font-weight: 600;
                    color: var(--${props.palette}-contrast);
                    background: var(--${props.palette});

                    &:hover {
                        filter: brightness(1.2);
                    }

                    &:active {
                        filter: brightness(0.8);
                    }

                    &:disabled {
                        filter: brightness(0.7);
                    }
                `;
        }
    }}
`;
