import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Virtuoso } from "react-virtuoso";
import React, { useState } from "react";
import styled from "styled-components";
import { InnerProps, Item } from "./Item";

import { ClientServer } from "../../../../../lib/types";
import { useDragEndReorder, useDndComponents } from "../../../../common";

export type Props = Pick<InnerProps, "linkComponent"> & {
    active: string;
    servers: ClientServer[];
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

/**
 * Server List
 */
export function ServerList({ active, servers, linkComponent }: Props) {
    const [items, setItems] = useState(servers);

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
                            linkComponent={linkComponent}
                            isDragging={snapshot.isDragging}
                            item={items[rubric.source.index]}
                        />
                    )}>
                    {(provided) => {
                        return (
                            <Virtuoso
                                data={items}
                                components={useDndComponents()}
                                className="list"
                                // @ts-expect-error Incompatible types between libraries
                                scrollerRef={provided.innerRef}
                                itemContent={(index, item) => {
                                    return (
                                        <Draggable
                                            draggableId={item._id}
                                            index={index}
                                            key={item._id}>
                                            {(provided) => (
                                                <Item
                                                    item={item}
                                                    active={item._id === active}
                                                    isDragging={false}
                                                    provided={provided}
                                                    linkComponent={
                                                        linkComponent
                                                    }
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
        </Base>
    );
}
