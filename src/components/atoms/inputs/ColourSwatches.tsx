import { Check } from "@styled-icons/boxicons-regular";
import { Palette } from "@styled-icons/boxicons-solid";
import { useRef } from "react";
import styled, { css } from "styled-components/macro";
import { useDebounceCallback } from "../../../lib/debounce";

interface Props {
    readonly presets?: string[][];

    readonly value: string;
    readonly onChange: (value: string) => void;
}

const DEFAULT_PRESETS = [
    [
        "#7B68EE",
        "#3498DB",
        "#1ABC9C",
        "#F1C40F",
        "#FF7F50",
        "#FD6671",
        "#E91E63",
        "#D468EE",
    ],
    [
        "#594CAD",
        "#206694",
        "#11806A",
        "#C27C0E",
        "#CD5B45",
        "#FF424F",
        "#AD1457",
        "#954AA8",
    ],
];

const Base = styled.div`
    display: flex;

    input {
        width: 0;
        height: 0;
        top: 72px;
        opacity: 0;
        padding: 0;
        border: 0;
        position: relative;
        pointer-events: none;
    }

    .overlay {
        position: relative;
        width: 0;

        div {
            width: 8px;
            height: 68px;
            background: linear-gradient(
                to right,
                var(--primary-background),
                transparent
            );
        }
    }
`;

const Swatch = styled.div<{ type: "small" | "large"; colour: string }>`
    flex-shrink: 0;
    cursor: pointer;
    border-radius: var(--border-radius);
    background-color: ${(props) => props.colour};

    display: grid;
    place-items: center;

    &:hover {
        border: 3px solid var(--foreground);
        transition: border ease-in-out 0.07s;
    }

    svg {
        color: white;
    }

    ${(props) =>
        props.type === "small"
            ? css`
                  width: 30px;
                  height: 30px;
              `
            : css`
                  width: 68px;
                  height: 68px;
              `}
`;

const Rows = styled.div`
    gap: 8px;
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding-bottom: 4px;

    > div {
        gap: 8px;
        display: flex;
        flex-direction: row;
        padding-inline-start: 8px;
    }
`;

export function ColourSwatches({ value, onChange, presets }: Props) {
    const ref = useRef<HTMLInputElement | null>(null!);
    const setValue = useDebounceCallback(
        (value) => onChange(value as string),
        [onChange],
        100,
    );

    return (
        <Base>
            <input
                ref={ref}
                type="color"
                value={value}
                onChange={(ev) => setValue(ev.currentTarget.value)}
            />
            <Swatch
                colour={value}
                type="large"
                onClick={() => ref.current?.click()}>
                <Palette size={32} />
            </Swatch>

            <div className="overlay">
                <div />
            </div>

            <Rows>
                {(presets ?? DEFAULT_PRESETS).map((row, i) => (
                    <div key={i}>
                        {row.map((swatch, i) => (
                            <Swatch
                                colour={swatch}
                                type="small"
                                key={i}
                                onClick={() => onChange(swatch)}>
                                {swatch === value && <Check size={22} />}
                            </Swatch>
                        ))}
                    </div>
                ))}
            </Rows>
        </Base>
    );
}
