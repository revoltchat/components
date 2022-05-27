import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ServerList } from "./ServerList";
import { InjectMockClient, MaskDecorator } from "../../../../../lib/internal";

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
    decorators: [MaskDecorator],
} as ComponentMeta<typeof ServerList>;

function DemoLinkComponent({
    url,
    children,
}: {
    url: string;
    children: React.ReactNode;
}) {
    return <a onClick={() => alert(`Navigating to ${url}!`)}>{children}</a>;
}

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
                <ServerList
                    {...args}
                    client={client}
                    linkComponent={DemoLinkComponent}
                />
            </div>
        )}
    </InjectMockClient>
);

export const Default = Template.bind({});
