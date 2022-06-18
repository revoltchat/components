import { observer } from "mobx-react-lite";
import React from "react";
import type { Message as MessageType } from "revolt.js";
import styled, { css } from "styled-components";
import { Avatar } from "../atoms";
import { Info } from "./Info";

export interface Props {
    /**
     * Message
     */
    message: MessageType;

    /**
     * Whether this component is the head
     */
    head?: boolean;
}

const Wrapper = styled.div<Pick<Props, "head">>`
    display: flex;
    flex-direction: column;

    ${(props) =>
        props.head &&
        css`
            padding-top: 14px;
        `}
`;

const MessageEl = styled.div`
    display: flex;
    line-height: 18px;

    // Make time sent and edited components uniform
    time {
        font-size: 10px;
        color: var(--tertiary-foreground);
    }
`;

const Tail = styled.div`
    width: 62px;
    display: flex;
    justify-content: center;
`;

const Content = styled.div`
    font-size: 14px;
    color: var(--foreground);

    display: flex;
    flex-direction: column;
`;

const Head = styled.div`
    gap: 6px;
    display: flex;

    // Username
    span {
        font-weight: 600;
    }
`;

export const Message = observer(({ message, head }: Props) => {
    return (
        <Wrapper head={head}>
            <MessageEl>
                <Tail>
                    {head ? (
                        <Avatar
                            size={36}
                            src={message.author?.generateAvatarURL({
                                max_side: 256,
                            })}
                            interactive
                        />
                    ) : (
                        <Info message={message} head={head} />
                    )}
                </Tail>
                <Content>
                    {head && (
                        <Head>
                            <span>{message.author?.username}</span>
                            <Info message={message} head={head} />
                        </Head>
                    )}
                    <span>content</span>
                </Content>
            </MessageEl>
        </Wrapper>
    );
});
