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

function parseSchemaToHTML(schemaProperties) {
    // Common HTML elements
    const ps = `<!-- wp:paragraph -->`;
    const pe = `<!-- /wp:paragraph -->`;
    const hs = `<!-- wp:heading -->`;
    const he = `<!-- /wp:heading -->`;
    const ts = `<!-- wp:table -->`;
    const te = `<!-- /wp:table -->`;

    const ucr = /(^\w{1})|(\s+\w{1})/g;

    const keyList = Object.keys(schemaProperties).sort();

    const content = keyList.map((key) => {
        const heading = `${hs}\n<h2 class="wp-block-heading">${schemaProperties[key].name}</h2>\n${he}`;
        const type = `${ps}\n<p><strong>Type:</strong> ${schemaProperties[
            key
        ].type.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => {
            return letter.toUpperCase().replace(/_/g, "-");
        })}</p>\n${pe}`;
        const description = schemaProperties[key].description
            .split("\n")
            .filter((line) => line.trim() !== "")
            .map((line) => `${ps}\n<p>${line}</p>\n${pe}`)
            .join("\n");

        const elements = [heading, type, description];

        if (
            ["select", "multi_select", "status"].includes(
                schemaProperties[key].type
            )
        ) {
            const tableStart = `${ts}\n<figure class="wp-block-table"><table>`;
            const tableEnd = `</tbody></table></figure>\n${te}`;
            const tableHead = `<thead><tr><th>Name</th><th>Description</th></tr></thead><tbody>`;

            const rows = [];

            if (schemaProperties[key][schemaProperties[key].type].groups) {
                for (let group of schemaProperties[key][
                    schemaProperties[key].type
                ].groups) {
                    // Create the Group row
                    const rowStart = `<tr>`;
                    const groupCell = `<td colspan="2" class="status-group-name notion-lm-text-${group.color}">Group: ${group.name}</td>`;
                    const rowEnd = `</tr>`;

                    rows.push([rowStart, groupCell, rowEnd].join(""));

                    // Create a row for each option in the group
                    for (let id of group.option_ids) {
                        const option = schemaProperties[key][
                            schemaProperties[key].type
                        ].options.find((choice) => choice.id === id);

                        rows.push(buildTableRow(option))
                    }
                }
            } else {
                for (let option of schemaProperties[key][
                    schemaProperties[key].type
                ].options) {
                    rows.push(buildTableRow(option));
                }
            }

            const table = [tableStart, tableHead, rows.join(""), tableEnd].join("");
            elements.push(table);
        }

        return elements.join("\n");
    });

    return content.join("\n");
}

function buildTableRow(option) {
    const rowStart = `<tr>`;
    const nameCell = `<td><mark class="notion-option notion-lm-bg-${option.color}">${option.name}</mark></td>`;
    const descCell = `<td>${option.description}</td>`;
    const rowEnd = `</tr>`;

    return [rowStart, nameCell, descCell, rowEnd].join("")
}

function encodeAmpersands(str) {
    return str.replace(/&(?!(?:[a-z]+|#\d+|#x[a-f\d]+);)/gi, '&amp;');
}

const dbs = {
    docs: {
        databases: "f958ce31207249ae89c550ce70e84515",
        pages: "c82401a0b3c344fda61607706f429787",
        properties: "a441fefdc5ce41799816a3bdf248f3ee",
        templates: "292bc5a02d504a8da1e0ecd0fad06a88",
    },
    templates_db: {
        cc: "ad896d338a3d470c98ed6c18eb537453",
    },
    cc: {
        db_page: "8ca82d016f194043bd4ccf7276138688",
        content: "26d43632ae044da5853b736531b3d40b",
        channels: "9734837399394bf597391cc43964f1c6",
        sponsors: "e8fd34fd-8a0b-456d-a53f-88ebb69553b7",
        wiki: "7b23f721-62f8-4a05-96dc-bdeb49d10def",
        swipes: "c41a762b-860a-4feb-b315-8cd83e3c4778",
        b_roll: "625176bc-12d6-4a29-8da6-b0af114fc06c",
        research: "30b4f7b9-bd71-4818-be06-52921c80846f",
        audience: "33c2fc52-e373-4875-b01c-270a3451c7a1",
        keywords: "a6575a26-b243-4c33-bf4c-47ffbf38077e",
    },
};

const databaseSchema = await fetchDatabase(dbs.cc.audience);

const wordPressContent = encodeAmpersands(parseSchemaToHTML(databaseSchema.properties))

console.log(wordPressContent);
