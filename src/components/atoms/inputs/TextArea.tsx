import styled, { css } from "styled-components";

export interface TextAreaProps {
    code?: boolean;
    padding?: string;
    lineHeight?: string;
    hideBorder?: boolean;
}

export const TextArea = styled.textarea<TextAreaProps>`
    width: 100%;
    resize: none;
    display: block;
    font-size: 14px;
    color: var(--foreground);
    background: var(--secondary-background);

    padding: ${(props) => props.padding ?? "var(--textarea-padding)"};
    line-height: ${(props) =>
        props.lineHeight ?? "var(--textarea-line-height)"};

    ${(props) =>
        props.hideBorder &&
        css`
            border: none;
        `}

    ${(props) =>
        !props.hideBorder &&
        css`
            border-radius: var(--border-radius);
            transition: border-color 0.2s ease-in-out;
            border: var(--input-border-width) solid transparent;
        `}

    &:focus {
        outline: none;

        ${(props) =>
            !props.hideBorder &&
            css`
                border: var(--input-border-width) solid var(--accent);
            `}
    }

    ${(props) =>
        props.code
            ? css`
                  font-family: var(--monospace-font), monospace;
              `
            : css`
                  font-family: inherit;
              `}

    font-variant-ligatures: var(--ligatures);
`;

export const MarkdownTip = styled.div`
    display: flex;
    align-items: center;
    margin-top: 8px;
    gap: 4px;
    user-select: none;
    color: var(--foreground);

    svg {
        flex-shrink: 0;
    }

    a:hover {
        text-decoration: underline;
    }

    h5 {
        margin: 0;
    }
`;
