import styled, { css } from "styled-components";

import { createPortal } from "react-dom";
import React, { useCallback, useEffect, useState } from "react";

import { Button, Props as ButtonProps } from "../inputs/Button";
import { H3 } from "../heading/H3";
import { H5 } from "../heading/H5";
import {
    animationFadeIn,
    animationFadeOut,
    animationZoomIn,
    animationZoomOut,
} from "../../lib/animations";

export type Action = Omit<React.HTMLAttributes<HTMLButtonElement>, "as"> &
    Omit<ButtonProps, "onClick"> & {
        confirmation?: boolean;
        onClick: () => void;
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

    gap: 4px;
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

export function Modal({
    children,
    actions,
    disabled,
    onClose,
    title,
    description,
    nonDismissable,
    registerOnClose,
    registerOnConfirm,
    ...props
}: Props) {
    const [closing, setClosing] = useState(false);

    const closeModal = useCallback(() => {
        setClosing(true);
        if (!closing) setTimeout(() => onClose?.(true), 2e2);
    }, [closing, props]);

    const confirm = useCallback(() => {
        actions?.find((x) => x.confirmation)?.onClick?.();
    }, [actions]);

    useEffect(() => {
        if (nonDismissable) return;
        return registerOnClose?.(closeModal);
    }, [closeModal]);

    useEffect(() => registerOnConfirm?.(confirm), [confirm]);

    return createPortal(
        <Base closing={closing} onClick={() => !nonDismissable && closeModal()}>
            <Container
                {...props}
                actions={actions ? actions.length > 0 : false}
                onClick={(e) => e.stopPropagation()}>
                {(title || description) && (
                    <Title>
                        {title && <H3>{title}</H3>}
                        {description && <H5>{description}</H5>}
                    </Title>
                )}
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
