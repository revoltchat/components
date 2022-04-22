import React from "react";
import { useArgs } from "@storybook/client-api";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Radio } from "./Radio";

export default {
    title: "Design System/Atoms/Inputs/Radio",
    component: Radio,
    argTypes: {
        title: {
            name: "Title",
            type: "string",
            defaultValue: "Sample Radio Input",
        },
        description: {
            name: "Description",
            type: "string",
            defaultValue:
                "This is a sample radio input for demonstration purposes.",
        },
        disabled: { name: "Disabled", type: "boolean", defaultValue: false },
        value: { name: "Checked", type: "boolean", defaultValue: false },
    },
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => {
    const [_, updateArgs] = useArgs();

    return <Radio {...args} />;
};

export const Default = Template.bind({});
