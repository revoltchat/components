import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { H1 } from "./H1";

export default {
    title: "Design System/Atoms/Headings/Size 1",
    component: H1,
    argTypes: {
        children: {
            name: "Content",
            type: "string",
            defaultValue: "I am a heading of size 1!",
        },
    },
} as ComponentMeta<typeof H1>;

const Template: ComponentStory<typeof H1> = (args) => <H1 {...args} />;

export const Default = Template.bind({});
