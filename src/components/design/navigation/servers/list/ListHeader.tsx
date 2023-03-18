import { observer } from "mobx-react-lite";
import React from "react";
import type { Channel } from "revolt.js";
import styled from "styled-components";

import { useLink, useTrigger } from "../../../../../lib/context";
import { isTouchscreenDevice } from "../../../../../lib/isTouchscreenDevice";

import { Avatar, LineDivider, UserStatus } from "../../../atoms";
import { Tooltip } from "../../../atoms/indicators/Tooltip";
import { Unreads } from "../../../atoms/indicators/Unreads";
import { UserTooltip } from "../../../atoms/indicators/UserTooltip";
import { ItemContainer, SwooshOverlay } from "./Item";
import { Props } from "./ServerList";

const UserItem = observer(({ client, home, active }: Props) => {
    const Link = useLink();
    const Trigger = useTrigger();

    // Count incoming friend requests, but don't display this on mobile.
    const alertCount = isTouchscreenDevice
        ? 0
        : [...client.users.values()].filter(
              (x) => x.relationship === "Incoming",
          ).length;

    return (
        <Link to={home()}>
            {!active && <SwooshOverlay />}
            <UserTooltip user={client.user!} div right>
                <Trigger id="Status">
                    <Avatar
                        src={client.user!.generateAvatarURL(
                            {
                                max_side: 256,
                            },
                            false,
                        )}
                        size={42}
                        interactive
                        holepunch={alertCount ? "right" : "bottom-right"}
                        overlay={
                            <>
                                <Unreads
                                    count={alertCount}
                                    unread={alertCount > 0}
                                />
                                <UserStatus user={client.user!} />
                            </>
                        }
                    />
                </Trigger>
            </UserTooltip>
        </Link>
    );
});

const List = styled.div`
    gap: 12px;
    display: flex;
    margin-top: 8px;
    margin-bottom: 12px;
    flex-direction: column;
`;

const ChannelInner = observer(
    ({
        channel,
        permit,
    }: {
        channel: Channel;
    } & Pick<Props, "permit">) => {
        const unread = channel.isUnread(permit);
        const count = channel.getMentions(permit).length;

        return (
            <Tooltip
                content={channel.name ?? channel.recipient?.username}
                div
                right>
                <Avatar
                    size={42}
                    interactive
                    fallback={channel.name}
                    holepunch={unread && "top-right"}
                    src={channel.generateIconURL({ max_side: 256 }, false)}
                    overlay={<Unreads unread={unread} count={count} />}
                />
            </Tooltip>
        );
    },
);

const UnreadDMs = observer(({ client, permit }: Props) => {
    const Link = useLink();

    const channels = [...client.channels.values()].filter(
        (x) =>
            ((x.channel_type === "DirectMessage" && x.active) ||
                x.channel_type === "Group") &&
            x.unread,
    );

    if (channels.length === 0) return null;

    return (
        <List>
            {channels.map((channel) => (
                <Link key={channel._id} to={`/channel/${channel._id}`}>
                    <ChannelInner channel={channel} permit={permit} />
                </Link>
            ))}
        </List>
    );
});

export function ListHeader(props: Props) {
    return (
        <ItemContainer head>
            <UserItem {...props} />
            <UnreadDMs {...props} />
            <LineDivider compact />
        </ItemContainer>
    );
}
