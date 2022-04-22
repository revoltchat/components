import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { H4 } from "./H4";

export default {
    title: "Design System/Atoms/Headings/Size 4",
    component: H4,
    argTypes: {
        children: {
            name: "Content",
            type: "string",
            defaultValue: "I am a heading of size 4!",
        },
    },
} as ComponentMeta<typeof H4>;

const Template: ComponentStory<typeof H4> = (args) => <H4 {...args} />;

export const Default = Template.bind({});
