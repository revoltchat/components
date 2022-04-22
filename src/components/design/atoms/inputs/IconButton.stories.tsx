import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Globe } from "@styled-icons/boxicons-regular";

import { IconButton } from "./IconButton";

export default {
    title: "Design System/Atoms/Inputs/Icon Button",
    component: IconButton,
    argTypes: {
        shape: {
            name: "Shape",
            control: "radio",
            options: ["default", "circle"],
            defaultValue: "default",
        },
    },
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => (
    <IconButton {...args} children={<Globe size={32} />} />
);

export const Normal = Template.bind({});

export const Circle = Template.bind({});

Circle.args = {
    shape: "circle",
};

export const Rotated = Template.bind({});

Rotated.args = {
    rotate: "90deg",
};
