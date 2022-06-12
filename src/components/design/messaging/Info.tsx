import React from "react";
import { observer } from "mobx-react-lite";
import { Props } from "./Message";

export const Info = observer(({ message, head }: Props) => {
    if (head) {
        return (
            <>
                <time>Today at 19:00</time>
                {message.edited && <time>(edited)</time>}
            </>
        );
    } else {
        if (message.edited) {
            return <time>(edited)</time>;
        } else {
            return <time>format</time>;
        }
    }
});
