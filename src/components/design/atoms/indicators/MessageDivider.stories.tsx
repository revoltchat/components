import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { MessageDivider } from "./MessageDivider";

export default {
    title: "Design System/Atoms/Indicators/Message Divider",
    component: MessageDivider,
    argTypes: {
        unread: { name: "Is unread?", type: "boolean", defaultValue: true },
        date: { name: "Date", type: "string", defaultValue: "23rd of January" },
    },
} as ComponentMeta<typeof MessageDivider>;

const Template: ComponentStory<typeof MessageDivider> = (args) => (
    <MessageDivider {...args} />
);

export const Default = Template.bind({});

export const OnlyDate = Template.bind({});

OnlyDate.args = {
    unread: false,
};

export const OnlyUnread = Template.bind({});

OnlyUnread.args = {
    date: undefined,
};
