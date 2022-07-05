import { observable } from "mobx";
import React, { useMemo } from "react";
import styled from "styled-components";
import { Column } from "../../design";
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
type MapFormToValues<T extends FormTemplate> = {
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
interface Props<T extends FormTemplate> {
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
}

/**
 * Get initial values to use for the form data
 * @param schema Schema to use
 * @param defaults Defaults to apply
 * @returns Initial values
 */
function getInitialValues<T extends FormTemplate>(
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
 * Render the form as a column using <form> tag
 */
const Base = styled.form(Column);

/**
 * Dynamic Form component
 */
export function Form<T extends FormTemplate>({
    schema,
    data,
    onChange,
    onSubmit,
    observed,
    defaults,
}: Props<T>) {
    const keys = useMemo(() => Object.keys(schema), []);
    const values = observed ?? observable(getInitialValues(schema, defaults));

    return (
        <Base>
            {keys.map((key) => (
                <ObservedInputElement
                    key={key}
                    type={schema[key]}
                    value={() =>
                        values[key] as Value<typeof schema[typeof key]>
                    }
                    onChange={(value) => {
                        values[key as keyof typeof values] = value;
                        onChange?.(values, key);
                    }}
                    {...data[key]}
                />
            ))}
            {/*onSubmit && <Button type="submit" children="Submit" />*/}
        </Base>
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
