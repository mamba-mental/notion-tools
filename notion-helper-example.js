import "dotenv/config";
import { Client } from "@notionhq/client";
import { createNotion } from "notion-helper";
import { buildRichTextObj } from "../../Pipedream Actions/notion-helper/rich-text.mjs";

const secret = process.env.API_TESTER_CIG_SECRET;

const notion = new Client({ auth: secret });

const database_id = "41e42f70a1ec4a6c917045f4ed6c930a";

const album2 = {
    name: "A Pretty Face to Ruin Everything",
    artist: "Airplane Mode",
    release_date: "03/14/2020",
    cover: "https://i.imgur.com/d3BBFhF.jpeg",
    tracks: [
        "When the Lights Go Out",
        "West Coast",
        "Candy Store",
        "Pedestal",
        "She's Asleep",
        "The Ledge, Pt. 1",
        "Anastasia",
        "For the Moment",
        "I Know",
        "While My Guitar Gently Weeps",
        "The Ledge, Pt. 2",
        "Both Can Be True",
        "Forever, Again",
        "Everlong",
    ],
};

const album = {
    name: "Mandatory Fun",
    artist: `"Weird Al" Yankovic`,
    release_date: "07/15/2014",
    cover: "https://m.media-amazon.com/images/I/81cPt0wKVIL._UF1000,1000_QL80_.jpg",
    tracks: [
        {
            "No.": 1,
            Title: "Handy",
            "Writer(s)":
                "Amethyst Kelly\nCharlotte Aitchison\nGeorge Astasio\nJason Pebworth\nJonathan Shave\nKurtis McKenzie\nJon Turner\nAl Yankovic",
            "Parody of": 'Fancy" by Iggy Azalea featuring Charli XCX',
            Length: "2:56",
        },
        {
            "No.": 2,
            Title: "Lame Claim to Fame",
            "Writer(s)": "Yankovic",
            "Parody of": "Style parody of Southern Culture on the Skids[79]",
            Length: "3:45",
        },
        {
            "No.": 3,
            Title: "Foil",
            "Writer(s)": "Joel Little\nElla Yelich-O'Connor\nYankovic",
            "Parody of": 'Royals" by Lorde',
            Length: "2:22",
        },
        {
            "No.": 4,
            Title: "Sports Song",
            "Writer(s)": "Yankovic",
            "Parody of": "Style parody of college football fight songs[25]",
            Length: "2:14",
        },
        {
            "No.": 5,
            Title: "Word Crimes",
            "Writer(s)":
                "Robin Thicke\nPharrell Williams\nClifford Harris Jr.\nMarvin Gaye1\nYankovic",
            "Parody of":
                'Blurred Lines" by Robin Thicke featuring T.I. and Pharrell Williams',
            Length: "3:43",
        },
        {
            "No.": 6,
            Title: "My Own Eyes",
            "Writer(s)": "Yankovic",
            "Parody of": "Style parody of Foo Fighters[79]",
            Length: "3:40",
        },
        {
            "No.": 7,
            Title: "Now That's What I Call Polka!",
            "Writer(s)": "showVarious writers:",
            "Parody of": "showA polka medley including:",
            Length: "4:05",
        },
        {
            "No.": 8,
            Title: "Mission Statement",
            "Writer(s)": "Yankovic",
            "Parody of": "Style parody of Crosby, Stills & Nash[79]",
            Length: "4:28",
        },
        {
            "No.": 9,
            Title: "Inactive",
            "Writer(s)":
                "Alexander Grant\nDaniel Reynolds\nDaniel Sermon\nBenjamin McKee\nJoshua Mosser\nYankovic",
            "Parody of": 'Radioactive" by Imagine Dragons',
            Length: "2:56",
        },
        {
            "No.": 10,
            Title: "First World Problems",
            "Writer(s)": "Yankovic",
            "Parody of": "Style parody of Pixies[79]",
            Length: "3:13",
        },
        {
            "No.": 11,
            Title: "Tacky",
            "Writer(s)": "Williams\nYankovic",
            "Parody of": 'Happy" by Pharrell Williams',
            Length: "2:53",
        },
        {
            "No.": 12,
            Title: "Jackson Park Express",
            "Writer(s)": "Yankovic",
            "Parody of": "Style parody of Cat Stevens[79]",
            Length: "9:05",
        },
    ],
};

const page = createNotion()
    .parentDb(database_id)
    .title("Name", album.name)
    .heading1("Tracklist")
    .startParent("table", {
        has_column_header: true,
        rows: [["No", "Title", "Writer(s)", "Length"]],
    })
    .loop((page, track) => {
        page.tableRow([
            track["No."], track.Title, track["Writer(s)"], track.Length
        ])
    }, album.tracks)
    .endParent()
    .build();

const response = notion.pages.create(page.content);

const listItems = album.tracks.map((item) => ({
    numbered_list_item: {
        rich_text: [
            {
                text: {
                    content: item.Title,
                },
            },
        ],
    },
}));

function getISODate(dateString) {
    return new Date(dateString).toISOString();
}

const page2 = {
    parent: {
        database_id: database_id,
    },
    properties: {
        Name: {
            title: [
                {
                    text: {
                        content: album.name,
                    },
                },
            ],
        },
        Artist: {
            rich_text: [
                {
                    text: {
                        content: album.artist,
                    },
                },
            ],
        },
        Released: {
            date: {
                start: getISODate(album.release_date),
            },
        },
    },
    children: [
        {
            heading_1: {
                rich_text: [
                    {
                        text: {
                            content: "Tracklist",
                        },
                    },
                ],
            },
        },
        ...listItems,
        {
            heading_1: {
                rich_text: [
                    {
                        text: {
                            content: "Album Art",
                        },
                    },
                ],
            },
        },
        {
            image: {
                external: {
                    url: album.cover,
                },
            },
        },
    ],
};


// const page3 = createNotion()
//     .parentDb(database_id)
//     .title("Name", album.name)
//     .richText("Artist", album.artist)
//     .date("Released", album.release_date)
//     .heading1("Tracklist")
//     .startParent("table", {
//         has_column_header: true,
//         rows: [["No", "Title", "Writer(s)", "Length"]],
//     })
//     .loop((page, track) => {
//         builder.tableRow([
//             track["No."], track.Title, track["Writer(s)"], track.Length
//         ])
//     }, album.tracks)
//     .endParent()
//     .heading1("Simple Tracklist")
//     .loop("numbered_list_item", simpleAlbum.tracks)
//     .heading1("Album Art")
//     .image(album.cover)
//     .build();
