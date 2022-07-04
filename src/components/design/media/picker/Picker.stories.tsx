import React, { memo } from "react";
import { Picker } from "./Picker";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { emojiDictionary, parseEmoji } from "../../../../lib/internal/emojis";

export default {
    title: "Design System/Media/Picker",
    component: Picker,
    argTypes: {
        emojis: {
            name: "Emoji Dictionary",
            defaultValue: Object.keys(emojiDictionary),
        },
        renderEmoji: {
            name: "Emoji Component",
            type: "symbol",
            defaultValue: memo(({ emoji }: { emoji: string }) => (
                <img
                    src={parseEmoji(
                        emojiDictionary[emoji as keyof typeof emojiDictionary],
                    )}
                />
            )),
        },
    },
    decorators: [],
} as ComponentMeta<typeof Picker>;

const Template: ComponentStory<typeof Picker> = (args) => (
    <div
        style={{
            width: "100%",
            height: "75vh",
            display: "flex",
            flexDirection: "column",
        }}>
        <div
            style={{
                background: "var(--primary-background)",
                flexGrow: 1,
            }}></div>
        <div style={{ position: "relative" }}>
            <Picker {...args} />
        </div>
        <div
            style={{
                height: "48px",
                background: "var(--message-box)",
                flexShrink: 0,
            }}></div>
    </div>
);

export const Default = Template.bind({});
