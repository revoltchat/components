import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { H5 } from "./H5";

export default {
    title: "Design System/Atoms/Headings/Size 5",
    component: H5,
    argTypes: {
        children: {
            name: "Content",
            type: "string",
            defaultValue: "I am a heading of size 5!",
        },
    },
} as ComponentMeta<typeof H5>;

const Template: ComponentStory<typeof H5> = (args) => <H5 {...args} />;

export const Default = Template.bind({});
