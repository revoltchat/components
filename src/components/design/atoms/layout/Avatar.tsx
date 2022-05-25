import React, { ReactNode } from "react";
import styled from "styled-components";
import { Initials } from "./Initials";

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
`;

const FallbackBase = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 600;
    font-size: 0.75rem;
    color: var(--foreground);
    background: var(--secondary-background);
`;

export type Props = {
    /**
     * Avatar size
     */
    size?: number;

    /**
     * Image source
     */
    src?: string;

    /**
     * Fallback if no source
     */
    fallback?: string | ReactNode;

    /**
     * Punch a hole through the avatar
     */
    holepunch?: "bottom-right" | "top-right" | "none" | false;

    /**
     * Specify overlay component
     */
    overlay?: ReactNode;
};

/**
 * Generic Avatar component
 *
 * Partially inspired by Adw.Avatar API, we allow users to specify a fallback component (usually just text) to display in case the URL is invalid.
 */
export function Avatar({ size, holepunch, fallback, src, overlay }: Props) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32">
            <foreignObject
                x="0"
                y="0"
                width="32"
                height="32"
                mask={holepunch ? `url(#holepunch-${holepunch})` : undefined}>
                {src && <Image src={src} />}
                {!src && (
                    <FallbackBase>
                        {typeof fallback === "string" ? (
                            <Initials input={fallback} maxLength={2} />
                        ) : (
                            fallback
                        )}
                    </FallbackBase>
                )}
            </foreignObject>
            {overlay}
        </svg>
    );
}
