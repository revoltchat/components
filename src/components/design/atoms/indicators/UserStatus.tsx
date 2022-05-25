import React from "react";
import type { UserStatus as Interface } from "revolt-api";

export type Props = {
    /**
     * User status
     */
    status: Interface["presence"];
};

const mappings: Record<Props["status"] & string, string> = {
    Online: "online",
    Idle: "away",
    Busy: "busy",
    Invisible: "invisible",
};

/**
 * Overlays user status in current SVG
 */
export function UserStatus({ status }: Props) {
    return (
        <circle
            cx="27"
            cy="27"
            r="5"
            fill={`var(--status-${mappings[status!] ?? "invisible"})`}
        />
    );
}
