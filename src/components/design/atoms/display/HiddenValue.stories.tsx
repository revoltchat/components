import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { HiddenValue } from "./HiddenValue";
import { ContextDecorator } from "../../../../lib/internal";

export default {
    title: "Design System/Atoms/Display/Hidden Value",
    component: HiddenValue,
    argTypes: {
        value: {
            name: "Value",
            defaultValue: "user@example.com",
        },
        placeholder: {
            name: "Placeholder",
            defaultValue: "•••••••••••@••••••.•••",
        },
    },
    decorators: [ContextDecorator],
} as ComponentMeta<typeof HiddenValue>;

const Template: ComponentStory<typeof HiddenValue> = (args) => (
    <HiddenValue {...args} />
);

export const Default = Template.bind({});
