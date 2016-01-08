# textlint-plugin-xml-example

Add XML support for [textlint](https://github.com/textlint/textlint "textlint").

But, This is a example. Proof of concept of XML support.

What is textlint plugin?
Please see https://github.com/textlint/textlint/blob/master/docs/plugin.md

## How to work

XML is a data. It means that XML has various format and nodes.

SO, One XML plugin impossible to support all XML format.

This example aim to parse following XML:

```
<?xml version="1.0" encoding="UTF-8"?>
<note>
    <heading>Reminder</heading>
    <body>TODO: This is TODO</body>
</note>
```

- `note` node
    - `header` node
    - `body` node
    
A typical [TxtNode](https://github.com/textlint/textlint/blob/master/docs/txtnode.md "TxtNode interface") has following type:

- Document
- Paragraph
- Header
- Str

We do that map each node to typical node type.

- `note` node => `Paragraph` type
    - `header` node => `Header` type
    - `body` node => `Paragraph` type
        - `<body>string</body>` => string is `Str` type

Parse XML to TxtNode:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<note><body>string</body></note>
```

to

```json
{
    "type": "Document",
    "children": [
        {
            "type": "Unknown",
            "name": "?xml",
            "value": "?xml version=\"1.0\" encoding=\"UTF-8\"?",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 38
                }
            },
            "range": [
                0,
                38
            ],
            "raw": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
        },
        {
            "type": "Str",
            "value": "\n",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 38
                },
                "end": {
                    "line": 2,
                    "column": 0
                }
            },
            "range": [
                38,
                39
            ],
            "raw": "\n"
        },
        {
            "type": "Paragraph",
            "tagName": "note",
            "properties": {},
            "children": [
                {
                    "type": "Paragraph",
                    "tagName": "body",
                    "properties": {},
                    "children": [
                        {
                            "type": "Str",
                            "value": "string",
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 12
                                },
                                "end": {
                                    "line": 2,
                                    "column": 18
                                }
                            },
                            "range": [
                                51,
                                57
                            ],
                            "raw": "string"
                        }
                    ],
                    "loc": {
                        "start": {
                            "line": 2,
                            "column": 6
                        },
                        "end": {
                            "line": 2,
                            "column": 25
                        }
                    },
                    "range": [
                        45,
                        64
                    ],
                    "raw": "<body>string</body>"
                }
            ],
            "loc": {
                "start": {
                    "line": 2,
                    "column": 0
                },
                "end": {
                    "line": 2,
                    "column": 32
                }
            },
            "range": [
                39,
                71
            ],
            "raw": "<note><body>string</body></note>"
        }
    ],
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 2,
            "column": 32
        }
    },
    "range": [
        0,
        71
    ],
    "raw": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<note><body>string</body></note>"
}
```


### Further reading

- https://github.com/textlint/textlint/blob/master/docs/plugin.md
- https://github.com/textlint/textlint-plugin-html

## Usage

1. Install(but, this example is not published to npm)
2. Manually add xml plugin to do following:

```
{
    "plugins": [
        "xml-example"
    ]
}
```

Run

```js
$ textlint example.xml
```

## Tests

    npm test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
