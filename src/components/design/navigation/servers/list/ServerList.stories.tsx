import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ServerList } from "./ServerList";
import { Masks } from "../../../../common";

export default {
    title: "Design System/Navigation/Servers/List",
    component: ServerList,
    argTypes: {
        servers: {
            name: "Servers",
            defaultValue: [
                {
                    _id: "a",
                    name: "Server Name",
                    unread: true,
                    mentions: [],
                },
                {
                    _id: "b",
                    name: "My Server",
                    unread: true,
                    mentions: ["a", "b", "c"],
                },
                {
                    _id: "c",
                    name: "Joe Nuts",
                    unread: false,
                    mentions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                },
                {
                    _id: "d",
                    name: "Deez Nuts",
                    unread: false,
                    mentions: [],
                },
                {
                    _id: "e",
                    name: "E",
                    unread: false,
                    mentions: [],
                },
                {
                    _id: "f",
                    name: "F",
                    unread: true,
                    mentions: [],
                },
                {
                    _id: "g",
                    name: "G",
                    unread: false,
                    mentions: [],
                },
                {
                    _id: "h",
                    name: "H H",
                    unread: false,
                    mentions: [],
                },
            ],
        },
        active: {
            name: "Active Server Id",
        },
        linkComponent: {
            name: "Link Component",
            type: "symbol",
        },
    },
} as ComponentMeta<typeof ServerList>;

function DemoLinkComponent({
    id,
    children,
}: {
    id: string;
    children: React.ReactNode;
}) {
    return <a onClick={() => alert(`Clicked on ${id}!`)}>{children}</a>;
}

const Template: ComponentStory<typeof ServerList> = (args) => (
    <>
        <div
            style={{
                // height: "240px",
                height: "560px",
                display: "flex",
                flexDirection: "row",
            }}>
            <ServerList {...args} linkComponent={DemoLinkComponent} />
        </div>
        <Masks />
    </>
);

export const Default = Template.bind({});
