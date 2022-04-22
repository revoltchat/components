import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
import { ChangeEvent } from "react";

import { InputBox } from "./InputBox";

export default {
    title: "Design System/Atoms/Inputs/Input Box",
    component: InputBox,
    argTypes: {
        value: {
            name: "Value",
            type: "string",
            defaultValue: "I am a value.",
        },
        placeholder: {
            name: "Placeholder",
            type: "string",
            defaultValue: "Enter something cool...",
        },
        palette: {
            name: "Palette",
            control: "radio",
            options: ["primary", "secondary"],
            defaultValue: "primary",
        },
    },
} as ComponentMeta<typeof InputBox>;

const Template: ComponentStory<typeof InputBox> = (args) => {
    const [_, updateArgs] = useArgs();

    return (
        <InputBox
            {...args}
            onChange={(el: ChangeEvent<HTMLInputElement>) =>
                updateArgs({ value: el.currentTarget.value })
            }
        />
    );
};

export const DefaultEmpty = Template.bind({});

DefaultEmpty.args = {
    value: "",
};

export const DefaultFilled = Template.bind({});
