import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Preloader } from "./Preloader";

export default {
    title: "Design System/Atoms/Indicators/Preloader",
    component: Preloader,
    argTypes: {
        type: {
            name: "Type",
            control: "radio",
            options: ["spinner", "ring"],
        },
    },
} as ComponentMeta<typeof Preloader>;

const Template: ComponentStory<typeof Preloader> = (args) => (
    <Preloader {...args} />
);

export const Spinner = Template.bind({});

Spinner.args = {
    type: "spinner",
};

export const Ring = Template.bind({});

Ring.args = {
    type: "ring",
};
