import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Unreads } from "./Unreads";
import { Avatar } from "../layout/Avatar";
import { Masks } from "../../../common";

export default {
    title: "Design System/Atoms/Indicators/Unreads",
    component: Unreads,
    argTypes: {
        unread: {
            name: "Unread",
            defaultValue: true,
        },
    },
} as ComponentMeta<typeof Unreads>;

const Template: ComponentStory<typeof Unreads> = (args) => (
    <>
        <Avatar
            size={256}
            holepunch={(args.unread || args.count > 0) && "top-right"}
            overlay={<Unreads {...args} />}
        />
        <Masks />
    </>
);

export const Default = Template.bind({});
