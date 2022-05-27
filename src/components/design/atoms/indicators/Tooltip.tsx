import React from "react";
import Tippy, { TippyProps } from "@tippyjs/react";
import { useText } from "../../../../lib";

export type TooltipProps = TippyProps & {
    /**
     * Add wrapper <div/> around content.
     *
     * Necessary if child element is an SVG, since
     * bounding box calculations may go wrong and
     * the tooltip likely won't display.
     */
    div?: boolean;

    /**
     * Short-hand for placement="right"
     */
    right?: boolean;

    /**
     * i18n key for tooltip text
     */
    i18n?: string;
};

/**
 * Generic tooltip component
 */
export function Tooltip({ div, ...props }: TooltipProps) {
    // Wrap the child element in a div
    if (div) {
        const { children, ...tippy } = props;

        return (
            <Tooltip {...tippy}>
                <div>{children}</div>
            </Tooltip>
        );
    }

    // Localise the given string
    if (props.i18n) {
        const Text = useText();
        const { i18n, ...tippy } = props;
        return <Tooltip content={<Text id={i18n} />} {...tippy} />;
    }

    const { right, ...tippy } = props;
    return (
        <Tippy
            animation="shift-away"
            placement={right ? "right" : undefined}
            {...tippy}
        />
    );
}
