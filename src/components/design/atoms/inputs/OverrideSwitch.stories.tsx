import React from "react";
import { ComponentMeta } from "@storybook/react";
import { useArgs } from "@storybook/client-api";

import { OverrideSwitch, Props } from "./OverrideSwitch";

export default {
    title: "Design System/Atoms/Inputs/Override Switch",
    component: OverrideSwitch,
    args: {
        state: "Neutral",
    },
} as ComponentMeta<typeof OverrideSwitch>;

export const Default = (args: Props) => {
    const [_, updateArgs] = useArgs();
    return (
        <OverrideSwitch {...args} onChange={(state) => updateArgs({ state })} />
    );
};
