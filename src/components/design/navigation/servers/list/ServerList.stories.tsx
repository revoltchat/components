import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ServerList } from "./ServerList";
import {
    ContextDecorator,
    InjectMockClient,
    MaskDecorator,
} from "../../../../../lib/internal";
import { Tooltip } from "../../../atoms/indicators/Tooltip";

export default {
    title: "Navigation/Servers/List",
    component: ServerList,
    argTypes: {
        client: {
            name: "Revolt.js Client",
            type: "symbol",
        },
        active: {
            name: "Active Server Id",
        },
        linkComponent: {
            name: "Link Component",
            type: "symbol",
        },
        permit: {
            name: "Notification Checker",
            type: "symbol",
            defaultValue: {
                isMuted: () => false,
            },
        },
        home: {
            name: "Home URL Generator",
            type: "symbol",
            defaultValue: () => "/",
        },
    },
    decorators: [MaskDecorator, ContextDecorator],
} as ComponentMeta<typeof ServerList>;

const Template: ComponentStory<typeof ServerList> = (args) => (
    <InjectMockClient>
        {({ client }) => (
            <div
                style={{
                    // height: "240px",
                    height: "560px",
                    display: "flex",
                    flexDirection: "row",
                }}>
                <ServerList {...args} client={client} />
            </div>
        )}
    </InjectMockClient>
);

export const Default = Template.bind({});
