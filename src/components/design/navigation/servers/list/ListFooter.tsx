import { Plus } from "@styled-icons/boxicons-regular";
import { Compass } from "@styled-icons/boxicons-solid";
import React from "react";
import { Avatar } from "../../../atoms";

import { ItemContainer } from "./Item";
import { Props } from "./ServerList";

export function ListFooter({
    linkComponent: LinkComponent,
}: Pick<Props, "linkComponent">) {
    return (
        <>
            <LinkComponent url="/create">
                <ItemContainer>
                    <Avatar
                        size={42}
                        fallback={<Plus color="var(--accent)" size={24} />}
                        interactive
                    />
                </ItemContainer>
            </LinkComponent>
            <LinkComponent url="/discover">
                <ItemContainer>
                    <Avatar
                        size={42}
                        fallback={<Compass color="var(--accent)" size={24} />}
                        interactive
                    />
                </ItemContainer>
            </LinkComponent>
        </>
    );
}
