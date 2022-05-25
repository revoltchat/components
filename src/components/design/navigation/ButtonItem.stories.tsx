import React from "react";
import { ComponentMeta } from "@storybook/react";

import { ButtonItem } from "./ButtonItem";

export default {
    title: "Design System/Navigation/Button Item",
    component: ButtonItem,
} as ComponentMeta<typeof ButtonItem>;

export const Default = () => <ButtonItem>Button!</ButtonItem>;
