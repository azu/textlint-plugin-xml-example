// LICENSE : MIT
"use strict";
import hast from "hast";
import traverse from "traverse";
import StructuredSource from "structured-source";
import {nodeTypes, tagNameToType} from "./mapping";
/**
 * Remove undocumented properties on TxtNode from node
 * @param {TxtNode} node already has loc,range
 */
function removeUnusedProperties(node) {
    if (typeof node !== "object") {
        return;
    }
    ["position"].forEach(function (key) {
        if (node.hasOwnProperty(key)) {
            delete node[key];
        }
    });
}
function mapNodeType(node, parent) {
    if (node.tagName && node.type === "element") {
        let mappedType = tagNameToType[node.tagName];
        if (mappedType) {
            // heading => Header...
            return mappedType;
        }
    } else if (nodeTypes[node.type]) {
        // text => Str
        return nodeTypes[node.type];
    } else {
        return "Unknown";
    }
}
export function parse(xml) {
    const ast = hast.parse(xml);
    const src = new StructuredSource(xml);
    var tr = traverse(ast);
    tr.forEach(function (node) {
        if (this.notLeaf) {
            // avoid conflict <input type="text" />
            // AST node has type and position
            if (node.type && node.position) {
                // case: element => Html or ...
                node.type = mapNodeType(node, this.parent);
            } else if (node.type === "root") {
                // FIXME: workaround, should fix hast
                node.type = nodeTypes[node.type];
                let position = src.rangeToLocation([0, xml.length]);
                // reverse adjust
                node.position = {
                    start: {line: position.start.line, column: position.start.column + 1},
                    end: {line: position.end.line, column: position.end.column + 1}
                };
            }
            // map `range`, `loc` and `raw` to node
            if (node.position) {
                let position = node.position;
                // TxtNode's line start with 1
                // TxtNode's column start with 0
                let positionCompensated = {
                    start: {line: position.start.line, column: position.start.column - 1},
                    end: {line: position.end.line, column: position.end.column - 1}
                };
                let range = src.locationToRange(positionCompensated);
                node.loc = positionCompensated;
                node.range = range;
                node.raw = xml.slice(range[0], range[1]);
            }
        }
        removeUnusedProperties(node);
    });
    return ast;
}

