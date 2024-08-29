import "dotenv/config";
import "./logger.js";
import { logSessionCloser } from "./logger.js";
import retry from "async-retry";

import { Client, LogLevel } from "@notionhq/client";

// API Tester CIG
const secret = process.env.API_TESTER_CIG_SECRET;

// Initializing a client
const notion = new Client({
    auth: secret,
    logLevel: LogLevel.DEBUG,
});

/**
 * For each database in the array, create an object that contains its name, ID, description, and a properties object whose value is an array with all properties. Each property object in that array should contain the name, type, and description.
 */

async function getDatabaseProps(dbArray = []) {
    const dbProps = dbArray.map((db) => {
        return {
            id: db.id,
            icon: db.icon,
            name: db.title[0].text.content,
            description: db.description[0].text.content,
            properties: db.properties,
        };
    });

    return dbProps;
}

async function getDatabaseSchemas(dbArray) {
    const result = await Promise.all(
        dbArray.map(async (db) => {
            return notion.databases.retrieve({
                database_id: db.id,
            });
        })
    );

    return result;
}

async function getDatabasesFromPage(pageID) {
    const pageBlocks = await notion.blocks.children.list({
        block_id: pageID,
    });

    const databaseIDs = pageBlocks.results
        .filter((block) => block.type === "child_database")
        .map((db) => {
            return {
                name: db.child_database.title,
                id: db.id,
            };
        });

    return databaseIDs;
}

/**
 * Adds each Notion database in the template being documented as a page in the Databases database within the documentation.
 *
 * @param {string} dbID - the ID of the Databases database in the docs.
 * @param {Array<Object>} dbList - an array of Notion database objects, created by getDatabaseProps()
 * @param {string} dbRelation - the Template page to which these Database pages will be related (example: Content database page would be related to the Creator's Companion tempplate page.)
 * @returns
 */
async function documentDatabasePages(dbID, dbList, dbRelation) {
    const databasePageIDs = await Promise.all(
        dbList.map(async (db) => {
            const response = await retry(async (bail) => {
                try {
                    return notion.pages.create({
                        parent: {
                            type: "database_id",
                            database_id: dbID,
                        },
                        icon: db.icon,
                        properties: {
                            Name: {
                                title: [
                                    {
                                        text: {
                                            content: db.name.replace(
                                                /\s\[.*?\]$/,
                                                ""
                                            ),
                                        },
                                    },
                                ],
                            },
                            Templates: {
                                relation: [{ id: dbRelation }],
                            },
                        },
                    });
                } catch (e) {
                    if (400 <= error.status && error.status <= 409) {
                        // Don't retry for errors 400-409
                        bail(error);
                        return;
                    }
                    console.error(e);
                    throw error(e);
                }
            });

            db.documentation_page = response;

            db.documentation_page.prop_pages = [];

            const propertyResponse = await Promise.all(
                Object.keys(db.properties).map(async (prop) => {
                    const response = await retry(async (bail) => {
                        try {
                            const childArray = [];
                            const selectTypes = [
                                "select",
                                "multi_select",
                                "status",
                            ];

                            if (
                                selectTypes.includes(db.properties[prop].type)
                            ) {
                                const typeAccessor = db.properties[prop].type;

                                if (
                                    db.properties[prop][typeAccessor].options
                                        .length > 0
                                ) {
                                    const optionHeader = {
                                        type: "heading_1",
                                        heading_1: {
                                            rich_text: [
                                                {
                                                    type: "text",
                                                    text: {
                                                        content: "Options",
                                                    },
                                                },
                                            ],
                                        },
                                    };

                                    childArray.push(optionHeader);

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
                                                                    text: {
                                                                        content:
                                                                            "Name",
                                                                    },
                                                                },
                                                            ],
                                                            [
                                                                {
                                                                    type: "text",
                                                                    text: {
                                                                        content:
                                                                            "Color",
                                                                    },
                                                                },
                                                            ],
                                                            [
                                                                {
                                                                    type: "text",
                                                                    text: {
                                                                        content:
                                                                            "Description",
                                                                    },
                                                                },
                                                            ],
                                                        ],
                                                    },
                                                },
                                            ],
                                        },
                                    };

                                    const tableRows = db.properties[prop][typeAccessor].options.map((option) => ({
                                        type: "table_row",
                                        table_row: {
                                            cells: [
                                                [{
                                                    type: "text",
                                                    text: {
                                                        content: option.name,
                                                    },
                                                    annotations: {
                                                        color: `${option.color}_background` ?? 'default',
                                                    },
                                                }],
                                                [{
                                                    type: "text",
                                                    text: {
                                                        content: option.color ?? ""
                                                    },
                                                    annotations: {
                                                        color: `${option.color}_background` ?? 'default',
                                                    },
                                                }],
                                                [{
                                                    type: "text",
                                                    text: {
                                                        content: option.description ?? ""
                                                    }
                                                }]

                                            ]
                                        }
                                    }))

                                    table.table.children.push(...tableRows)
                                    childArray.push(table)
                                }
                            }

                            return notion.pages.create({
                                parent: {
                                    type: "database_id",
                                    database_id: dbs.docs.properties,
                                },
                                properties: {
                                    Name: {
                                        title: [
                                            {
                                                text: {
                                                    content:
                                                        db.properties[prop]
                                                            .name,
                                                },
                                            },
                                        ],
                                    },
                                    Description: {
                                        rich_text: [
                                            {
                                                text: {
                                                    content:
                                                        db.properties[prop]
                                                            .description,
                                                },
                                            },
                                        ],
                                    },
                                    Type: {
                                        select: {
                                            name: db.properties[prop].type,
                                        },
                                    },
                                    Database: {
                                        relation: [
                                            { id: db.documentation_page.id },
                                        ],
                                    },
                                },
                                children: childArray,
                            });
                        } catch (e) {
                            if (400 <= error.status && error.status <= 409) {
                                // Don't retry for errors 400-409
                                bail(error);
                                return;
                            }
                            console.error(e);
                            throw error(e);
                        }
                    });

                    db.documentation_page.prop_pages.push(response);
                })
            );

            return response;
        })
    );

    return databasePageIDs;
}

function consoleDir(input) {
    console.dir(input, { depth: null });
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
    },
};

const pageInfo = await getDatabasesFromPage(dbs.cc.db_page);
//console.dir(pageInfo, {depth: null})

const databases = await getDatabaseSchemas(pageInfo);
//console.dir(databases, {depth: null})

const propArray = await getDatabaseProps(databases);
//console.dir(propArray, {depth: null})

const dbPages = await documentDatabasePages(
    dbs.docs.databases,
    propArray,
    dbs.templates_db.cc
);
//consoleDir(dbPages);
consoleDir(propArray);

logSessionCloser();
