import "dotenv/config";
import "./logger.js";
import { logSessionCloser } from "./logger.js";
import retry from "async-retry";
import NotionHelper from 'notion-helper'
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
        children: children,
    });

    return response;
}

const page_id = "81efc76be08848f2853e634e0c96ba8d"

const tasks = [
    'Build standing desk',
    'Mount overhead lights',
    'Set up camera',
    'Buy new capture card',
    'Hook up mic'
]

const blocks = tasks.map((task) => NotionHelper.block.to_do.createBlock({rtArray: NotionHelper.buildRichTextObj(task)}))

console.dir(
    await appendBlockChildren(page_id, blocks)
);
