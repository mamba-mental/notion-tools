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

async function createTable(parentPageID) {
  const table = {
    type: "table",
    table: {
      table_width: 3,
      has_row_header: false,
      has_column_header: true,
      children: [
        {
          type: "table_row",
          table_row: {
            cells: [
              [
                {
                  type: "text",
                  text: { content: "Name" },
                },
              ],
              [
                {
                  type: "text",
                  text: { content: "Color" },
                },
              ],
              [
                {
                  type: "text",
                  text: { content: "Description" },
                },
              ],
            ],
          },
        },
      ],
    },
  };

  for (let i = 1; i < 4; i++) {
    const row = {
      type: "table_row",
      table_row: {
        cells: [
          [
            {
              type: "text",
              text: { content: "Stuff" },
            },
          ],
          [
            {
              type: "text",
              text: { content: "Orange" },
            },
          ],
          [
            {
              type: "text",
              text: {
                content:
                  "Aliquip officia labore ut tempor quis dolore magna officia voluptate aliquip fugiat nulla irure magna.",
              },
            },
          ],
        ],
      },
    };

    table.table.children.push(row);
  }

  const response = await notion.blocks.children.append({
    block_id: parentPageID,
    children: [table],
  });

  console.log(response);
}

await createTable("95b0d2aa48ab41f998d0cc1869a25105");
