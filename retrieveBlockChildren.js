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
    return await notion.blocks.children.list({
        block_id: blockID,
    })
}

console.dir(await retrieveBlockChildren("51eedb8900b34a6daf3d3c1b146273dd"))