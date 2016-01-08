// LICENSE : MIT
"use strict";
export const tagNameToType = {
    "heading": "Header",
    "note": "Paragraph",
    "body": "Paragraph"
};

export const nodeTypes = {
    "root": "Document",
    "paragraph": "Paragraph",
    "blockquote": "BlockQuote",
    "listItem": "ListItem",
    "list": "List",
    "Bullet": "Bullet",
    "heading": "Header",
    "code": "CodeBlock",
    "HtmlBlock": "Html",
    "ReferenceDef": "ReferenceDef",
    "horizontalRule": "HorizontalRule",
    // inline block
    'text': 'Str',
    'break': 'Break',
    'emphasis': 'Emphasis',
    'strong': 'Strong',
    'html': 'Html',
    'link': 'Link',
    'image': 'Image',
    'inlineCode': 'Code',
    'yaml': 'Yaml'
};
