import styled, { css, keyframes } from "styled-components";

import { createPortal } from "react-dom";

import { Button, Props as ButtonProps } from "../inputs/Button";
import { useCallback, useEffect, useState } from "react";

export type Action = Omit<ButtonProps, "onClick"> & {
    confirmation?: boolean;
    onClick: () => void;
};

export interface Props {
    padding?: string;

    disabled?: boolean;
    transparent?: boolean;
    nonDismissable?: boolean;

    actions?: Action[];
    onClose?: () => void;

    registerOnClose?: (fn: () => void) => () => void;
    registerOnConfirm?: (fn: () => void, close: () => void) => () => void;

    children?: React.ReactChild;
}

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

const Container = styled.div<Pick<Props, "transparent"> & { actions: boolean }>`
    max-width: 450px;
    width: 100%;
    animation-name: ${zoomIn};
    animation-duration: 0.25s;
    animation-timing-function: cubic-bezier(0.3, 0.3, 0.18, 1.1);

    ${(props) =>
        !props.transparent &&
        css`
            border-radius: ${props.actions
                ? "var(--border-radius) var(--border-radius) 0 0"
                : "var(--border-radius)"};

            overflow: hidden;
        `}
`;

const Content = styled.div<Pick<Props, "transparent" | "padding">>`
    padding: ${(props) => props.padding ?? "1rem"};
    min-height: 130px;

    ${(props) =>
        !props.transparent &&
        css`
            background: var(--secondary-header);
        `}
`;

const Actions = styled.div`
    gap: 8px;
    display: flex;
    padding: 1rem;
    flex-direction: row-reverse;

    background: var(--secondary-background);
    border-radius: 0 0 var(--border-radius) var(--border-radius);
`;

export function Modal({
    children,
    actions,
    disabled,
    onClose,
    nonDismissable,
    registerOnClose,
    registerOnConfirm,
    ...props
}: Props) {
    const [closing, setClosing] = useState(false);

    const closeModal = useCallback(() => {
        setClosing(true);
        setTimeout(() => onClose?.(), 2e2);
    }, [setClosing, props]);

    const confirm = useCallback(() => {
        actions?.find((x) => x.confirmation)?.onClick?.();
    }, [actions]);

    useEffect(() => registerOnClose?.(closeModal), [closeModal]);
    useEffect(
        () => registerOnConfirm?.(confirm, closeModal),
        [closeModal, confirm],
    );

    return createPortal(
        <Base closing={closing} onClick={() => !nonDismissable && closeModal()}>
            <Container
                {...props}
                actions={actions ? actions.length > 0 : false}
                onClick={(e) => e.stopPropagation()}>
                <Content {...props}>{children}</Content>
                {actions && actions.length > 0 && (
                    <Actions>
                        {actions.map((x, index) => (
                            <Button disabled={disabled} key={index} {...x} />
                        ))}
                    </Actions>
                )}
            </Container>
        </Base>,
        document.body,
    );
}
