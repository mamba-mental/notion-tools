import "dotenv/config";
import "./logger.js";
import { logSessionCloser } from "./logger.js"
import retry from "async-retry";

import { Client, LogLevel } from "@notionhq/client";

// API Tester CIG
const secret = process.env.API_TESTER_CIG_SECRET;

// Initializing a client
const notion = new Client({
  auth: secret,
  logLevel: LogLevel.DEBUG,
});

async function retrieveBlockChildren(blockID) {
    const response = await notion.blocks.children.list({
        block_id: blockID,
    })

    for (let block of response.results) {
        const children = []
        if (block.has_children) {
            const childBlock = await retrieveBlockChildren(block.id)
            children.push(childBlock)
        }
        block.children = children
    }

    return response
}

async function retrieveBlockChildrenIds(blockID) {
    const response = await notion.blocks.children.list({
        block_id: blockID,
    });

    const simplifyBlock = async (block) => {
        let children = [];
        if (block.has_children) {
            const childBlocks = await retrieveBlockChildrenIds(block.id);
            children = childBlocks;
        }
        return { 
            id: block.id,
            type: block.type,
            ...(children.length > 0 && { children })
        };
    };

    const simplifiedBlocks = await Promise.all(
        response.results.map(simplifyBlock)
    );

    return simplifiedBlocks;
}

console.dir(await retrieveBlockChildrenIds("51eedb8900b34a6daf3d3c1b146273dd"))