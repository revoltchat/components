import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Tooltip } from "./Tooltip";

export default {
    title: "Design System/Atoms/Indicators/Tooltip",
    component: Tooltip,
    argTypes: {},
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = () => (
    <Tooltip content={"I am a tooltip!"}>
        <p style={{ color: "white", width: "max-content" }}>Hover me!</p>
    </Tooltip>
);

export const Default = Template.bind({});
