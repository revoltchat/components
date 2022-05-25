import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Avatar } from "./Avatar";
import { Masks } from "../../../common";

export default {
    title: "Design System/Atoms/Layout/Avatar",
    component: Avatar,
    argTypes: {
        size: {
            name: "Size",
            type: "number",
            defaultValue: 256,
        },
        src: {
            name: "Source",
            type: "string",
            defaultValue:
                "https://autumn.revolt.chat/attachments/Jzd9uX7iFg4cElkbeNV4vsiaUkMkXNguO2X7rEMajl/ul5PFf4_dySDWGeOJ4WIOTlnL8uF-h4d4gn5TISB1g.png",
        },
        fallback: {
            name: "Fallback Component",
            type: "string",
        },
        holepunch: {
            name: "Holepunch",
        },
        overlay: {
            name: "Overlay Components",
            type: "symbol",
        },
    },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => (
    <div>
        <Avatar {...args} />
        <Masks />
    </div>
);

export const Default = Template.bind({});
