import { Check } from "@styled-icons/boxicons-regular";
import React, { HTMLAttributes } from "react";
import styled, { css } from "styled-components";

// import { VolumeFull } from "@styled-icons/boxicons-solid";

const Base = styled.label`
    gap: 10px;
    padding: 4px;
    display: flex;
    cursor: pointer;
    user-select: none;
    align-items: center;

    border-radius: var(--border-radius);
    transition: 0.1s ease background-color;

    input {
        display: none;
    }

    &:hover {
        background: var(--secondary-background);

        .playSound {
            visibility: visible;
            opacity: 1;
        }

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
    flex-direction: column;
    display: flex;
    flex-grow: 1;
    gap: 3px;
`;

const TitleContent = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--foreground);
`;

const Title = styled.div`
    font-size: 0.9375rem;
    font-weight: 600;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
`;

const TitleAction = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    visibility: hidden;
    opacity: 0;
    transition: 0.1s ease-in-out all;

    border-radius: var(--border-radius);

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    &:active {
        background-color: rgba(255, 255, 255, 0.15);
    }
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
    width: 24px;
    height: 24px;
    border: 2px solid var(--tertiary-foreground);
    border-radius: var(--border-radius);
    background: var(--secondary-background);
    flex-shrink: 0;
    margin: 4px;
    transition: 0.1s ease-in-out all;

    .check {
        transition: inherit;
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
} & Omit<
    HTMLAttributes<HTMLLabelElement>,
    "value" | "children" | "onChange" | "title"
>;

export function Checkbox({
    disabled,
    title,
    description,
    value,
    onChange,
    ...props
}: Props) {
    return (
        // @ts-expect-error cope
        <Base {...props}>
            <Content>
                {title && (
                    <TitleContent>
                        <Title>{title}</Title>
                        {/*<TitleAction className="playSound">
                            <VolumeFull size={16} />
                        </TitleAction>*/}
                    </TitleContent>
                )}
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
