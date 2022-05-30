import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Banner } from "./Banner";

export default {
    title: "Design System/Atoms/Display/Banner",
    component: Banner,
    argTypes: {
        children: {
            name: "Content",
            type: "string",
            defaultValue: "I am a banner!",
        },
    },
} as ComponentMeta<typeof Banner>;

const Template: ComponentStory<typeof Banner> = (args) => <Banner {...args} />;

export const Default = Template.bind({});
