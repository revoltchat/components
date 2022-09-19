import React, { useCallback, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ServerList } from "./ServerList";
import {
    ContextDecorator,
    InjectMockClient,
    MaskDecorator,
} from "../../../../../lib/internal";
import { reorder } from "../../../../common";

export default {
    title: "Navigation/Servers/List",
    component: ServerList,
    argTypes: {
        client: {
            name: "Revolt.js Client",
            type: "symbol",
        },
        servers: {
            name: "Ordered Servers",
            type: "symbol",
        },
        reorder: {
            name: "Reordering Function",
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
        {({ client }) => {
            const [servers, setServers] = useState([
                ...client.servers.values(),
            ]);

            const reorderFn = useCallback(
                (source: number, dest: number) => {
                    setServers((servers) => reorder(servers, source, dest));
                },
                [setServers],
            );

            return (
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
                        servers={servers}
                        reorder={reorderFn}
                    />
                </div>
            );
        }}
    </InjectMockClient>
);

export const Default = Template.bind({});
