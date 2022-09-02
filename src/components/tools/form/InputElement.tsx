import { observer } from "mobx-react-lite";
import React from "react";

import {
    Category,
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
export type Type =
    | "text"
    | "checkbox"
    | "colour"
    | "combo"
    | "radio"
    | "textarea"
    | "custom";

/**
 * Get default value
 */
export function emptyValue(type: Type) {
    return type === "custom" ? undefined : type === "checkbox" ? false : "";
}

/**
 * Component props
 */
type Props<T extends Type> = {
    type: T;
    value: Value<T> | (() => Value<T>);
    onChange: (v: Value<T>) => void;
    disabled?: boolean;
} & TypeProps<T>;

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
    custom: { value: never; props: { element: JSX.Element } };
};

/**
 * Actual input value type
 */
export type Value<T extends Type> = Metadata[T]["value"];

/**
 * Additional component props for given input type
 */
export type TypeProps<T extends Type> = Omit<
    Metadata[T]["props"],
    "value" | "onChange"
> & {
    field?: React.ReactChild;
};

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

    let el = null;
    switch (type) {
        case "text": {
            el = (
                <InputBox
                    value={v as string}
                    onChange={(ev) =>
                        onChange(ev.currentTarget.value as Value<T>)
                    }
                    {...props}
                />
            );
            break;
        }
        case "checkbox": {
            el = (
                <Checkbox
                    value={v as boolean}
                    onChange={(value) => onChange(value as Value<T>)}
                    {...props}
                />
            );
            break;
        }
        case "colour": {
            el = (
                <ColourSwatches
                    value={v as string}
                    onChange={(value) => onChange(value as Value<T>)}
                    {...props}
                />
            );
            break;
        }
        case "combo": {
            const { options, ...comboProps } =
                props as unknown as TypeProps<"combo">;

            el = (
                <ComboBox
                    value={v as string}
                    onChange={(ev) =>
                        onChange(ev.currentTarget.value as Value<T>)
                    }
                    {...comboProps}>
                    {options.map((option: Choice) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </ComboBox>
            );
            break;
        }
        case "radio": {
            const { choices } = props as unknown as TypeProps<"radio">;

            el = (
                <Column>
                    {choices.map(({ name, value: choiceValue, ...props }) => (
                        <Radio
                            key={choiceValue}
                            title={name}
                            value={choiceValue === v}
                            onSelect={() => onChange(choiceValue)}
                            {...props}
                        />
                    ))}
                </Column>
            );
            break;
        }
        case "custom": {
            el = (props as unknown as TypeProps<"custom">).element;
            break;
        }
    }

    if (props.field) {
        return (
            <div>
                <Category>{props.field}</Category>
                {el}
            </div>
        );
    }

    return el;
}

/**
 * Generic input element wrapped in MobX observer
 */
export const ObservedInputElement = observer(InputElement);
