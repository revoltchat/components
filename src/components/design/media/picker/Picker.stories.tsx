import React, { memo } from "react";
import { Picker } from "./Picker";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { emojiDictionary, parseEmoji } from "../../../../lib/internal/emojis";
import { InjectMockClient } from "../../../../lib/internal";
import { Server } from "revolt.js";

export default {
    title: "Design System/Media/Picker",
    component: Picker,
    argTypes: {
        emojis: {
            name: "Emoji Dictionary",
            defaultValue: {
                a: ["0", "0", "0", "0", "0"],
                default: Object.keys(emojiDictionary),
            },
        },
        categories: {
            name: "Categories",
            type: "symbol",
        },
        renderEmoji: {
            name: "Emoji Component",
            type: "symbol",
            defaultValue: memo(({ emoji }: { emoji: string }) => (
                <img
                    src={
                        emoji === "0"
                            ? "https://autumn.revolt.chat/attachments/fTs2qDi4ix0i_BDzJ-WwX2Hgvbr5KRL47dMKyD13Je/image.png"
                            : parseEmoji(
                                  emojiDictionary[
                                      emoji as keyof typeof emojiDictionary
                                  ],
                              )
                    }
                />
            )),
        },
    },
    decorators: [],
} as ComponentMeta<typeof Picker>;

const Template: ComponentStory<typeof Picker> = (args) => (
    <InjectMockClient>
        {({ client }) => (
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
                    <Picker
                        {...args}
                        categories={[
                            {
                                id: "a",
                                name: "My Server",
                                iconURL: (
                                    client.servers.values().next()
                                        .value as Server
                                ).generateIconURL(),
                            },
                            {
                                id: "default",
                                name: "Default",
                                emoji: "smiley",
                            },
                        ]}
                    />
                </div>
                <div
                    style={{
                        height: "48px",
                        background: "var(--message-box)",
                        flexShrink: 0,
                    }}></div>
            </div>
        )}
    </InjectMockClient>
);

export const Default = Template.bind({});
