import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ChevronDown, ChevronRight } from "@styled-icons/boxicons-regular";

import { Details } from "./Details";

export default {
    title: "Design System/Atoms/Display/Details",
    component: Details,
    argTypes: {
        children: {
            name: "Content",
            type: "string",
            defaultValue: "Textual Content",
        },
        summary: {
            name: "Summary",
            type: "string",
            defaultValue: "Details Component",
        },
        sticky: {
            name: "Sticky",
            type: "boolean",
            defaultValue: false,
        },
        large: {
            name: "Large",
            type: "boolean",
            defaultValue: false,
        },
    },
} as ComponentMeta<typeof Details>;

const Template: ComponentStory<typeof Details> = (args) => {
    const { summary, children, ...rest } = args;

    return (
        <div style={{ color: "var(--foreground)" }}>
            <Details {...rest}>
                <summary>
                    <ChevronDown size={20} /> {summary}
                </summary>
                {children}
            </Details>
        </div>
    );
};

export const Default = Template.bind({});
