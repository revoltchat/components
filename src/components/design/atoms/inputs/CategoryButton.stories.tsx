import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CategoryButton } from "./CategoryButton";

export default {
    title: "Design System/Atoms/Inputs/Category Button",
    component: CategoryButton,
    argTypes: {
        //
    },
} as ComponentMeta<typeof CategoryButton>;

const Template: ComponentStory<typeof CategoryButton> = (args) => (
    <CategoryButton {...args} />
);

export const Default = Template.bind({});
