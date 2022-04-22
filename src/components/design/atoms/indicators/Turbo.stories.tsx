import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Turbo } from "./Turbo";

export default {
    title: "Design System/Atoms/Indicators/Turbo",
    component: Turbo,
    argTypes: {},
} as ComponentMeta<typeof Turbo>;

const Template: ComponentStory<typeof Turbo> = () => (
    <div style={{ width: "fit-content" }}>
        <Turbo />
    </div>
);

export const Default = Template.bind({});
