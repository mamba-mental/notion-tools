import 'dotenv/config'

// API Tester Super Experimental
// const secret = process.env.API_TESTER_SUPER_EXPERIMENTAL_SECRET

// API Tester CIG
const secret = process.env.API_TESTER_CIG_SECRET

import { Client, LogLevel } from "@notionhq/client";

// Initializing a client
const notion = new Client({
	auth: secret,
	logLevel: LogLevel.DEBUG
});

/* Super Experimental DBs */
// const dbs = {
// 	sales: "7c2c2dda6fa4442dac6b0dbcb5e21905",
//     customers: "41c39f9fefe24fc08d0e907bf3cc0843",
//     products: "2542387f91b449d79641aa959f25ef70",
// };

/* CIG DBs */
const dbs = {
	sales: "19c6160572854bfab794ca8878adda3e",
    customers: "a62c201804964178b74d41861f751fdb",
    products: "ec8f15be535143219366baa8c77a1d59",
};

async function getData(db, titlePropName = "Name", filter = undefined) {
    const rows = []

    let hasMore = undefined
    let token = undefined
    
    while (hasMore == undefined || hasMore) {
        const response = await notion.databases.query({
            database_id: db,
            start_cursor: token,
            filter: filter,
        });

        rows.push(...response.results)
        hasMore = response.has_more
        token = response.next_cursor
    }
    

    const data = rows.map((row) => {
        const customer = {
            id: row.id,
            name: row.properties[titlePropName].title[0].text.content,
        }

        return customer
    })

    return data
}

const customers = await getData(dbs.customers, "Name");
const products = await getData(dbs.products, "Product Name");

const salesDataFilter = {
    property: "Customer",
    relation: {
        is_empty: true
    }
}

const sales = await getData(dbs.sales, "Order ID", salesDataFilter);

sales.forEach((sale) => {
    console.log(sale.name)

    notion.pages.update({
        page_id: sale.id,
        properties: {
            Customer: {
                relation: [
                    {
                        id: customers[Math.floor(Math.random() * customers.length)].id
                    }
                ]
            },
            Product: {
                relation: [
                    {
                        id: products[Math.floor(Math.random() * products.length)].id
                    }
                ]
            }
        }
    })
})

