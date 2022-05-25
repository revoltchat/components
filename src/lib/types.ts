import { Channel, Server } from "revolt-api";

export interface INotificationChecker {
    isMuted(target?: Channel | Server): boolean;
}

export type ClientServer = Server & {
    isUnread(permit?: INotificationChecker): boolean;
    getMentions(permit?: INotificationChecker): string[];
};
