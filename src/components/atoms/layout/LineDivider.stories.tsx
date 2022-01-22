import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Bolt } from "@styled-icons/boxicons-solid";
import { LineDivider, Turbo } from "./LineDivider";

export default {
    title: "Design System/Atoms/Layout/Line Divider",
    component: LineDivider,
    argTypes: {},
} as ComponentMeta<typeof LineDivider>;

const Template: ComponentStory<typeof LineDivider> = (args) => (
    <LineDivider {...args}>
        <Turbo>
            <Bolt size={13} />
            turbo
        </Turbo>
    </LineDivider>
);

export const Default = Template.bind({});
