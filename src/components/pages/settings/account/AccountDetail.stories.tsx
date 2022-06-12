import React from "react";
import { ComponentMeta } from "@storybook/react";

import { AccountDetail, Props } from "./AccountDetail";
import { ContextDecorator, InjectMockClient } from "../../../../lib/internal";

export default {
    title: "Pages/Settings/Account/Account Detail",
    component: AccountDetail,
    decorators: [ContextDecorator],
    argTypes: {
        user: {
            type: "symbol",
        },
    },
} as ComponentMeta<typeof AccountDetail>;

export const Default = (args: Props) => (
    <InjectMockClient>
        {({ client }) => <AccountDetail {...args} user={client.user!} />}
    </InjectMockClient>
);
