import { Server } from "revolt-api";

export type ClientServer = Server & {
    get unread(): boolean;
    get mentions(): string[];
}