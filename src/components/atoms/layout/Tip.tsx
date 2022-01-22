import { InfoCircle } from "@styled-icons/boxicons-regular";
import styled, { css } from "styled-components";

interface Props {
    readonly palette?: "primary" | "success" | "warning" | "error";
    readonly children: React.ReactNode;
}

export const TipBase = styled.div<Omit<Props, "children">>`
    display: flex;
    padding: 12px;
    overflow: hidden;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    background: var(--primary-header);
    border-radius: var(--border-radius);

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
        props.palette !== "primary"
            ? css`
                  background: var(--${props.palette});
                  color: var(--${props.palette}-contrast);
                  border: 2px solid rgba(var(--${props.palette}-rgb), 0.8);
              `
            : css`
                  border: 2px solid var(--secondary-header);
              `}
`;

export function Tip(props: Props) {
    const { children, ...innerProps } = props;
    return (
        <TipBase {...innerProps}>
            <InfoCircle size={20} />
            <span>{children}</span>
        </TipBase>
    );
}
