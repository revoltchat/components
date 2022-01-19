import { ChevronRight, LinkExternal } from "@styled-icons/boxicons-regular";
import styled, { css } from "styled-components";

interface BaseProps {
    // ! FIXME: Use Pick<>
    // figure out wtf largeDesc and hover are
    readonly hover?: boolean;
    readonly account?: boolean;
    readonly disabled?: boolean;
    readonly largeDescription?: boolean;
}

const Base = styled.div<BaseProps>`
    // ! FIXME: clean up CSS
    padding: 9.8px 12px;
    border-radius: var(--border-radius);
    margin-bottom: 10px;
    color: var(--foreground);
    background: var(--secondary-header);
    gap: 12px;
    display: flex;
    align-items: center;
    flex-direction: row;

    > svg {
        flex-shrink: 0;
    }

    .content {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        font-weight: 600;
        font-size: 14px;

        .title {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }

        .description {
            ${(props) =>
                props.largeDescription
                    ? css`
                          font-size: 14px;
                      `
                    : css`
                          font-size: 11px;
                      `}

            font-weight: 400;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;

            a:hover {
                text-decoration: underline;
            }
        }
    }

    ${(props) =>
        props.hover &&
        css`
            cursor: pointer;
            opacity: 1;
            transition: 0.1s ease background-color;

            &:hover {
                background: var(--secondary-background);
            }
        `}

    ${(props) =>
        props.disabled &&
        css`
            opacity: 0.4;
            /*.content,
            .action {
                color: var(--tertiary-foreground);
            }*/

            .action {
                font-size: 14px;
            }
        `}
    
    ${(props) =>
        props.account &&
        css`
            height: 54px;

            .content {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                .title {
                    text-transform: uppercase;
                    font-size: 12px;
                    color: var(--secondary-foreground);
                }

                .description {
                    font-size: 15px;

                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
            }
        `}
`;

export interface Props extends BaseProps {
    readonly icon?: React.ReactChild;
    readonly children?: React.ReactChild;
    readonly description?: React.ReactChild;

    readonly onClick?: () => void;
    readonly action?: "chevron" | "external" | React.ReactChild;
}

export function CategoryButton({
    icon,
    children,
    description,
    account,
    disabled,
    onClick,
    hover,
    action,
}: Props) {
    return (
        <Base
            hover={hover || typeof onClick !== "undefined"}
            onClick={onClick}
            disabled={disabled}
            account={account}>
            {icon}
            <div className="content">
                <div className="title">{children}</div>

                <div className="description">{description}</div>
            </div>
            <div className="action">
                {typeof action === "string" ? (
                    action === "chevron" ? (
                        <ChevronRight size={24} />
                    ) : (
                        <LinkExternal size={20} />
                    )
                ) : (
                    action
                )}
            </div>
        </Base>
    );
}
