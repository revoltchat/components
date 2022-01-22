import { Bolt } from "@styled-icons/boxicons-solid";
import styled from "styled-components";

export const Base = styled.div`
    gap: 2px;
    display: flex;
    padding: 1px 5px;
    position: relative;

    align-items: center;
    font-weight: 800;
    font-style: italic;
    font-size: 0.8125rem;
    text-transform: uppercase;

    background: var(--accent);
    color: var(--accent-foreground);

    border-radius: var(--border-radius);
    border-start-start-radius: 0 !important;

    &::before {
        content: "";
        position: absolute;

        top: 0;
        right: -4px;
        left: -4px;
        width: 2px;
        height: 4px;
        display: flex;

        border: 8px solid var(--accent);
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        border-bottom: 5px solid transparent;
    }
`;

export function Turbo() {
    return (
        <Base>
            <Bolt size={13} /> Turbo
        </Base>
    );
}
