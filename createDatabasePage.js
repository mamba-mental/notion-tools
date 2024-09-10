import "dotenv/config";
import "./logger.js";
import { logSessionCloser } from "./logger.js";
import retry from "async-retry";
import NotionHelper from "notion-helper";
import { Client, LogLevel } from "@notionhq/client";

const { buildRichTextObj, page_meta, page_props } = NotionHelper;

// API Tester CIG
const secret = process.env.API_TESTER_CIG_SECRET;

// Initializing a client
const notion = new Client({
    auth: secret,
    logLevel: LogLevel.DEBUG,
});

async function createPage(parent, parent_type, props) {
    return await notion.pages.create({
        parent: page_meta.parent.createMeta({ id: parent, type: parent_type }),
        properties: { ...props },
    });
}

const database_id = "1da41221169e4d6b8b59e29dd388ea6a";

const tasks = [
    {
        Name: "Build Standing Desk",
        "Due Date": "2024-09-10",
        Status: "Not started",
    },
    {
        Name: "Mount Overhead Lights",
        "Due Date": "2024-09-11",
        Status: "Not started",
    },
    { Name: "Set Up Camera", "Due Date": "2024-09-11", Status: "Not started" },
    {
        Name: "Buy New Capture Card",
        "Due Date": "2024-09-12",
        Status: "Not started",
    },
    { Name: "Hook Up Mic", "Due Date": "2024-09-12", Status: "Not started" },
];

const taskSchema = ["title", "date", "status"];

const taskObjects = tasks.map((task) => {
    let index = 0;
    const taskProps = Object.entries(task).map(([key, val]) => {
        const schema = taskSchema[index];
        let value;

        if (schema === "title" || schema === "rich_text") {
            value = buildRichTextObj(val);
        } else {
            value = val;
        }

        const property = {
            [key]: page_props[schema].createProp(value),
        };

        index++;

        return property;
    });

    return taskProps;
});

const pages = await Promise.all(
    taskObjects.map((task) => {
        const props = task.reduce((acc, obj) => ({ ...acc, ...obj }), {});

        return createPage(database_id, "database_id", props);
    })
);

console.dir(pages, { depth: null });
