import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./Button";

export default {
    title: "Design System/Atoms/Inputs/Button",
    component: Button,
    argTypes: {
        children: {
            name: "Content",
            type: "string",
            defaultValue: "Click me!",
        },
        palette: {
            name: "Palette",
            control: "radio",
            options: [
                "primary",
                "secondary",
                "plain",
                "accent",
                "success",
                "warning",
                "error",
            ],
            defaultValue: "primary",
        },
        icon: { name: "Icon", type: "boolean", defaultValue: false },
        compact: { name: "Compact", type: "boolean", defaultValue: false },
        disabled: { name: "Disabled", type: "boolean", defaultValue: false },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Normal = Template.bind({});

Normal.args = {
    palette: "primary",
};

export const Compact = Template.bind({});

Compact.args = {
    compact: true,
    palette: "primary",
};
