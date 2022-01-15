import { themes } from "@storybook/theming";

import "../src/styles/dark.css";
import "../src/styles/light.css";
import "../src/styles/common.css";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    darkMode: {
        classTarget: "html",
        stylePreview: true,
        // Override the default dark theme
        dark: { ...themes.dark },
        // Override the default light theme
        light: { ...themes.normal },
    },
};
