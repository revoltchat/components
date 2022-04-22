import { ComponentMeta } from "@storybook/react";
import { useArgs } from "@storybook/client-api";

import { Props, RoleList } from "./RoleList";

export default {
    title: "Pages/Permissions/RoleList",
    component: RoleList,
    args: {
        server: {
            orderedRoles: {
                a: {
                    name: "Admin",
                    permissions: {
                        a: 0,
                        d: 0,
                    },
                    colour: "rgb(123, 104, 238)",
                    rank: 1,
                },
                b: {
                    name: "Moderator",
                    permissions: {
                        a: 0,
                        d: 0,
                    },
                    colour: "rgb(253, 102, 113)",
                    rank: 2,
                },
                c: {
                    name: "Bot",
                    permissions: {
                        a: 0,
                        d: 0,
                    },
                    colour: "rgb(52, 152, 219)",
                    rank: 3,
                },
            },
        },
        showDefault: true,
    },
} as ComponentMeta<typeof RoleList>;

export const Default = (args: Props) => {
    const [_, updateArgs] = useArgs();
    return (
        <RoleList {...args} onSelect={(selected) => updateArgs({ selected })} />
    );
};
