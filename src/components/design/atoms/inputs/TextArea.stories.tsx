import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
import { ChangeEvent } from "react";
import { Markdown } from "@styled-icons/boxicons-logos";
import { H5 } from "../heading/H5";

import { TextArea, MarkdownTip } from "./TextArea";

export default {
    title: "Design System/Atoms/Inputs/Text Area",
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
        <>
            <TextArea
                {...args}
                onChange={(el: ChangeEvent<HTMLInputElement>) =>
                    updateArgs({ value: el.currentTarget.value })
                }
            />
            <MarkdownTip>
                <Markdown size="24" />
                <H5>
                    Descriptions support Markdown formatting,{" "}
                    <a
                        href="https://developers.revolt.chat/markdown"
                        target="_blank"
                        rel="noreferrer">
                        learn more here
                    </a>
                    .
                </H5>
            </MarkdownTip>
        </>
    );
};

export const DefaultEmpty = Template.bind({});

DefaultEmpty.args = {
    value: "",
};

export const DefaultFilled = Template.bind({});
