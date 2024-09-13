import "dotenv/config";
import "./logger.js";
import { logSessionCloser } from "./logger.js";
import retry from "async-retry";
import { buildRichTextObj,
    page_meta,
    page_props,
    quickPages,
    block,
    createNotion } from "notion-helper";
import { Client, LogLevel } from "@notionhq/client";

// const {
//     buildRichTextObj,
//     page_meta,
//     page_props,
//     quickPages,
//     block,
//     createNotion,
// } = NotionHelper;

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
        children: [],
    });
}

const database_id = "41e42f70a1ec4a6c917045f4ed6c930a";

const tasks = [
    {
        icon: "🔨",
        cover: "https://i.imgur.com/5vSShIw.jpeg",
        task: "Build Standing Desk",
        due: "2024-09-10",
        status: "Not started",
    },
    {
        task: "Mount Overhead Lights",
        due: "2024-09-11",
        status: "Not started",
        children: [
            "Mount clamp to joist and tighten",
            "Attach arm to clamp",
            "Mount video light to arm",
            "Run power cable through ceiling panels",
        ],
    },
    { task: "Set Up Camera", due: "2024-09-11", status: "Not started" },
];

const propertySchema = {
    album: ["Name", "title"],
    year: ["Year", "number"],
    US_peak_chart_post: ["US Peak", "number"],
};

// const pages = quickPages({
//     parent: database_id,
//     parent_type: "database_id",
//     pages: albums,
//     schema: propertySchema,
//     childrenFn: (value) =>
//         value.map((line) =>
//             block.to_do.createBlock({ rtArray: buildRichTextObj(line) })
//         ),
// });

const transcript = []

for (let i = 0; i < 300; i++) {
    const line = `This is sentence #${i}.`
    if (i === 0) {
        console.log(line)
    }
    transcript.push(line)
}

const page = createNotion()
    .parentDb(database_id)
    .title("Name", "Long Transcript")
    .loop('paragraph', transcript)
    .build()

console.dir(page, { depth: null})


const pageResponse = await notion.pages.create(page.content)

for (let chunk of page.additionalBlocks) {
    const appended = await notion.blocks.children.append({
        block_id: pageResponse.id,
        children: chunk
    })
}



// const simpleAlbum = {
//     name: "Mandatory Fun",
//     artist: `"Weird Al" Yankovic`,
//     release_date: "07/15/2014",
//     cover: "https://m.media-amazon.com/images/I/81cPt0wKVIL._UF1000,1000_QL80_.jpg",
//     tracks: [
//         "Handy (Parody of Fancy by Iggy Azalea)",
//         "Lame Claim to Fame (Style Parody of Southern Culture on the Skids)",
//         "Foil (Parody of Royals by Lorde)",
//         "Sports Song (Style Parody of College Football Fight Songs)",
//         "Word Crimes (Parody of Blurred Lines by Robin Thicke)",
//         "My Own Eyes (Style Parody of Foo Fighters)",
//         "NOW That’s What I Call Polka!",
//         "Mission Statement (Style Parody of Crosby, Stills & Nash)",
//         "Inactive (Parody of Radioactive by Imagine Dragons)",
//         "First World Problems (Style Parody of Pixies)",
//         "Tacky (Parody of Happy by Pharrell Williams)",
//         "Jackson Park Express (Style Parody of Cat Stevens)"
//     ]
// }

