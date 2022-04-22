import { ComponentMeta } from "@storybook/react";

import { RoleList } from "./RoleList";

export default {
    title: "Pages/Permissions/RoleList",
    component: RoleList,
} as ComponentMeta<typeof RoleList>;

export const Default = () => <RoleList />;
