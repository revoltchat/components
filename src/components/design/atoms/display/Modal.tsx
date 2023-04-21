import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";

import {
    animationFadeIn,
    animationFadeOut,
    animationZoomIn,
    animationZoomOut,
} from "../../../common/animations";

import { H2 } from "../heading/H2";
import { H4 } from "../heading/H4";
import { Button, Props as ButtonProps } from "../inputs/Button";

export type Action = Omit<React.HTMLAttributes<HTMLButtonElement>, "as"> &
    Omit<ButtonProps, "onClick"> & {
        confirmation?: boolean;
        onClick: () => void | boolean | Promise<boolean>;
    };

export interface Props {
    padding?: string;
    maxWidth?: string;
    maxHeight?: string;

    disabled?: boolean;
    transparent?: boolean;
    nonDismissable?: boolean;

    actions?: Action[];
    onClose?: (force: boolean) => void;

    signal?: "close" | "confirm" | "force";
    registerOnClose?: (fn: () => void) => () => void;
    registerOnConfirm?: (fn: () => void) => () => void;

    title?: React.ReactNode;
    description?: React.ReactNode;
    children?: React.ReactNode;
}

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
                  animation-name: ${animationFadeOut};

                  > div {
                      animation-name: ${animationZoomOut};
                  }
              `
            : css`
                  animation-name: ${animationFadeIn};
              `}
`;

const Container = styled.div<
    Pick<Props, "transparent" | "maxWidth" | "maxHeight"> & { actions: boolean }
>`
    min-height: 200px;
    max-width: min(calc(100vw - 20px), ${(props) => props.maxWidth ?? "450px"});
    max-height: min(
        calc(100vh - 20px),
        ${(props) => props.maxHeight ?? "650px"}
    );

    margin: 20px;
    display: flex;
    flex-direction: column;

    animation-name: ${animationZoomIn};
    animation-duration: 0.25s;
    animation-timing-function: cubic-bezier(0.3, 0.3, 0.18, 1.1);

    ${(props) =>
        !props.maxWidth &&
        css`
            width: 100%;
        `}

    ${(props) =>
        !props.transparent &&
        css`
            overflow: hidden;
            background: var(--secondary-header);
            border-radius: var(--border-radius);
        `}
`;

const Title = styled.div`
    padding: 1rem;
    flex-shrink: 0;
    word-break: break-word;
    gap: 8px;
    display: flex;
    flex-direction: column;
`;

const Content = styled.div<Pick<Props, "transparent" | "padding">>`
    flex-grow: 1;
    padding-top: 0;
    padding: ${(props) => props.padding ?? "0 1rem 1rem"};

    overflow-y: auto;
    font-size: 0.9375rem;

    display: flex;
    flex-direction: column;

    ${(props) =>
        !props.transparent &&
        css`
            background: var(--secondary-header);
        `}
`;

const Actions = styled.div`
    flex-shrink: 0;

    gap: 8px;
    display: flex;
    padding: 1rem;
    flex-direction: row-reverse;

    background: var(--secondary-background);
    border-radius: 0 0 var(--border-radius) var(--border-radius);
`;

export const Modal: (props: Props) => JSX.Element = ({
    children,
    actions,
    disabled,
    onClose,
    title,
    description,
    nonDismissable,
    registerOnClose,
    registerOnConfirm,
    signal,
    ...props
}: Props) => {
    const [closing, setClosing] = useState(false);

    const closeModal = useCallback(() => {
        setClosing(true);
        if (!closing) setTimeout(() => onClose?.(true), 2e2);
    }, [closing, props]);

    const confirm = useCallback(async () => {
        if (await actions?.find((x) => x.confirmation)?.onClick?.()) {
            closeModal();
        }
    }, [actions]);

    useEffect(() => registerOnClose?.(closeModal), [closeModal]);
    useEffect(() => registerOnConfirm?.(confirm), [confirm]);

    useEffect(() => {
        if (signal === "confirm") {
            confirm();
        } else if (signal) {
            if (signal === "close" && nonDismissable) {
                return;
            }

            closeModal();
        }
    }, [signal]);

    return createPortal(
        <Base closing={closing} onClick={() => !nonDismissable && closeModal()}>
            <Container
                {...props}
                actions={actions ? actions.length > 0 : false}
                onClick={(e) => e.stopPropagation()}>
                {(title || description) && (
                    <Title>
                        {title && <H2>{title}</H2>}
                        {description && <H4>{description}</H4>}
                    </Title>
                )}
                <Content {...props}>{children}</Content>
                {actions && actions.length > 0 && (
                    <Actions>
                        {actions.map((x, index) => (
                            // @ts-expect-error cope
                            <Button
                                disabled={disabled}
                                key={index}
                                {...x}
                                onClick={async () => {
                                    if (await x.onClick()) {
                                        closeModal();
                                    }
                                }}
                            />
                        ))}
                    </Actions>
                )}
            </Container>
        </Base>,
        document.body,
    );
};
