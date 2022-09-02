import { observable } from "mobx";
import React, { useCallback, useMemo, useState } from "react";

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
    const values = useMemo(
        () => observable(getInitialValues(props.schema, props.defaults)),
        [],
    );
    const [error, setError] = useState<string>(null!);
    const [processing, setProcessing] = useState(false);
    const Text = useText();

    const onSubmit = useCallback(async () => {
        try {
            setProcessing(true);
            await props.callback(values);
            return true;
        } catch (err) {
            // ! FIXME: map error correctly
            setError("" + err);
            setProcessing(false);
            return false;
        }
    }, []);

    return (
        <Modal
            {...props}
            disabled={processing}
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
            <Form {...props} observed={values} />
            {error && (
                <Category>
                    <Error error={<Text id={error} children={error} />} />
                </Category>
            )}
        </Modal>
    );
}
