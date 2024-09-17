import "dotenv/config";
import { Client } from "@notionhq/client";
import { createNotion } from "notion-helper";

const secret = process.env.API_TESTER_CIG_SECRET;
const notion = new Client({ auth: secret });
const database_id = "1da41221169e4d6b8b59e29dd388ea6a";

const childrenBlocks = []

for (let i = 0; i < 200; i++) {
    const child = `Task #${i}`
    childrenBlocks.push(child)
}

const tasks = [
    {
        icon: "🔨",
        task: "Build Standing Desk",
        status: "Not started",
        children: childrenBlocks
    },
    {
        task: "Mount Overhead Lights",
        due: "2024-09-11",
        children: [
            "Mount clamp to joist and tighten",
            "Attach arm to clamp",
            "Mount video light to arm",
            "Run power cable through ceiling panels",
        ],
    },
    { task: "Set Up Camera", due: "2024-09-11", status: "Not started" },
];

const pages = await Promise.all(
    tasks.map(async (task) => {
        const page = createNotion()
            .parentDb(database_id)
            .title("Name", task.task)
            .icon(task.icon)
            .date("Due Date", task.due)
            .status("Status", task.status)
            .loop("to_do", task.children)
            .build();

        console.dir(page, { depth: null });

        const result = await notion.pages.create(page.content);

        const appendedBlocks = []
        for (const chunk of page.additionalBlocks) {
            const appendedBlock = await notion.blocks.children.append({
                block_id: result.id,
                children: chunk
            })
            appendedBlocks.push(appendedBlock)
        }

        return { result, appendedBlocks };
    })
);
