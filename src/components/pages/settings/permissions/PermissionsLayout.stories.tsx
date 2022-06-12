import React from "react";
import { ComponentMeta } from "@storybook/react";

import { PermissionsLayout, Props } from "./PermissionsLayout";

import RoleListStory from "./RoleList.stories";

export default {
    title: "Pages/Settings/Permissions/Permissions Layout",
    component: PermissionsLayout,
    args: {
        server: RoleListStory.args!.server,
    },
} as ComponentMeta<typeof PermissionsLayout>;

export const Default = (args: Props) => (
    <PermissionsLayout
        {...args}
        editor={({ selected }) => (
            <span style={{ color: "var(--foreground)" }}>
                Currently selected ID: {selected}
            </span>
        )}
    />
);
