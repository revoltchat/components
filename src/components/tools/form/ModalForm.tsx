import { observable } from "mobx";
import React, { useCallback, useMemo, useState } from "react";
import { useText } from "../../../lib";
import { Category, Error, Modal } from "../../design";
import { Props as ModalProps } from "../../design/atoms/display/Modal";
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
    "children" | "actions"
> &
    Omit<FormProps<T>, "observed" | "onChange" | "onSubmit"> & {
        callback: (values: MapFormToValues<T>) => Promise<void>;
    };

/**
 * Modal Form
 */
export function ModalForm<T extends FormTemplate>(props: Props<T>) {
    const values = observable(getInitialValues(props.schema, props.defaults));
    const [error, setError] = useState<string>(null!);
    const Text = useText();

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

    return (
        <Modal
            {...props}
            actions={[
                {
                    onClick: onSubmit,
                    children: "Submit",
                },
                {
                    onClick: () => true,
                    children: "Cancel",
                    palette: "plain",
                },
            ]}>
            {error && (
                <Category>
                    <Error error={<Text id={error} children={error} />} />
                </Category>
            )}
            <Form {...props} onSubmit={onSubmit} observed={values} />
        </Modal>
    );
}
