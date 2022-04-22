import React from "react";
import styled from "styled-components";

export const H3 = styled.h3`
    /* SETTINGS SECTION TITLE, 
       NOT TO BE CONFUSED WITH CATEGORY TITLES, 
       DO NOT USE HEADINGS ON THOSE. */
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--secondary-foreground);

    &:first-child {
        margin-top: 0;
    }
`;