// const album = {
//     name: "Mandatory Fun",
//     artist: `"Weird Al" Yankovic`,
//     release_date: "07/15/2014",
//     cover: "https://m.media-amazon.com/images/I/81cPt0wKVIL._UF1000,1000_QL80_.jpg",
//     tracks: [
//         {
//             "No.": 1,
//             Title: "Handy",
//             "Writer(s)":
//                 "Amethyst Kelly\nCharlotte Aitchison\nGeorge Astasio\nJason Pebworth\nJonathan Shave\nKurtis McKenzie\nJon Turner\nAl Yankovic",
//             "Parody of": 'Fancy" by Iggy Azalea featuring Charli XCX',
//             Length: "2:56",
//         },
//         {
//             "No.": 2,
//             Title: "Lame Claim to Fame",
//             "Writer(s)": "Yankovic",
//             "Parody of": "Style parody of Southern Culture on the Skids[79]",
//             Length: "3:45",
//         },
//         {
//             "No.": 3,
//             Title: "Foil",
//             "Writer(s)": "Joel Little\nElla Yelich-O'Connor\nYankovic",
//             "Parody of": 'Royals" by Lorde',
//             Length: "2:22",
//         },
//         {
//             "No.": 4,
//             Title: "Sports Song",
//             "Writer(s)": "Yankovic",
//             "Parody of": "Style parody of college football fight songs[25]",
//             Length: "2:14",
//         },
//         {
//             "No.": 5,
//             Title: "Word Crimes",
//             "Writer(s)":
//                 "Robin Thicke\nPharrell Williams\nClifford Harris Jr.\nMarvin Gaye1\nYankovic",
//             "Parody of":
//                 'Blurred Lines" by Robin Thicke featuring T.I. and Pharrell Williams',
//             Length: "3:43",
//         },
//         {
//             "No.": 6,
//             Title: "My Own Eyes",
//             "Writer(s)": "Yankovic",
//             "Parody of": "Style parody of Foo Fighters[79]",
//             Length: "3:40",
//         },
//         {
//             "No.": 7,
//             Title: "Now That's What I Call Polka!",
//             "Writer(s)": "showVarious writers:",
//             "Parody of": "showA polka medley including:",
//             Length: "4:05",
//         },
//         {
//             "No.": 8,
//             Title: "Mission Statement",
//             "Writer(s)": "Yankovic",
//             "Parody of": "Style parody of Crosby, Stills & Nash[79]",
//             Length: "4:28",
//         },
//         {
//             "No.": 9,
//             Title: "Inactive",
//             "Writer(s)":
//                 "Alexander Grant\nDaniel Reynolds\nDaniel Sermon\nBenjamin McKee\nJoshua Mosser\nYankovic",
//             "Parody of": 'Radioactive" by Imagine Dragons',
//             Length: "2:56",
//         },
//         {
//             "No.": 10,
//             Title: "First World Problems",
//             "Writer(s)": "Yankovic",
//             "Parody of": "Style parody of Pixies[79]",
//             Length: "3:13",
//         },
//         {
//             "No.": 11,
//             Title: "Tacky",
//             "Writer(s)": "Williams\nYankovic",
//             "Parody of": 'Happy" by Pharrell Williams',
//             Length: "2:53",
//         },
//         {
//             "No.": 12,
//             Title: "Jackson Park Express",
//             "Writer(s)": "Yankovic",
//             "Parody of": "Style parody of Cat Stevens[79]",
//             Length: "9:05",
//         },
//     ],
// };

// const listItems = album.tracks.map((item) => ({
//     numbered_list_item: {
//         rich_text: [
//             {
//                 text: {
//                     content: item.Title,
//                 },
//             },
//         ],
//     },
// }));

// function getISODate(dateString) {
//     return new Date(dateString).toISOString();
// }

// const page = {
//     parent: {
//         database_id: database_id,
//     },
//     cover: {
//         external: {
//             url: album.cover,
//         },
//     },
//     properties: {
//         Name: {
//             title: [
//                 {
//                     text: {
//                         content: album.name,
//                     },
//                 },
//             ],
//         },
//         Artist: {
//             rich_text: [
//                 {
//                     text: {
//                         content: album.artist,
//                     },
//                 },
//             ],
//         },
//         Released: {
//             date: {
//                 start: getISODate(album.release_date),
//             },
//         },
//     },
//     children: [
//         {
//             heading_1: {
//                 rich_text: [
//                     {
//                         text: {
//                             content: "Tracklist",
//                         },
//                     },
//                 ],
//             },
//         },
//         ...listItems,
//         {
//             heading_1: {
//                 rich_text: [
//                     {
//                         text: {
//                             content: "Album Art",
//                         },
//                     },
//                 ],
//             },
//         },
//         {
//             image: {
//                 external: {
//                     url: album.cover,
//                 },
//             },
//         },
//     ],
// };

// const builder = createNotion()
//     .parentDb(database_id)
//     .title("Name", album.name)
//     .richText("Artist", album.artist)
//     .date("Released", album.release_date)
//     .heading1("Tracklist")
//     .startParent("table", {
//         has_column_header: true,
//         rows: [["No", "Title", "Writer(s)", "Parody of", "Length"]],
//     })
//     .loop((builder, track) => {
//         builder.tableRow([
//             track["No."], track.Title, track["Writer(s)"], track["Parody of"], track.Length
//         ])
//     }, album.tracks)
//     .endParent()
//     .heading1("Simple Tracklist")
//     .loop("numbered_list_item", simpleAlbum.tracks)
//     .heading1("Album Art")
//     .image(album.cover)
//     .build();

// console.dir(builder.content, { depth: null });
// const response = notion.pages.create(builder.content);