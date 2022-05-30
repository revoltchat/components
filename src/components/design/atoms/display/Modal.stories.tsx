import React from "react";
import { useArgs } from "@storybook/client-api";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Modal } from "./Modal";

export default {
    title: "Design System/Atoms/Display/Modal",
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
            defaultValue:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        title: {
            name: "Title",
            type: "string",
            defaultValue: "Modal Title",
        },
        description: {
            name: "Description",
            type: "string",
            defaultValue: "Optional modal description.",
        },
        padding: {
            name: "Padding",
            type: "string",
            defaultValue: undefined,
        },
        maxWidth: {
            name: "Max Width",
            type: "string",
            defaultValue: undefined,
        },
        actions: {
            name: "Actions",
            defaultValue: [
                {
                    children: "OK",
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
            registerOnConfirm={(confirm) => {
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
    description: undefined,
    children: "This modal does not have any actions!",
};
