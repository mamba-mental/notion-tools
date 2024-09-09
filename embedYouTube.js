import "dotenv/config";
import "./logger.js";
import { logSessionCloser } from "./logger.js";
import retry from "async-retry";
import {encode} from 'html-entities';

import { Client, LogLevel } from "@notionhq/client";

// API Tester CIG
const secret = process.env.API_TESTER_CIG_SECRET;

// Initializing a client
const notion = new Client({
    auth: secret,
    logLevel: LogLevel.DEBUG,
});

async function embedVideo(page_id, url) {
    return await notion.blocks.children.append({
        block_id: page_id,
        children: [
            {
                type: "video",
                video: {
                    type: "external",
                    external: {
                        url: url
                    }
                }
            }
        ]
    })
}

const pageID = "1c6b7618e8dc4c6cb90055733eaf6328"
const videoURL = "https://www.youtube.com/watch?v=i_D8MlBAk0A"

console.log(await embedVideo(pageID, videoURL))