import React from "react";
import { observer } from "mobx-react-lite";
import { InputBox } from "../../design";
import { Checkbox } from "../../../../lib/components/atoms/inputs/Checkbox";

// inputs:
// - checkbox (bool)
// - colour swatches (string)
// - combobox (string)
// - inputbox (string)
// - override (tri-state)
// - radio (string)
// - textarea (string)

/**
 * Available input types
 */
type Type = "text" | "checkbox";

/**
 * Component props
 */
type Props<T extends Type> = {
    type: T;
    value: Value<T> | (() => Value<T>);
    onChange: (v: Value<T>) => void;
} & Omit<TypeProps<T>, "value" | "onChange">;

/**
 * Metadata for different input types
 */
type TypeMetadata<T extends Type> = T extends "checkbox"
    ? { value: boolean; component: typeof Checkbox }
    : { value: string; component: typeof InputBox };

/**
 * Actual input value type
 */
type Value<T extends Type> = TypeMetadata<T>["value"];

/**
 * Additional component props for given input type
 */
type TypeProps<T extends Type> = React.ComponentProps<
    TypeMetadata<T>["component"]
>;

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
    }

    return null;
}

/**
 * Generic input element wrapped in MobX observer
 */
export const ObservedInputElement = observer(InputElement);
