import { page_props, page_meta } from 'notion-helper'

// Create a parent database object:

const database_id = "41e42f70a1ec4a6c917045f4ed6c930a"

const parent = page_meta.parent.createMeta({
    id: database_id,
    type: "database_id"
})

// Or do it faster wth a shorthand function

import { parentDb } from 'notion-helper'

const parent = parentDb(database_id)

// Set a date property's value:

const startDate = "09/13/2024" // MM/DD/YYYY dates get auto-converted!

const dateProp = page_props.date.setProp(startDate)

// Or do it faster with a shorthand function,
// and pass an end date while you're at it

import { date } from 'notion-helper'

const endDate = "09/17/2024"

const dateProp = date(startDate, endDate)