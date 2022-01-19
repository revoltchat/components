import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LineDivider } from "./LineDivider";

export default {
    title: "Design System/Atoms/Layout/Line Divider",
    component: LineDivider,
    argTypes: {},
} as ComponentMeta<typeof LineDivider>;

const Template: ComponentStory<typeof LineDivider> = (args) => (
    <LineDivider {...args} />
);

export const Default = Template.bind({});
