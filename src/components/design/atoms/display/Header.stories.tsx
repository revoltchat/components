import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Header } from "./Header";

export default {
    title: "Design System/Atoms/Display/Header",
    component: Header,
    argTypes: {
        children: {
            name: "Content",
            type: "string",
            defaultValue: "Header Title",
        },
        palette: {
            name: "Palette",
            control: "radio",
            options: ["primary", "secondary"],
            defaultValue: "primary",
        },
        topBorder: { name: "Top Border", type: "boolean", defaultValue: false },
        bottomBorder: {
            name: "Bottom Border",
            type: "boolean",
            defaultValue: false,
        },
        withBackground: {
            name: "Has background?",
            type: "boolean",
            defaultValue: false,
        },
        withTransparency: {
            name: "Has transparency?",
            type: "boolean",
            defaultValue: false,
        },
    },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
