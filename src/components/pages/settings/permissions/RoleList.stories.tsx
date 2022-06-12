import React from "react";
import { ComponentMeta } from "@storybook/react";
import { useArgs } from "@storybook/client-api";

import { Props, RoleList } from "./RoleList";

export default {
    title: "Pages/Settings/Permissions/Role List",
    component: RoleList,
    args: {
        server: {
            orderedRoles: [
                {
                    id: "a",
                    name: "Admin",
                    permissions: {
                        a: 0,
                        d: 0,
                    },
                    colour: "rgb(123, 104, 238)",
                    rank: 1,
                },
                {
                    id: "b",
                    name: "Moderator",
                    permissions: {
                        a: 0,
                        d: 0,
                    },
                    colour: "rgb(253, 102, 113)",
                    rank: 2,
                },
                {
                    id: "c",
                    name: "Bot",
                    permissions: {
                        a: 0,
                        d: 0,
                    },
                    colour: "rgb(52, 152, 219)",
                    rank: 3,
                },
            ],
        },
        rank: 2,
        showDefault: true,
        selected: "default",
        ...({} as any),
    },
} as ComponentMeta<typeof RoleList>;

export const Default = (args: Props) => {
    const [_, updateArgs] = useArgs();
    return (
        <RoleList {...args} onSelect={(selected) => updateArgs({ selected })} />
    );
};
