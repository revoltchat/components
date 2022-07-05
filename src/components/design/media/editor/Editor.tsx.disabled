/**
 * !  due to import issues with Vite:
 *   this is being migrated to revite
 */

import React, { useCallback, useState } from "react";
import { createEditor, Descendant, Range, Text } from "slate";

import { Slate, Editable, withReact, RenderLeafProps } from "slate-react";
import Prism from "prismjs";
import styled, { css } from "styled-components";

import "prismjs/components/prism-markdown";

const initialValue: Descendant[] = [
    {
        type: "paragraph",
        children: [
            {
                text: "hello *gaming* **joigfdioghjdfghf** [I am a link](https://revolt.chat)",
            },
        ],
    },
];

const Base = styled.div`
    color: var(--foreground);
`;

const Placeholder = styled.span`
    color: var(--tertiary-foreground);
`;

interface LeafProps {
    bold: boolean;
    italic: boolean;
    title: boolean;
    list: boolean;
    blockquote: boolean;
    code: boolean;
    url: boolean;
}

const LeafBase = styled.span<any>`
    font-weight: ${(props) => props.bold && "bold"};
    font-style: ${(props) => props.italic && "italic"};

    ${(props) =>
        props.title &&
        css`
            display: inline-block;
            font-weight: bold;
            font-size: 20px;
            // margin: 20px 0 10px 0;
        `}

    ${(props) =>
        props.list &&
        css`
            padding-left: 10px;
            font-size: 20px;
            line-height: 10px;
        `}

          ${(props) =>
        props.blockquote &&
        css`
            display: inline-block;
            border-left: 2px solid #aaa;
            padding-left: 10px;
            color: #aaa;
            font-style: italic;
        `}

          ${(props) =>
        props.code &&
        css`
            font-family: monospace;
            background-color: #eee;
            padding: 3px;
        `}

          ${(props) =>
        props.url &&
        css`
            color: var(--accent);
        `}
`;

const renderLeaf = (props: RenderLeafProps) => (
    <LeafBase
        {...(props.leaf as unknown as LeafProps)}
        {...props.attributes}
        //data-value={JSON.stringify(props.leaf)}>
    >
        {props.children}
    </LeafBase>
);

export function Editor() {
    const [editor] = useState(() => withReact(createEditor()));
    const decorate = useCallback(([node, path]) => {
        const ranges: Range[] = [];

        if (!Text.isText(node)) {
            return ranges;
        }

        const getLength = (token: string | Prism.Token) => {
            if (typeof token === "string") {
                return token.length;
            } else if (typeof token.content === "string") {
                return token.content.length;
            } else {
                // @ts-expect-error
                return token.content.reduce((l, t) => l + getLength(t), 0);
            }
        };

        const tokens = Prism.tokenize(node.text, Prism.languages.markdown);
        let start = 0;

        for (const token of tokens) {
            const length = getLength(token);
            const end = start + length;

            if (typeof token !== "string") {
                ranges.push({
                    [token.type]: true,
                    anchor: { path, offset: start },
                    focus: { path, offset: end },
                });
            }

            start = end;
        }

        return ranges;
    }, []);

    return (
        <Base>
            <Slate editor={editor} value={initialValue}>
                <Editable
                    decorate={decorate}
                    renderLeaf={renderLeaf}
                    renderPlaceholder={() => (
                        <Placeholder>Message deez</Placeholder>
                    )}
                />
            </Slate>
        </Base>
    );
}
