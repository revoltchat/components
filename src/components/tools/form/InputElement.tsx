import React from "react";
import { observer } from "mobx-react-lite";
import {
    Checkbox,
    ColourSwatches,
    Column,
    ComboBox,
    InputBox,
    Radio,
    TextArea,
} from "../../design";

// inputs:
// - checkbox (bool)
// - colour swatches (string)
// - combobox (string)
// - inputbox (string)
// - override (tri-state) [to implement]
// - radio (string)
// - textarea (string) [to implement]

/**
 * Available input types
 */
type Type = "text" | "checkbox" | "colour" | "combo" | "radio" | "textarea";

/**
 * Component props
 */
type Props<T extends Type> = {
    type: T;
    value: Value<T> | (() => Value<T>);
    onChange: (v: Value<T>) => void;
} & Omit<TypeProps<T>, "value" | "onChange">;

/**
 * Multi or single-select choice entry
 */
type Choice = {
    value: string;
    name: React.ReactChild;
};

/**
 * Metadata for different input types
 */
type Metadata = {
    text: { value: string; props: React.ComponentProps<typeof InputBox> };
    checkbox: { value: boolean; props: React.ComponentProps<typeof Checkbox> };
    colour: {
        value: string;
        props: React.ComponentProps<typeof ColourSwatches>;
    };
    combo: {
        value: string;
        props: Omit<React.ComponentProps<typeof ComboBox>, "children"> & {
            options: Choice[];
        };
    };
    radio: {
        value: string;
        props: {
            choices: (Choice &
                Omit<React.ComponentProps<typeof Radio>, "title" | "value">)[];
        };
    };
    textarea: { value: string; props: React.ComponentProps<typeof TextArea> };
};

/**
 * Actual input value type
 */
type Value<T extends Type> = Metadata[T]["value"];

/**
 * Additional component props for given input type
 */
type TypeProps<T extends Type> = Metadata[T]["props"];

/**
 * Generic input element
 */
export function InputElement<T extends Type>({
    type,
    value,
    onChange,
    ...props
}: Props<T>) {
    const v = typeof value === "function" ? value() : value;

    switch (type) {
        case "text": {
            return (
                <InputBox
                    value={v as string}
                    onChange={(ev) =>
                        onChange(ev.currentTarget.value as Value<T>)
                    }
                    {...props}
                />
            );
        }
        case "checkbox": {
            return (
                <Checkbox
                    value={v as boolean}
                    onChange={(value) => onChange(value as Value<T>)}
                    {...props}
                />
            );
        }
        case "colour": {
            return (
                <ColourSwatches
                    value={v as string}
                    onChange={(value) => onChange(value as Value<T>)}
                    {...props}
                />
            );
        }
        case "combo": {
            const { options, ...comboProps } =
                props as unknown as TypeProps<"combo">;

            return (
                <ComboBox
                    value={v as string}
                    onChange={(ev) =>
                        onChange(ev.currentTarget.value as Value<T>)
                    }
                    {...comboProps}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </ComboBox>
            );
        }
        case "radio": {
            const { choices } = props as unknown as TypeProps<"radio">;

            return (
                <Column>
                    {choices.map(({ name, value: choiceValue, ...props }) => {
                        <Radio
                            title={name}
                            value={choiceValue === v}
                            {...props}
                        />;
                    })}
                </Column>
            );
        }
    }

    return null;
}

/**
 * Generic input element wrapped in MobX observer
 */
export const ObservedInputElement = observer(InputElement);
