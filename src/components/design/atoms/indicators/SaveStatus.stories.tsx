import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SaveStatus } from "./SaveStatus";

export default {
    title: "Design System/Atoms/Indicators/Save Status",
    component: SaveStatus,
    argTypes: {
        status: {
            name: "Status",
            control: "radio",
            options: ["saved", "editing", "saving"],
            defaultValue: "saved",
        },
    },
} as ComponentMeta<typeof SaveStatus>;

const Template: ComponentStory<typeof SaveStatus> = (args) => (
    <SaveStatus {...args} />
);

export const Saved = Template.bind({});

export const Editing = Template.bind({});

Editing.args = {
    status: "editing",
};

export const Saving = Template.bind({});

Saving.args = {
    status: "saving",
};
