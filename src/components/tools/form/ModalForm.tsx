import { observable } from "mobx";
import React, { useCallback, useRef, useState } from "react";
import { useText } from "../../../lib";
import { Button, Category, Error, Modal } from "../../design";
import { Action, Props as ModalProps } from "../../design/atoms/display/Modal";
import {
    Form,
    FormTemplate,
    getInitialValues,
    MapFormToValues,
    Props as FormProps,
} from "./Form";

/**
 * Modal Form props
 */
type Props<T extends FormTemplate> = Exclude<
    ModalProps,
    "children" | "actions" | "registerOnClose" | "registerOnConfirm"
> &
    Omit<FormProps<T>, "observed" | "onChange" | "onSubmit"> & {
        /**
         * Form submission callback
         */
        callback: (values: MapFormToValues<T>) => Promise<void>;

        /**
         * Submit button properties
         */
        submit?: Omit<React.ComponentProps<typeof Button>, "type">;

        /**
         * Custom actions after submit button
         */
        actions?: Action[];
    };

/**
 * Modal Form
 */
export function ModalForm<T extends FormTemplate>(props: Props<T>) {
    const values = observable(getInitialValues(props.schema, props.defaults));
    const [error, setError] = useState<string>(null!);
    const confirm = useRef<() => void>();
    const Text = useText();

    // Handle submission
    const onSubmit = useCallback(async () => {
        try {
            await props.callback(values);
            return true;
        } catch (err) {
            // ! FIXME: map error correctly
            setError("" + err);
            return false;
        }
    }, []);

    // Handle form submit event
    const onSubmitForm = useCallback(() => confirm.current?.(), []);

    return (
        <Modal
            {...props}
            registerOnConfirm={(fn) => {
                confirm.current = fn;
                return () => {};
            }}
            actions={[
                {
                    onClick: onSubmit,
                    children: "Submit",
                    confirmation: true,
                    ...props.submit,
                },
                ...(props.actions ?? [
                    {
                        onClick: () => true,
                        children: "Cancel",
                        palette: "plain",
                    },
                ]),
            ]}>
            <Form {...props} onSubmit={onSubmitForm} observed={values} />
            {error && (
                <Category>
                    <Error error={<Text id={error} children={error} />} />
                </Category>
            )}
        </Modal>
    );
}
