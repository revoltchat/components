import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Turbo } from "../indicators/Turbo";
import { LineDivider } from "./LineDivider";

export default {
    title: "Design System/Atoms/Display/Line Divider",
    component: LineDivider,
    argTypes: {
        /*palette: {
            name: "Palette",
            control: "radio",
            options: ["primary", "accent"],
            defaultValue: "primary",
        },*/
        turbo: {
            name: "Turbo (Demo Content)",
            type: "boolean",
            defaultValue: false,
        },
    },
} as ComponentMeta<typeof LineDivider>;

const Template: ComponentStory<typeof LineDivider> = (args) => (
    <LineDivider {...args}>{args.turbo && <Turbo />}</LineDivider>
);

export const Default = Template.bind({});

export const WithTurbo = Template.bind({});

WithTurbo.args = { turbo: true, palette: "accent" };
