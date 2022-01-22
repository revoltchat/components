import { Check } from "@styled-icons/boxicons-regular";
import styled, { css } from "styled-components";

const Base = styled.label`
    gap: 4px;
    z-index: 1;
    display: flex;
    margin-top: 20px;
    align-items: center;
    border-radius: var(--border-radius);

    cursor: pointer;
    user-select: none;

    font-size: 18px;
    color: var(--foreground);

    transition: 0.2s ease all;

    input {
        display: none;
    }

    &:hover {
        .check {
            background: var(--background);
        }
    }

    &[disabled] {
        opacity: 0.5;
        cursor: not-allowed;

        &:hover {
            background: unset;
        }
    }
`;

const Content = styled.span`
    display: flex;
    flex-grow: 1;
    font-size: 14px;
    gap: 2px;
    font-weight: 600;
    flex-direction: column;
`;

const Description = styled.span`
    font-size: 0.75rem;
    font-weight: 400;
    color: var(--secondary-foreground);
`;

const Checkmark = styled.div<Pick<Props, "value" | "palette">>`
    width: 24px;
    height: 24px;

    flex-shrink: 0;

    margin: 4px;
    display: grid;
    place-items: center;

    transition: 0.2s ease all;
    border-radius: var(--border-radius);

    ${(props) =>
        props.value
            ? css`
                  background: var(--accent) !important;
                  // the background further up should be made less
                  // important or moved so !important is no longer
                  // necessary here.

                  svg {
                      color: var(--foreground);
                      // this should really be --accent-contrast.
                  }
              `
            : props.palette === "secondary"
            ? css`
                  background: var(--primary-background);

                  svg {
                      color: var(--primary-background);
                  }
              `
            : css`
                  background: var(--secondary-background);

                  svg {
                      color: var(--secondary-background);
                  }
              `}
`;

export interface Props {
    readonly disabled?: boolean;
    readonly palette?: "primary" | "secondary";

    readonly children: React.ReactChild;
    readonly description?: React.ReactChild;

    readonly value: boolean;
    readonly onChange: (state: boolean) => void;
}

export function Checkbox({
    disabled,
    palette,
    children,
    description,
    value,
    onChange,
}: Props) {
    return (
        <Base>
            <Content>
                <span>{children}</span>
                {description && <Description>{description}</Description>}
            </Content>
            <input
                type="checkbox"
                checked={value}
                onChange={() => !disabled && onChange(!value)}
            />
            <Checkmark value={value} palette={palette} className="check">
                <Check size={20} />
            </Checkmark>
        </Base>
    );
}
