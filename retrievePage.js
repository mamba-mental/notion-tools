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

async function retrievePage(pageID) {
    const response = await notion.pages.retrieve({
        page_id: pageID,
    })

    return response
}

// Database page
//console.dir(await retrievePage("e252b9a330d549689fdde734a8ffa789"))

// Normal page
console.dir(await retrievePage("e23360542d9d4ce5bdda569ac3a4f664"))