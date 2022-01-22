import styled, { css } from "styled-components";

export interface Props {
    readonly palette: "primary" | "secondary";

    readonly topBorder?: boolean;
    readonly bottomBorder?: boolean;

    readonly withBackground?: boolean;
    readonly withTransparency?: boolean;
}

export const Header = styled.div<Props>`
    gap: 10px;
    flex: 0 auto;
    display: flex;
    flex-shrink: 0;
    padding: 0 16px;
    align-items: center;

    font-weight: 600;
    user-select: none;

    height: var(--header-height);

    color: var(--foreground);
    background-size: cover !important;
    background-position: center !important;

    svg {
        flex-shrink: 0;
    }

    ${(props) =>
        props.withTransparency
            ? css`
                  background-color: rgba(
                      var(--${props.palette}-header-rgb),
                      max(var(--min-opacity), 0.75)
                  );
                  backdrop-filter: blur(20px);

                  width: 100%;
                  z-index: 20;
                  position: absolute;
              `
            : css`
                  background-color: var(--${props.palette}-header);
              `}

    ${(props) =>
        props.withBackground &&
        css`
            align-items: flex-end;
            height: 120px !important;

            text-shadow: 0px 0px 1px black;
        `}

    ${(props) =>
        props.topBorder &&
        css`
            border-start-start-radius: 8px;
        `}

    ${(props) =>
        props.bottomBorder &&
        css`
            border-end-start-radius: 8px;
        `}
`;
