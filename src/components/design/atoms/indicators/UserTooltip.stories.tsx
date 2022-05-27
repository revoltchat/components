import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { UserTooltip } from "./UserTooltip";
import { InjectMockClient } from "../../../../lib/internal";

export default {
    title: "Design System/Atoms/Indicators/User Tooltip",
    component: UserTooltip,
    argTypes: {
        user: {
            name: "User",
            type: "symbol",
        },
    },
} as ComponentMeta<typeof UserTooltip>;

const Template: ComponentStory<typeof UserTooltip> = (args) => (
    <InjectMockClient>
        {({ client }) => (
            <UserTooltip {...args} user={client.user!} placement="right">
                <p style={{ color: "white", width: "max-content" }}>
                    Hover me!
                </p>
            </UserTooltip>
        )}
    </InjectMockClient>
);

export const Default = Template.bind({});
