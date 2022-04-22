import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { H6 } from "./H6";

export default {
    title: "Design System/Atoms/Headings/Size 6",
    component: H6,
    argTypes: {
        children: {
            name: "Content",
            type: "string",
            defaultValue: "I am a heading of size 6!",
        },
    },
} as ComponentMeta<typeof H6>;

const Template: ComponentStory<typeof H6> = (args) => <H6 {...args} />;

export const Default = Template.bind({});
