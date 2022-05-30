import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Category } from "./Category";

export default {
    title: "Design System/Atoms/Display/Category",
    component: Category,
    argTypes: {
        compact: {
            name: "Compact",
            type: "boolean",
            defaultValue: false,
        },
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
