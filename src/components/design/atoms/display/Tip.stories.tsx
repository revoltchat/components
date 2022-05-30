import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Tip } from "./Tip";

export default {
    title: "Design System/Atoms/Display/Tip",
    component: Tip,
    argTypes: {
        children: {
            name: "Content",
            type: "string",
            defaultValue: "This is a tip for demonstration purposes.",
        },
        palette: {
            name: "Palette",
            control: "radio",
            options: ["primary", "success", "warning", "error"],
            defaultValue: "primary",
        },
    },
} as ComponentMeta<typeof Tip>;

const Template: ComponentStory<typeof Tip> = (args) => <Tip {...args} />;

export const Default = Template.bind({});
