import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { MaskDecorator } from "../../../../lib/internal";

import { Avatar } from "../display/Avatar";
import { UserStatus } from "./UserStatus";

export default {
    title: "Design System/Atoms/Indicators/User Status",
    component: UserStatus,
    argTypes: {
        status: {
            name: "User Status",
            control: "radio",
            options: ["Online", "Idle", "Focus", "Busy", "Invisible"],
            defaultValue: "Online",
        },
    },
    decorators: [MaskDecorator],
} as ComponentMeta<typeof UserStatus>;

const Template: ComponentStory<typeof UserStatus> = (args) => (
    <Avatar
        size={256}
        holepunch="bottom-right"
        overlay={<UserStatus key="user-status" {...args} />}
    />
);

export const Default = Template.bind({});
