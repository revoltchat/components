import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { H3 } from "./H3";

export default {
    title: "Design System/Atoms/Headings/Size 3",
    component: H3,
    argTypes: {
        children: {
            name: "Content",
            type: "string",
            defaultValue: "I am a heading of size 3!",
        },
    },
} as ComponentMeta<typeof H3>;

const Template: ComponentStory<typeof H3> = (args) => <H3 {...args} />;

export const Default = Template.bind({});
