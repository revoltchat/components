import { useArgs } from "@storybook/client-api";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Modal } from "./Modal";

export default {
    title: "Design System/Atoms/Layout/Modal",
    component: Modal,
    argTypes: {
        open: {
            name: "Open",
            type: "boolean",
            defaultValue: true,
        },
        children: {
            name: "Content",
            type: "string",
            defaultValue: "I am a modal.",
        },
        padding: {
            name: "Padding",
            type: "string",
            defaultValue: undefined,
        },
        actions: {
            name: "Actions",
            defaultValue: [
                {
                    children: "Ok",
                    palette: "accent",
                    confirmation: true,
                },
                {
                    children: "Cancel",
                    palette: "plain",
                },
            ],
        },
        transparent: {
            name: "Transparent",
            type: "boolean",
            defaultValue: false,
        },
        disabled: {
            name: "Disabled",
            type: "boolean",
            defaultValue: false,
        },
        nonDismissable: {
            name: "Non-dismissable",
            type: "boolean",
            defaultValue: false,
        },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
    const [_, updateArgs] = useArgs();
    if (!(args as any).open) return <></>;
    return (
        <Modal
            {...args}
            onClose={() => updateArgs({ open: false })}
            registerOnClose={(close) => {
                const onKeyUp = (e: KeyboardEvent) =>
                    e.key === "Escape" && close();

                document.addEventListener("keyup", onKeyUp);
                return () => document.removeEventListener("keyup", onKeyUp);
            }}
            registerOnConfirm={(confirm, close) => {
                const onKeyUp = (e: KeyboardEvent) => {
                    if (e.key === "Enter") {
                        confirm();
                        updateArgs({ disabled: true });
                        setTimeout(close, 1000);
                    }
                };

                document.addEventListener("keyup", onKeyUp);
                return () => document.removeEventListener("keyup", onKeyUp);
            }}
        />
    );
};

// const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Default = Template.bind({});

export const NoActions = Template.bind({});

NoActions.args = {
    actions: undefined,
};
