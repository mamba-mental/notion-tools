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

async function appendBlockChildren(blockID, children) {
    const response = await notion.blocks.children.append({
        block_id: blockID,
        children: children
    })

    return response
}

const children = [
    {
        file: {
            external: {
                url: "google.c"
            }
        }
    },
]

console.dir(await appendBlockChildren("81efc76be08848f2853e634e0c96ba8d", children))