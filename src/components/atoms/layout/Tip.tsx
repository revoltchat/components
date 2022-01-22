import React from "react";
import styled, { css } from "styled-components";
import { InfoCircle } from "@styled-icons/boxicons-solid";

interface Props {
    readonly palette?: "primary" | "success" | "warning" | "error";
    readonly children: React.ReactNode;
}

export const TipBase = styled.div<Omit<Props, "children">>`
    display: flex;
    gap: 10px;
    padding: 12px;
    font-size: 0.875rem;
    font-weight: 500;
    overflow: hidden;
    background: var(--primary-header);
    border-radius: var(--border-radius);
    user-select: none;

    a {
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }

    svg {
        flex-shrink: 0;
    }

    ${(props) =>
        props.palette && props.palette !== "primary"
            ? css`
                  background: var(--${props.palette});
                  color: var(--${props.palette}-contrast);
                  border: 2px solid rgba(var(--${props.palette}-rgb), 0.8);
              `
            : css`
                  color: var(--foreground);
                  border: 2px solid var(--secondary-header);
              `}
`;

export function Tip(props: Props) {
    const { children, ...innerProps } = props;
    return (
        <TipBase {...innerProps}>
            <InfoCircle size={20} />
            {children}
        </TipBase>
    );
}
