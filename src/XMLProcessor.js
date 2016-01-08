// LICENSE : MIT
"use strict";
import {parse} from "./xml-to-ast";
export default class XMLProcessor {
    constructor(config) {
        this.config = config;
    }

    static availableExtensions() {
        return [
            ".xml"
        ];
    }

    processor(ext) {
        return {
            preProcess(text, filePath) {
                return parse(text);
            },
            postProcess(messages, filePath) {
                return {
                    messages,
                    filePath: filePath ? filePath : "<xml>"
                };
            }
        };
    }
}
