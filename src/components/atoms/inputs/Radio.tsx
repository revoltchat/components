import { Circle } from "@styled-icons/boxicons-regular";
import styled, { css } from "styled-components";

interface Props {
    children: React.ReactChild;
    description?: React.ReactChild;

    value?: boolean;
    onSelect?: () => void;

    disabled?: boolean;
}

interface BaseProps {
    selected: boolean;
}

const Base = styled.label<BaseProps>`
    // ! FIXME: clean up CSS
    gap: 4px;
    z-index: 1;
    padding: 4px;
    display: flex;
    cursor: pointer;
    align-items: center;

    font-size: 1rem;
    font-weight: 600;
    user-select: none;
    transition: 0.2s ease all;
    border-radius: var(--border-radius);

    color: var(--secondary-foreground);

    &:hover {
        background: var(--hover);
    }

    > input {
        display: none;
    }

    > div {
        margin: 4px;
        width: 24px;
        height: 24px;
        display: grid;
        place-items: center;
        background: var(--foreground);
        border-radius: var(--border-radius-half);

        svg {
            color: var(--foreground);
            /*stroke-width: 2;*/
        }
    }

    ${(props) =>
        props.selected &&
        css`
            color: white;
            cursor: default;
            background: var(--accent);

            > div {
                background: white;
            }

            > div svg {
                color: var(--accent);
            }

            &:hover {
                background: var(--accent);
            }
        `}
`;

const Description = styled.div<BaseProps>`
    font-size: 0.8em;
    font-weight: 400;
    color: var(--secondary-foreground);

    ${(props) =>
        props.selected &&
        css`
            color: white;
        `}
`;

export function Radio({
    children,
    description,
    value,
    onSelect,
    disabled,
}: Props) {
    const selected = value ?? false;
    return (
        <Base selected={selected}>
            <div>
                <Circle size={12} />
            </div>
            <input
                type="radio"
                checked={selected}
                onChange={(e) =>
                    e.currentTarget.value === "on" && !disabled && onSelect?.()
                }
            />
            <span>
                <span>{children}</span>
                {description && (
                    <Description selected={selected}>{description}</Description>
                )}
            </span>
        </Base>
    );
}
