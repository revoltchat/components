import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
import { ChangeEvent } from "react";

import { TextArea } from "./TextArea";

export default {
    title: "Design System/Atoms/Inputs/TextArea",
    component: TextArea,
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
        code: {
            name: "Enable code font",
            type: "boolean",
            defaultValue: false,
        },
        hideBorder: {
            name: "Hide border",
            type: "boolean",
            defaultValue: false,
        },
        padding: {
            name: "Padding",
            type: "string",
        },
        lineHeight: {
            name: "Line height",
            type: "string",
        },
    },
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => {
    const [_, updateArgs] = useArgs();

    return (
        <TextArea
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
