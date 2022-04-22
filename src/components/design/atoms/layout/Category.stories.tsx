import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Category } from "./Category";

export default {
    title: "Design System/Atoms/Layout/Category",
    component: Category,
    argTypes: {
        children: {
            name: "Content",
            type: "string",
            defaultValue: "Some Category",
        },
    },
} as ComponentMeta<typeof Category>;

const Template: ComponentStory<typeof Category> = (args) => (
    <Category {...args} />
);

export const Default = Template.bind({});
