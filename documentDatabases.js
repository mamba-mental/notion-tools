import "dotenv/config";
import "./logger.js";
import { logSessionCloser } from "./logger.js";
import retry from "async-retry";
import LZstring from "lz-string";
const { compress, decompress } = LZstring;

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
 * Queries the documentation databases (Databases, Properties) to get all records related to this template. For those that are found, we'll update them with info from the template instead of creating new records. We'll also establish Dual-Property Relation links.
 *
 * @param {string} databaseID - the ID of the database to be queried.
 * @param {Array<string>} relatedPageIDArray - an array of the IDs of the Related pages to filter the query on (Templates page for Databases, Databases pages for Properties)
 * @param {string} relationName - the name of the Relation property on which to filter
 */
async function getExistingDocumentation(
    databaseID,
    relatedPageIDArray,
    relationName
) {
    let hasMore;
    let token;

    const rows = []

    while (hasMore == undefined || hasMore == true) {
        try {
            const databasePages = await retry(async (bail) => {
                try {
                    let params = {
                        page_size: 100,
                        start_cursor: token,
                    }
                    
                    const response = await notion.databases.query({
                        database_id: databaseID,
                        ...params,
                        filter: {
                            or: relatedPageIDArray.map((criteria) => ({
                                property: relationName,
                                relation: {
                                    contains: criteria
                                }
                            }))
                        },
                    });

                    rows.push(...response.results)
                    hasMore = response.has_more
                    if (response.next_cursor) [
                        token = response.next_cursor
                    ]
                } catch (e) {
                    console.error(e);
                    throw error;
                }
            });
        } catch (e) {
            console.error(e)
            throw error
        }
    }

    return rows
}

/**
 * Adds each Notion database in the template being documented as a page in the Databases database within the documentation.
 *
 * @param {string} dbID - the ID of the Databases database in the docs.
 * @param {Array<Object>} dbList - an array of Notion database objects, created by getDatabaseProps()
 * @param {string} dbRelation - the Template page to which these Database pages will be related (example: Content database page would be related to the Creator's Companion tempplate page.)
 * @param {Array<Object>} existingDatabasePages - an Array of existing pages from the Databases documentation database.
 * @param {Array<Object>} existingPropertyPages - an Array of existing pages from the Properties documentation database.
 * @returns
 */
