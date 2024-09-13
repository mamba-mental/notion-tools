// Create full page objects with a parent property, for page creation...
const page = createNotion().parentDb(database_id);

// or
const page = createNotion().parentPage(page_id);

// Create a page object with a page_id property, for updating props or doing reads...
const page = createNotion().pageId(page_id);

// Create a block object with a block_id property,
// for updating blocks or appending children...
const block = createNotion().blockId(block_id);

// Create a property object
const props = createNotion().title("Name", "Page title");

// Create an array of blocks
const blocks = createNotion().heading1("This is a heading")
    .paragraph("This is a paragraph!")
