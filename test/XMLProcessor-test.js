// LICENSE : MIT
"use strict";
import assert from "power-assert";
import XMLProcessor from "../src/XMLProcessor";
import {parse} from "../src/xml-to-ast";
import {tagNameToType} from "../src/mapping";
import {TextLintCore} from "textlint";
import path from "path";
describe("HTMLProcessor-test", function () {
    describe("#parse", function () {
        it("should return AST", function () {
            var result = parse(`<?xml version="1.0" encoding="UTF-8"?>
<note></note>`);
            assert(result.type === "Document");
        });
        it("<note> has Str", function () {
            var result = parse(`<?xml version="1.0" encoding="UTF-8"?>
<note><body>string</body></note>`);
            console.log(JSON.stringify(result,null, 4));
            assert(result.type === "Document");
            var documentChildren = result.children;
            var nodeNode = documentChildren.filter(node => node.type === tagNameToType.note)[0];
            assert(nodeNode.tagName === "note");
            var noteBody = nodeNode.children.filter(node => node.type === tagNameToType.body)[0];
            assert(noteBody.tagName === "body");
            assert(noteBody.children.some(node => node.type === "Str"));
        });
    });
    describe("HTMLPlugin", function () {
        let textlint;
        context("when target file is a XML", function () {
            beforeEach(function () {
                textlint = new TextLintCore();
                textlint.addProcessor(XMLProcessor);
                textlint.setupRules({
                    "no-todo": require("textlint-rule-no-todo")
                });
            });
            it("should report error", function () {
                var fixturePath = path.join(__dirname, "/fixtures/note.xml");
                let results = textlint.lintFile(fixturePath);
                assert(results.messages.length > 0);
                assert(results.filePath === fixturePath);
            });
        });
    });
});