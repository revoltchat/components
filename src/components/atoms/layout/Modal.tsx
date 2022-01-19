import styled, { css, keyframes } from "styled-components";

import { createPortal } from "react-dom";

const open = keyframes`
    0% {opacity: 0;}
    70% {opacity: 0;}
    100% {opacity: 1;}
`;

const close = keyframes`
    0% {opacity: 1;}
    70% {opacity: 0;}
    100% {opacity: 0;}
`;

const zoomIn = keyframes`
    0% {transform: scale(0.5);}
    98% {transform: scale(1.01);}
    100% {transform: scale(1);}
`;

const zoomOut = keyframes`
    0% {transform: scale(1);}
    100% {transform: scale(0.5);}
`;

const Base = styled.div<{ closing?: boolean }>`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    z-index: 9999;
    position: fixed;

    max-height: 100%;
    user-select: none;

    animation-duration: 0.2s;
    animation-fill-mode: forwards;

    display: grid;
    overflow-y: auto;
    place-items: center;

    color: var(--foreground);
    background: rgba(0, 0, 0, 0.8);

    ${(props) =>
        props.closing
            ? css`
                  animation-name: ${close};

                  > div {
                      animation-name: ${zoomOut};
                  }
              `
            : css`
                  animation-name: ${open};
              `}
`;

const Container = styled.div`
    overflow: hidden;
    max-width: calc(100vw - 20px);
    border-radius: var(--border-radius);

    animation-name: ${zoomIn};
    animation-duration: 0.25s;
    animation-timing-function: cubic-bezier(0.3, 0.3, 0.18, 1.1);
`;

const Content = styled.div`
    //
`;

export function Modal() {
    return createPortal(
        <Base>
            <Container>content</Container>
        </Base>,
        document.body,
    );
}
