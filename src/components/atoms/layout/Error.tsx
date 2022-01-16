import styled from "styled-components/macro";

export const Base = styled.span`
    gap: 6px;
    display: flex;
    align-items: center;
    flex-direction: row;

    .error {
        color: var(--error);
    }
`;

export interface Props {
    error?: React.ReactChild;
    children?: React.ReactChild;
}

export function Error({ error, children }: Props) {
    return (
        <Base>
            {children}
            <span className="error">
                {children && error && <> &middot; </>}
                {error}
            </span>
        </Base>
    );
}
