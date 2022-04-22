import React from "react";
import { useArgs } from "@storybook/client-api";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ColourSwatches } from "./ColourSwatches";

export default {
    title: "Design System/Atoms/Inputs/Colour Swatches",
    component: ColourSwatches,
    argTypes: {
        value: { name: "Value", type: "string", defaultValue: "#FD6671" },
    },
} as ComponentMeta<typeof ColourSwatches>;

const Template: ComponentStory<typeof ColourSwatches> = (args) => {
    const [_, updateArgs] = useArgs();

    return (
        <ColourSwatches {...args} onChange={(value) => updateArgs({ value })} />
    );
};

export const Default = Template.bind({});
