import styled from "styled-components";

export const LineDivider = styled.div`
    display: flex;
    align-items: center;
    height: 1px;
    width: calc(100% - 10px);
    //FOR REGULAR LINE DIVIDER
    /*background: var(--secondary-header);*/
    //FOR REVOLT TURBO - make a prop where if turbo, enable turbo line divider
    background: var(--accent);
    margin: 18px auto;
    user-select: none;
`;

export const Turbo = styled.div`
    display: flex;
    align-items: center;
    text-transform: uppercase;
    font-weight: 800;
    font-style: italic;
    font-size: 13px;
    color: var(--accent-foreground);
    background: var(--accent);
    padding: 1px 5px;
    border-start-start-radius: 0 !important;
    border-radius: 5px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        right: -4px;
        left: -4px;
        display: flex;
        width: 2px;
        height: 4px;
        border: 8px solid var(--accent);
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        border-bottom: 5px solid transparent;
    }
`;
