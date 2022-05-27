import React from "react";
import Tippy, { TippyProps } from "@tippyjs/react";

export function Tooltip(props: TippyProps) {
    return <Tippy animation="shift-away" {...props} />;
}
