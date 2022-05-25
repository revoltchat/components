import React from "react";

export type Props = {
    unread: boolean;
    count: number;
};

/**
 * Overlays unreads in current SVG
 */
export function Unreads({ unread, count }: Props) {
    if (count > 0) {
        return (
            <>
                <circle cx="27" cy="5" r="5" fill={"var(--error)"} />
                <text
                    x="27"
                    y="5"
                    r="5"
                    fill={"white"}
                    fontSize={"7.5"}
                    fontWeight={600}
                    text-anchor="middle"
                    alignmentBaseline={"middle"}
                    dominant-baseline={"middle"}>
                    {count < 10 ? count : "9+"}
                </text>
            </>
        );
    }

    if (unread) {
        return <circle cx="27" cy="5" r="5" fill={"white"} />;
    }

    return null;
}
