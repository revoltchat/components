import React from "react";
import { useArgs } from "@storybook/client-api";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ChangeEvent } from "react";

import { ComboBox } from "./ComboBox";

export default {
    title: "Design System/Atoms/Inputs/Combo Box",
    component: ComboBox,
    argTypes: {
        value: { name: "Value", type: "string", defaultValue: "Element A" },
    },
} as ComponentMeta<typeof ComboBox>;

const Template: ComponentStory<typeof ComboBox> = (args) => {
    const [_, updateArgs] = useArgs();

    return (
        <ComboBox
            {...args}
            onChange={(el: ChangeEvent<HTMLSelectElement>) =>
                updateArgs({ value: el.currentTarget.value })
            }>
            <option>Element A</option>
            <option>Element B</option>
            <option>Element C</option>
        </ComboBox>
    );
};

export const Default = Template.bind({});
