import { Cog } from "@styled-icons/boxicons-solid";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Virtuoso } from "react-virtuoso";
import type { Client, Server } from "revolt.js";
import type { INotificationChecker } from "revolt.js/dist/util/Unreads";
import styled, { css } from "styled-components";

import { isTouchscreenDevice } from "../../../../../lib";
import { useLink } from "../../../../../lib/context";

import { useDndComponents, useDragEndCustomReorder } from "../../../../common";

import { Avatar } from "../../../atoms";
import { Tooltip } from "../../../atoms/indicators/Tooltip";
import { Item, ItemContainer } from "./Item";
import { FooterProps, ListFooter } from "./ListFooter";
import { ListHeader } from "./ListHeader";

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

    /**
     * Whether to show discovery icon
     */
    showDiscovery?: boolean;
};

type ParentProps = {
    /**
     * Server ordering
     */
    servers: Server[];

    /**
     * Reordering function
     */
    reorder: (source: number, dest: number) => void;
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

    ${isTouchscreenDevice &&
    css`
        padding-bottom: 50px;
    `}
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
export function ServerList(props: Props & ParentProps & FooterProps) {
    const { active, permit } = props;
    const { servers, reorder, createServer, showDiscovery, ...innerProps } =
        props;

    const Link = useLink();
    const dndComponents = useDndComponents();

    return (
        <Base>
            {/* @ts-expect-error cope */}
            <DragDropContext onDragEnd={useDragEndCustomReorder(reorder)}>
                {/* @ts-expect-error cope */}
                <Droppable
                    droppableId="droppable"
                    mode="virtual"
                    renderClone={(provided, snapshot, rubric) => (
                        <Item
                            active={false}
                            permit={permit}
                            provided={provided}
                            isDragging={snapshot.isDragging}
                            item={servers[rubric.source.index]}
                        />
                    )}>
                    {(provided) => {
                        return (
                            <Virtuoso
                                totalCount={servers.length + 2}
                                // @ts-expect-error I have no clue what's going on here lol
                                components={dndComponents}
                                className="list"
                                // @ts-expect-error Incompatible types between libraries
                                scrollerRef={provided.innerRef}
                                itemContent={(index) => {
                                    if (index === 0) {
                                        return <ListHeader {...innerProps} />;
                                    }

                                    if (index === servers.length + 1) {
                                        return (
                                            <ListFooter
                                                createServer={createServer}
                                                showDiscover={showDiscovery}
                                            />
                                        );
                                    }

                                    const item = servers[index - 1];

                                    return (
                                        // @ts-expect-error cope
                                        <Draggable
                                            draggableId={item._id}
                                            index={index - 1}
                                            key={item._id}>
                                            {(provided) => (
                                                <Item
                                                    item={item}
                                                    permit={permit}
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
