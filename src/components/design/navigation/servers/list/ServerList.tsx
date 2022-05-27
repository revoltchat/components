import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Virtuoso } from "react-virtuoso";
import React, { useState } from "react";
import styled from "styled-components";
import { Item, ItemContainer } from "./Item";

import { ListHeader } from "./ListHeader";
import { ListFooter } from "./ListFooter";
import { useDragEndReorder, useDndComponents } from "../../../../common";

import type { Client } from "revolt.js";
import type { INotificationChecker } from "revolt.js/dist/util/Unreads";
import { Avatar } from "../../../atoms";
import { Cog } from "@styled-icons/boxicons-solid";
import { useLink } from "../../../../../lib/context";
import { Tooltip } from "../../../atoms/indicators/Tooltip";

export type Props = {
    /**
     * Client handle
     */
    client: Client;

    /**
     * Function to generate home URL
     */
    home: () => string;

    /**
     * Check whether a channel or server is muted
     */
    permit: INotificationChecker;

    /**
     * Active server ID
     */
    active?: string;
};

const Base = styled.div`
    width: 56px;
    display: flex;
    flex-direction: column;

    .list {
        flex-grow: 1;
        scrollbar-width: none;
    }

    .list::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
`;

const Shadow = styled.div`
    height: 0;
    z-index: 1;
    display: relative;

    div {
        height: 12px;
        margin-top: -12px;
        display: absolute;
        background: linear-gradient(to bottom, transparent, var(--background));
    }
`;

/**
 * Server List
 */
export function ServerList(props: Props) {
    const { active, client } = props;
    const [items, setItems] = useState([...client.servers.values()]);

    const Link = useLink();

    return (
        <Base>
            <DragDropContext onDragEnd={useDragEndReorder(setItems)}>
                <Droppable
                    droppableId="droppable"
                    mode="virtual"
                    renderClone={(provided, snapshot, rubric) => (
                        <Item
                            active={false}
                            provided={provided}
                            isDragging={snapshot.isDragging}
                            item={items[rubric.source.index]}
                        />
                    )}>
                    {(provided) => {
                        return (
                            <Virtuoso
                                totalCount={items.length + 2}
                                components={useDndComponents()}
                                className="list"
                                // @ts-expect-error Incompatible types between libraries
                                scrollerRef={provided.innerRef}
                                itemContent={(index) => {
                                    if (index === 0) {
                                        return <ListHeader {...props} />;
                                    }

                                    if (index === items.length + 1) {
                                        return <ListFooter />;
                                    }

                                    const item = items[index - 1];

                                    return (
                                        <Draggable
                                            draggableId={item._id}
                                            index={index - 1}
                                            key={item._id}>
                                            {(provided) => (
                                                <Item
                                                    item={item}
                                                    active={item._id === active}
                                                    isDragging={false}
                                                    provided={provided}
                                                />
                                            )}
                                        </Draggable>
                                    );
                                }}
                            />
                        );
                    }}
                </Droppable>
            </DragDropContext>
            <Shadow>
                <div />
            </Shadow>
            <ItemContainer head>
                <Link to="/settings">
                    <Tooltip i18n="app.settings.title" div right>
                        <Avatar
                            size={42}
                            fallback={<Cog size={18} />}
                            interactive
                        />
                    </Tooltip>
                </Link>
            </ItemContainer>
        </Base>
    );
}