async function documentDatabasePages(dbID, dbList, dbRelation, existingDatabasePages, existingPropertyPages) {
    const databasePageIDs = await Promise.all(
        dbList.map(async (db) => {
            const response = await retry(async (bail) => {
                try {
                    const params = {
                        icon: db.icon ?? null,
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
                            Description: {
                                rich_text: [
                                    {
                                        text: {
                                            content: db.description,
                                        },
                                    },
                                ],
                            },
                            "Database Full Name": {
                                rich_text: [
                                    {
                                        text: {
                                            content: db.name,
                                        },
                                    },
                                ],
                            },
                            "Database ID": {
                                rich_text: [
                                    {
                                        text: {
                                            content: db.id,
                                        },
                                    },
                                ],
                            },
                            "Database Icon": {
                                url: db.icon?.external?.url ?? "",
                            },
                        }
                    }

                    const dbDocumentToUpdate = existingDatabasePages.find((database) => database.properties["Database ID"].rich_text[0].text.content.replace(/-/g,"") === db.id.replace(/-/g,""))

                    if (dbDocumentToUpdate) {
                        console.log(`Found existing Database document ${dbDocumentToUpdate.id} for ${db.name} (${db.id}). Updating record.`)
                        return notion.pages.update({
                            page_id: dbDocumentToUpdate.id,
                            ...params
                        })
                    } else {
                        console.log(`No existing Database document found for ${db.name} (${db.id}). Creating new record.`)
                        return notion.pages.create({
                            parent: {
                                type: "database_id",
                                database_id: dbID,
                            },
                            ...params
                        });
                    }
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

                            const typeAccessor = db.properties[prop].type;

                            if (
                                selectTypes.includes(db.properties[prop].type)
                            ) {
                                console.log(
                                    `Found ${db.properties[prop].type} property: ${db.properties[prop].name}.`
                                );
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
                                            table_width:
                                                db.properties[prop].type ===
                                                "status"
                                                    ? 4
                                                    : 3,
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
                                                            ...(db.properties[
                                                                prop
                                                            ].type === "status"
                                                                ? [
                                                                      [
                                                                          {
                                                                              type: "text",
                                                                              text: {
                                                                                  content:
                                                                                      "Group",
                                                                              },
                                                                          },
                                                                      ],
                                                                  ]
                                                                : []),
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

                                    const tableRows = db.properties[prop][
                                        typeAccessor
                                    ].options.map((option) => ({
                                        type: "table_row",
                                        table_row: {
                                            cells: [
                                                [
                                                    {
                                                        type: "text",
                                                        text: {
                                                            content:
                                                                option.name,
                                                        },
                                                        annotations: {
                                                            color: option.color
                                                                ? `${option.color}_background`
                                                                : "default",
                                                        },
                                                    },
                                                ],
                                                [
                                                    {
                                                        type: "text",
                                                        text: {
                                                            content:
                                                                option.color ??
                                                                "",
                                                        },
                                                        annotations: {
                                                            color: option.color
                                                                ? `${option.color}_background`
                                                                : "default",
                                                        },
                                                    },
                                                ],
                                                ...(db.properties[prop].type ===
                                                "status"
                                                    ? [
                                                          [
                                                              {
                                                                  type: "text",
                                                                  text: {
                                                                      content:
                                                                          db.properties[
                                                                              prop
                                                                          ][
                                                                              typeAccessor
                                                                          ].groups.find(
                                                                              (
                                                                                  group
                                                                              ) =>
                                                                                  group.option_ids.includes(
                                                                                      option.id
                                                                                  )
                                                                          )
                                                                              .name,
                                                                  },
                                                                  annotations: {
                                                                      color: `${
                                                                          db.properties[
                                                                              prop
                                                                          ][
                                                                              typeAccessor
                                                                          ].groups.find(
                                                                              (
                                                                                  group
                                                                              ) =>
                                                                                  group.option_ids.includes(
                                                                                      option.id
                                                                                  )
                                                                          )
                                                                              .color
                                                                      }_background`,
                                                                  },
                                                              },
                                                          ],
                                                      ]
                                                    : []),
                                                [
                                                    {
                                                        type: "text",
                                                        text: {
                                                            content:
                                                                option.description ??
                                                                "",
                                                        },
                                                    },
                                                ],
                                            ],
                                        },
                                    }));

                                    table.table.children.push(...tableRows);
                                    childArray.push(table);

                                    // Compress the descriptions
                                    Object.values(
                                        db.properties[prop][typeAccessor]
                                    ).map((options) => {
                                        if (Array.isArray(options)) {
                                            return options.map((option) => {
                                                if (
                                                    option.description &&
                                                    option.description.length >
                                                        0
                                                ) {
                                                    console.log(
                                                        "Compressing description:"
                                                    );
                                                    console.log(
                                                        option.description
                                                    );
                                                    option.description =
                                                        compress(
                                                            option.description
                                                        );
                                                    console.log(
                                                        option.description
                                                    );
                                                }
                                                return option;
                                            });
                                        }
                                        return options;
                                    });
                                }
                            }

                            // If the Property page already exists, update it. Include any dual-relation values. Then append block children for select/multi-select/status props.

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
                                    "Property ID": {
                                        rich_text: [
                                            {
                                                text: {
                                                    content:
                                                        db.properties[prop].id,
                                                },
                                            },
                                        ],
                                    },
                                    "Property Name": {
                                        rich_text: [
                                            {
                                                text: {
                                                    content:
                                                        db.properties[prop]
                                                            .name,
                                                },
                                            },
                                        ],
                                    },
                                    ...(selectTypes.includes(
                                        db.properties[prop].type
                                    ) && {
                                        "Options Details": {
                                            rich_text: [
                                                {
                                                    text: {
                                                        content: JSON.stringify(
                                                            db.properties[prop][
                                                                typeAccessor
                                                            ]
                                                        ),
                                                    },
                                                },
                                            ],
                                        },
                                    }),
                                    ...(db.properties[prop].type ===
                                        "relation" && {
                                        "Relation Details": {
                                            rich_text: [
                                                {
                                                    text: {
                                                        content: JSON.stringify(
                                                            db.properties[prop]
                                                                .relation
                                                        ),
                                                    },
                                                },
                                            ],
                                        },
                                    }),
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

// Get the database IDs from the actual template (passing in its "Databases and Utilities" page)
const pageInfo = await getDatabasesFromPage(dbs.cc.db_page);
//console.dir(pageInfo, {depth: null})

// Get the database schema for each database in the template
const databases = await getDatabaseSchemas(pageInfo);
//console.dir(databases, {depth: null})

// Format the databases array into a friendlier array with the info we need
const propArray = await getDatabaseProps(databases);
//console.dir(propArray, {depth: null})

// Fetch existing documentation for this template's Databases
const databaseDocumentation = await getExistingDocumentation(dbs.docs.databases, [dbs.templates_db.cc], "Templates")
console.dir(databaseDocumentation, {depth: null})

// Fetch existing documentation for this template's Properties
const databasePageIDArray = databaseDocumentation.map((db) => db.id)
const propertyDocumentation = await getExistingDocumentation(dbs.docs.properties, databasePageIDArray, "Database")
console.dir(propertyDocumentation, {depth: null})

/**
 * For each database, create a page in the Databases documentation db, then create page in the
 * Properites documentation database for each property in the database. Or, if these pages
 * already exist, update them with the latest info from the database schema.
 */
const dbPages = await documentDatabasePages(
    dbs.docs.databases,
    propArray,
    dbs.templates_db.cc,
    databaseDocumentation,
    propertyDocumentation
);
consoleDir(dbPages);
consoleDir(propArray);

logSessionCloser();

/**
 * Next steps:
 *
 * X Get database descriptions
 * - Update any other RTOs to just use existing RTOs instead of getting only the text value
 * - Modify so that this can update existing pages instead of creating new ones
 * -- Record property ID and database ID in the documentation for source template properties
 * -- Record database ID in the docs for databases
 * - Add "Related" property connections
 */
