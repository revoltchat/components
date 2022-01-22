import React from "react";
import styled from "styled-components";
import { Pencil } from "@styled-icons/boxicons-solid";
import { Check, CloudUpload } from "@styled-icons/boxicons-regular";

const Base = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px;
    font-weight: 500;
    color: var(--foreground);
    text-transform: capitalize;
    user-select: none;
`;

export type EditStatus = "saved" | "editing" | "saving";
interface Props {
    status: EditStatus;
}

export function SaveStatus({ status }: Props) {
    return (
        <Base>
            {status === "saved" ? (
                <Check size={20} />
            ) : status === "editing" ? (
                <Pencil size={20} />
            ) : (
                <CloudUpload size={20} />
            )}
            {/* FIXME: add i18n */}
            <span>{status}</span>
        </Base>
    );
}
