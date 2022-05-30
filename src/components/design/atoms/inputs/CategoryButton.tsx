import React from "react";
import styled, { css } from "styled-components";
import { ChevronRight, LinkExternal } from "@styled-icons/boxicons-regular";

interface BaseProps {
    // ! FIXME: Use Pick<>
    // figure out wtf largeDesc and hover are
    readonly account?: boolean;
    readonly disabled?: boolean;
    readonly largeDescription?: boolean;
}

const Base = styled.a<BaseProps>`
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
        font-size: 0.875rem;

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
                          font-size: 0.875rem;
                      `
                    : css`
                          font-size: 0.6875rem;
                      `}

            font-weight: 400;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            color: var(--secondary-foreground);

            a:hover {
                text-decoration: underline;
            }
        }
    }

    ${(props) =>
        props.disabled
            ? css`
                  opacity: 0.4;
                  /*.content,
            .action {
                color: var(--tertiary-foreground);
            }*/

                  .action {
                      font-size: 0.875rem;
                  }
              `
            : css`
                  cursor: pointer;
                  opacity: 1;
                  transition: 0.1s ease background-color;

                  &:hover {
                      background: var(--secondary-background);
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
                    font-size: 0.75rem;
                    color: var(--secondary-foreground);
                }

                .description {
                    font-size: 0.9375rem;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
            }
        `}
`;

export interface Props extends BaseProps {
    readonly icon?: React.ReactNode;
    readonly children?: React.ReactNode;
    readonly description?: React.ReactNode;

    readonly onClick?: () => void;
    readonly action?: "chevron" | "external" | React.ReactNode;
}

export function CategoryButton({
    icon,
    children,
    description,
    account,
    disabled,
    onClick,
    action,
}: Props) {
    return (
        <Base onClick={onClick} disabled={disabled} account={account}>
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
