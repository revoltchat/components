import { useArgs } from "@storybook/client-api";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Checkbox } from "./Checkbox";

export default {
    title: "Design System/Atoms/Inputs/Checkbox",
    component: Checkbox,
    argTypes: {
        children: {
            name: "Content",
            type: "string",
            defaultValue: "Sample Checkbox",
        },
        description: {
            name: "Description",
            type: "string",
            defaultValue:
                "This is a sample checkbox for demonstration purposes.",
        },
        palette: {
            name: "Palette",
            control: "radio",
            options: ["primary", "secondary"],
            defaultValue: "primary",
        },
        value: { name: "Checked", type: "boolean", defaultValue: false },
        disabled: { name: "Disabled", type: "boolean", defaultValue: false },
    },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => {
    const [_, updateArgs] = useArgs();

    return (
        <Checkbox {...args} onChange={(checked) => updateArgs({ checked })} />
    );
};

export const Default = Template.bind({});
