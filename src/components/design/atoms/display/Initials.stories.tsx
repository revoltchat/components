import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Initials } from "./Initials";
import { Masks } from "../../../common";
import { MaskDecorator } from "../../../../lib/internal";

export default {
    title: "Design System/Atoms/Display/Initials",
    component: Initials,
    argTypes: {
        input: {
            name: "Input String",
            defaultValue: "John Smith",
        },
        maxLength: {
            name: "Max Length",
        },
    },
    decorators: [MaskDecorator],
} as ComponentMeta<typeof Initials>;

const Template: ComponentStory<typeof Initials> = (args) => (
    <Initials {...args} />
);

export const Default = Template.bind({});
