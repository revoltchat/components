import React from "react";
import styled, { css } from "styled-components";
import { Circle } from "@styled-icons/boxicons-solid";

interface Props {
    title?: React.ReactNode;
    description?: React.ReactNode;
    disabled?: boolean;
    value?: boolean;
    onSelect?: () => void;
}

interface BaseProps {
    selected: boolean;
}

const Base = styled.label<BaseProps>`
    border: 2px solid var(--tertiary-foreground);
    padding: 10px;
    gap: 10px;
    display: flex;
    cursor: pointer;
    user-select: none;
    transition: 0.1s ease-in-out all;
    border-radius: var(--border-radius);

    input {
        display: none;
    }

    ${(props) =>
        props.selected &&
        css`
            color: var(--accent-contrast);
            cursor: default;
            background: var(--accent);
            border: 2px solid var(--accent);

            div {
                border-color: var(--accent-contrast);

                svg {
                    color: var(--accent-contrast);
                    visibility: visible;
                    opacity: 1;
                }
            }
        `}

    ${(props) =>
        !props.selected &&
        css`
            &:hover {
                background: var(--hover);

                svg {
                    visibility: visible;
                    opacity: 1;
                }
            }
        `}
`;

const RadioCircle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 2px solid var(--tertiary-foreground);
    border-radius: var(--border-radius-half);
    height: 20px;
    width: 20px;
    transition: inherit;

    svg {
        transition: inherit;
        color: var(--tertiary-foreground);
        flex-shrink: 0;
        visibility: hidden;
        opacity: 0;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    word-break: break-word;
    transition: inherit;
`;

const Title = styled.div<BaseProps>`
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--foreground);
    transition: inherit;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;

    ${(props) =>
        props.selected &&
        css`
            color: var(--accent-contrast);
        `}
`;

const Description = styled.div<BaseProps>`
    font-size: 0.6875rem;
    font-weight: 500;
    color: var(--secondary-foreground);
    transition: inherit;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;

    ${(props) =>
        props.selected &&
        css`
            color: var(--accent-contrast);
        `}
`;

export function Radio({
    title,
    description,
    value,
    onSelect,
    disabled,
}: Props) {
    const selected = value ?? false;
    return (
        <Base selected={selected}>
            <RadioCircle>
                <Circle size={12} />
            </RadioCircle>
            <input
                type="radio"
                checked={selected}
                onChange={(e) =>
                    e.currentTarget.value === "on" && !disabled && onSelect?.()
                }
            />
            <Content>
                {title && <Title selected={selected}>{title}</Title>}
                {description && (
                    <Description selected={selected}>{description}</Description>
                )}
            </Content>
        </Base>
    );
}
