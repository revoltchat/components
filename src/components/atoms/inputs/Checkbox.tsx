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

    input {
        display: none;
    }

    &:hover {
        .check {
            visibility: visible;
            opacity: 1;
        }
    }

    &[disabled] {
        opacity: 0.8;
        cursor: not-allowed;
    }

    //TODO: When value is checked, allow me to add .hover { .checkmark { border-color:  var(--tertiary-foreground);} }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 3px;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--foreground);

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
`;

const Description = styled.div`
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--secondary-foreground);

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
`;

const Checkmark = styled.div<Pick<Props, "value">>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border: 2px solid var(--tertiary-foreground);
    border-radius: var(--border-radius);
    background: var(--secondary-background);
    flex-shrink: 0;
    margin: 4px;
    transition: 0.1s ease-in-out all;

    .check {
        /*transition: visibility 0.1s ease-in-out, opacity 0.1s ease-in-out,
            color 0.1s ease-in-out;*/
        transition: 0.1s ease-in-out all;
        color: var(--tertiary-foreground);
        visibility: hidden;
        opacity: 0;
    }

    ${(props) =>
        props.value &&
        css`
            border-color: var(--accent);
            background: var(--accent);

            .check {
                visibility: visible;
                opacity: 1;
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
            <Checkmark value={value} className="checkmark">
                <Check size={20} className="check" />
            </Checkmark>
        </Base>
    );
}
