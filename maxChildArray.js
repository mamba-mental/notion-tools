import "dotenv/config";
import "./logger.js";
import { logSessionCloser } from "./logger.js";
import retry from "async-retry";
import { encode } from "html-entities";
import collect from 'collect.js';

import { Client, LogLevel } from "@notionhq/client";

// API Tester CIG
const secret = process.env.API_TESTER_CIG_SECRET;

// Initializing a client
const notion = new Client({
    auth: secret,
    logLevel: LogLevel.DEBUG,
});

async function appendChildren(page_id, arr) {
    return await notion.blocks.children.append({
        block_id: page_id,
        children: arr,
    });
}

function rtoConstructor(text) {
    const colors = ['yellow_background', 'red_background', 'blue_background', 'green_background']
    const num = Math.floor(Math.random() * 3)
    
    return {
        type: "text",
        text: {
            content: text + "-",
        },
        annotations: {
            color: colors[num]
        }
    };
}

function blockConstructor(type, rtoArray) {
    // Check if rtoArray.length > 100
    const rtoCollection = collect(rtoArray);
    const rtos = rtoCollection.chunk(100);

    const blocks = [];

    for (let rto of rtos) {
        const block = {
            type: type,
            [type]: {
                rich_text: rto,
            },
        };

        blocks.push(block);
    }

    return blocks;
}

function headingConstructor(blockArray, num) {
    return {
        type: "heading_1",
        heading_1: {
            rich_text: [
                rtoConstructor(`Heading ${num}`)
            ],
            is_toggleable: true,
            children: blockArray
        }
    }
}

const blocks = []

for (let i = 0; i < 50; i++) {
    const rtos = []
    for (let j = 0; j < 100; j++) {
        const rto = rtoConstructor(j.toString())
        rtos.push(rto)
    }
    const block = blockConstructor("numbered_list_item", rtos)
    blocks.push(...block)
}

const headings = []
const blockChunks = collect(blocks).chunk(100)

//console.dir(blockChunks, {depth: null})

for (let [index, block] of blockChunks.all().entries()) {
    const heading = headingConstructor(block, index)
    headings.push(heading)
}

//console.dir(headings, {depth: null})

const pageID = "1c6b7618e8dc4c6cb90055733eaf6328"

console.dir(await appendChildren(pageID, headings))
