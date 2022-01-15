import { Check, CloudUpload } from "@styled-icons/boxicons-regular";
import { Pencil } from "@styled-icons/boxicons-solid";
import styled from "styled-components/macro";

const Base = styled.div`
    gap: 4px;
    padding: 4px;
    display: flex;

    align-items: center;
    color: var(--foreground);
    text-transform: capitalize;
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
