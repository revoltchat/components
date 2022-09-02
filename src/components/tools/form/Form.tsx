import { observable } from "mobx";
import React, { createContext, useCallback, useContext, useMemo } from "react";

import { Button, Column } from "../../design";
import {
    emptyValue,
    ObservedInputElement,
    Type,
    TypeProps,
    Value,
} from "./InputElement";

/**
 * Form schema
 */
export type FormTemplate = Record<string, Type>;

/**
 * Generate value object from form schema
 */
export type MapFormToValues<T extends FormTemplate> = {
    [Property in keyof T]: Value<T[Property]>;
};

/**
 * Generate data object from form schema
 */
type MapFormToData<T extends FormTemplate> = {
    [Property in keyof T]: TypeProps<T[Property]>;
};

/**
 * Form props
 */
export interface Props<T extends FormTemplate> {
    /**
     * Form schema
     */
    schema: T;

    /**
     * Props required for rendering form elements
     */
    data: MapFormToData<T>;

    /**
     * Handle changes to the data
     */
    onChange?: (data: MapFormToValues<T>, key: keyof T) => void;

    /**
     * Handle form submission
     */
    onSubmit?: (data: MapFormToValues<T>) => void;

    /**
     * Provide an observable object of values
     */
    observed?: MapFormToValues<T>;

    /**
     * Provide default values for keys
     */
    defaults?: Partial<MapFormToValues<T>>;

    /**
     * Submit button properties
     */
    submitBtn?: Omit<React.ComponentProps<typeof Button>, "type">;

    /**
     * Whether all elements are disabled
     */
    disabled?: boolean;

    /**
     * Custom form layout
     */
    children?: React.ReactNode;
}

/**
 * Get initial values to use for the form data
 * @param schema Schema to use
 * @param defaults Defaults to apply
 * @returns Initial values
 */
export function getInitialValues<T extends FormTemplate>(
    schema: T,
    defaults?: Partial<MapFormToValues<T>>,
) {
    const values: Partial<MapFormToValues<T>> = {};

    Object.keys(schema).forEach(
        (key) =>
            (values[key as keyof typeof values] =
                defaults?.[key] ?? emptyValue(schema[key])),
    );

    return values as MapFormToValues<T>;
}

/**
 * Context providing form data
 */
const FormContext = createContext<
    Pick<Props<any>, "schema" | "disabled" | "onChange" | "data"> & {
        values: Record<string, any>;
    }
>(null!);

/**
 * Form element
 */
export function FormElement({ id }: { id: string }) {
    const { schema, disabled, values, onChange, data } =
        useContext(FormContext);

    return (
        <ObservedInputElement
            type={schema[id]}
            disabled={disabled}
            value={() => values[id] as Value<typeof schema[typeof id]>}
            onChange={(value) => {
                values[id as keyof typeof values] = value;
                onChange?.(values, id);
            }}
            {...data[id]}
        />
    );
}

/**
 * Dynamic Form component
 */
export function Form<T extends FormTemplate>({
    schema,
    data,
    disabled,
    onChange,
    onSubmit,
    observed,
    defaults,
    submitBtn,
    children,
}: Props<T>) {
    const keys = useMemo(() => Object.keys(schema), []);
    const values = useMemo(
        () => observed ?? observable(getInitialValues(schema, defaults)),
        [],
    );

    const submit = useCallback(
        (ev: React.FormEvent) => {
            ev.preventDefault();
            onSubmit?.(values);
        },
        [onSubmit],
    );

    return (
        <form onSubmit={submit}>
            <Column>
                <FormContext.Provider
                    value={{ schema, disabled, values, onChange, data } as any}>
                    {children ??
                        keys.map((key) => <FormElement key={key} id={key} />)}
                </FormContext.Provider>
                {submitBtn && (
                    <Button
                        type="submit"
                        children="Submit"
                        disabled={disabled}
                        {...submitBtn}
                    />
                )}
            </Column>
        </form>
    );
}

/**
 * Example on using <Form />:
    function test() {
        return (
            <Form
                schema={{
                    test: "checkbox",
                }}
                data={{
                    test: {
                        title: "this is my checkbox",
                        description: "oh yeah",
                    },
                }}
                onChange={(v, key) => {
                    if (key === "test") {
                        console.log("test changed!");
                    }
                }}
                onSubmit={(v) => {
                    v.test;
                }}
            />
        );
    }
*/
