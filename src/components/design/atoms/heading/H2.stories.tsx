import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { H2 } from "./H2";

export default {
    title: "Design System/Atoms/Headings/Size 2",
    component: H2,
    argTypes: {
        children: {
            name: "Content",
            type: "string",
            defaultValue: "I am a heading of size 2!",
        },
    },
} as ComponentMeta<typeof H2>;

const Template: ComponentStory<typeof H2> = (args) => <H2 {...args} />;

export const Default = Template.bind({});
