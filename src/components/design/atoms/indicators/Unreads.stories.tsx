import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Unreads } from "./Unreads";
import { Avatar } from "../display/Avatar";
import { Masks } from "../../../common";
import { MaskDecorator } from "../../../../lib/internal";

export default {
    title: "Design System/Atoms/Indicators/Unreads",
    component: Unreads,
    argTypes: {
        unread: {
            name: "Unread",
            defaultValue: true,
        },
    },
    decorators: [MaskDecorator],
} as ComponentMeta<typeof Unreads>;

const Template: ComponentStory<typeof Unreads> = (args) => (
    <Avatar
        size={256}
        holepunch={(args.unread || args.count > 0) && "top-right"}
        overlay={<Unreads {...args} />}
    />
);

export const Default = Template.bind({});
