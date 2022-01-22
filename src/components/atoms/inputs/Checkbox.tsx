import React, { HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { Check } from "@styled-icons/boxicons-regular";

const Base = styled.label`
    gap: 10px;
    display: flex;
    margin-top: 20px;
    align-items: center;
    cursor: pointer;
    user-select: none;
    transition: 0.2s ease all;

    input {
        display: none;
    }

    &:hover {
        div .check {
            visibility: visible;
        }
    }

    &[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 2px;
`;

const Title = styled.div`
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--foreground);
`;

const Description = styled.div`
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--secondary-foreground);
`;

const Checkmark = styled.div<Pick<Props, "value">>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border: 2px solid var(--secondary-header);
    border-radius: var(--border-radius);
    background: var(--secondary-background);
    flex-shrink: 0;
    margin: 4px;
    transition: 0.2s ease all;

    .check {
        color: var(--secondary-header);
        visibility: hidden;
    }

    ${(props) =>
        props.value &&
        css`
            border: 2px solid var(--accent);
            background: var(--accent);

            .check {
                visibility: visible;
                color: var(--accent-contrast);
            }
        `}
`;

export type Props = {
    readonly disabled?: boolean;

    readonly title?: React.ReactNode;
    readonly description?: React.ReactNode;

    readonly value: boolean;
    readonly onChange: (state: boolean) => void;
} & Omit<HTMLAttributes<HTMLLabelElement>, "value" | "children" | "onChange">;

export function Checkbox({
    disabled,
    title,
    description,
    value,
    onChange,
    ...props
}: Props) {
    return (
        <Base {...props}>
            <Content>
                {title && <Title>{title}</Title>}
                {description && <Description>{description}</Description>}
            </Content>
            <input
                type="checkbox"
                checked={value}
                onChange={() => !disabled && onChange(!value)}
            />
            <Checkmark value={value}>
                <Check size={20} className="check" />
            </Checkmark>
        </Base>
    );
}
