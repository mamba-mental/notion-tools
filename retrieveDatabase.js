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

async function fetchDatabase(database_id) {
    return await notion.databases.retrieve({
        database_id: database_id,
    });
}

const id = "66f3f54ec6e94b0aa700a112095230d4"
console.dir(await fetchDatabase(id), {depth: null})