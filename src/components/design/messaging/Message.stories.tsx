import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Message } from "./Message";
import {
    ContextDecorator,
    InjectMockClient,
    MaskDecorator,
} from "../../../lib/internal";
import type { API } from "revolt.js";

const defaultValue: Omit<API.Message, "_id" | "channel" | "author"> = {
    content: "Hello there!",
    edited: new Date().toUTCString(),
};

export default {
    title: "Design System/Messaging/Message",
    component: Message,
    argTypes: {
        message: {
            name: "Message",
            type: "object" as any,
            defaultValue,
        },
        head: {
            name: "Head",
            type: "boolean",
            defaultValue: true,
        },
    },
    decorators: [MaskDecorator, ContextDecorator],
} as ComponentMeta<typeof Message>;

const Template: ComponentStory<typeof Message> = ({ message, head }) => (
    <InjectMockClient>
        {({ client }) => {
            return (
                <Message
                    head={head}
                    message={(client as any).createMessage(message)}
                />
            );
        }}
    </InjectMockClient>
);

export const Default = Template.bind({});
