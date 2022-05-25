import { observer } from "mobx-react-lite";
import React, { ReactNode } from "react";
import { Server } from "revolt-api";
import styled from "styled-components";
import { ClientServer } from "../../../../../lib/types";
import { DraggableProps } from "../../../../common";

import { Avatar } from "../../../atoms";
import { Unreads } from "../../../atoms/indicators/Unreads";
import { Swoosh } from "./Swoosh";

const Container = styled.div`
    width: 56px;
    padding-left: 7px;
    padding-bottom: 6px;
`;

const SwooshWrapper = styled.div`
    position: absolute;
    left: -7px;
    top: -32px;

    z-index: -1;
`;

const Inner = observer(({ item, linkComponent: LinkComponent }: InnerProps) => {
    const unread = item.unread;
    const count = item.mentions.length;

    return (
        <LinkComponent id={item._id}>
            <Avatar
                size={42}
                fallback={item.name}
                holepunch={(unread || count > 0) && "top-right"}
                overlay={<Unreads unread={unread} count={count} />}
            />
        </LinkComponent>
    );
});

export type InnerProps = {
    item: ClientServer;
    linkComponent: React.FC<{ id: string; children: ReactNode }>;
};

type Props = DraggableProps<ClientServer> &
    Pick<InnerProps, "linkComponent"> & {
        active: boolean;
    };

export function Item({ provided, isDragging, active, ...innerProps }: Props) {
    return (
        <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={provided.draggableProps.style}>
            <div style={{ position: "relative" }}>
                {active && (
                    <SwooshWrapper>
                        <Swoosh />
                    </SwooshWrapper>
                )}
            </div>
            <Inner {...innerProps} />
        </Container>
    );
}
