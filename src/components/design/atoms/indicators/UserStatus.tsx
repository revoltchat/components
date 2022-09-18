import { observer } from "mobx-react-lite";
import React from "react";
import type { User, API } from "revolt.js";

export type Props = {
    /**
     * User we are dealing with
     */
    user?: User;
};

const mappings: Record<API.UserStatus["presence"] & string, string> = {
    Online: "online",
    Idle: "away",
    Focus: "focus",
    Busy: "busy",
    Invisible: "invisible",
};

/**
 * Overlays user status in current SVG
 */
export const UserStatus = observer(({ user }: Props) => {
    return (
        <circle
            cx="27"
            cy="27"
            r="5"
            fill={`var(--status-${
                mappings[
                    user?.status?.presence ??
                        (user?.online ? "Online" : "Invisible")
                ]
            })`}
        />
    );
});
