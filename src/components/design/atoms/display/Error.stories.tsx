import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Error } from "./Error";

export default {
    title: "Design System/Atoms/Display/Error",
    component: Error,
    argTypes: {
        children: {
            name: "Content",
            type: "string",
            defaultValue: "Child Element",
        },
        error: {
            name: "Error",
            type: "string",
            defaultValue: "Something went wrong!",
        },
    },
} as ComponentMeta<typeof Error>;

const Template: ComponentStory<typeof Error> = (args) => <Error {...args} />;

export const Default = Template.bind({});

export const ContentPassthrough = Template.bind({});

ContentPassthrough.args = {
    error: "",
};

export const OnlyError = Template.bind({});

OnlyError.args = {
    children: "",
};
