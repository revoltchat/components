import React from "react";
import { Check, Square, X } from "@styled-icons/boxicons-regular";
import styled, { css } from "styled-components";

type State = "Allow" | "Neutral" | "Deny";

const SwitchContainer = styled.div.attrs({
    role: "radiogroup",
    "aria-orientiation": "horizontal",
})`
    flex-shrink: 0;
    width: fit-content;

    display: flex;
    margin: 4px 0;
    overflow: hidden;
    border-radius: var(--border-radius);
    background: var(--secondary-background);
    border: 1px solid var(--tertiary-background);

    ${(props) =>
        props["aria-disabled"] &&
        css`
            pointer-events: none;
            opacity: 0.6;
        `}
`;

const Switch = styled.div.attrs({
    role: "radio",
})<{ state: State; selected: boolean }>`
    padding: 4px;
    cursor: pointer;
    transition: 0.2s ease all;

    color: ${(props) =>
        props.state === "Allow"
            ? "var(--success)"
            : props.state === "Deny"
            ? "var(--error)"
            : "var(--tertiary-foreground)"};

    ${(props) =>
        props.selected &&
        css`
            color: white;

            background: ${props.state === "Allow"
                ? "var(--success)"
                : props.state === "Deny"
                ? "var(--error)"
                : "var(--primary-background)"};
        `}

    &:hover {
        filter: brightness(0.8);
    }
`;

export interface Props {
    state: State;
    disabled?: boolean;
    onChange: (state: State) => void;
}

export function OverrideSwitch({ state, disabled, onChange }: Props) {
    return (
        <SwitchContainer aria-disabled={disabled}>
            <Switch
                onClick={() => onChange("Deny")}
                state="Deny"
                selected={state === "Deny"}>
                <X size={24} />
            </Switch>
            <Switch
                onClick={() => onChange("Neutral")}
                state="Neutral"
                selected={state === "Neutral"}>
                <Square size={24} />
            </Switch>
            <Switch
                onClick={() => onChange("Allow")}
                state="Allow"
                selected={state === "Allow"}>
                <Check size={24} />
            </Switch>
        </SwitchContainer>
    );
}
