import "dotenv/config";
import { Client } from "@notionhq/client";
const secret = process.env.API_TESTER_CIG_SECRET;
const notion = new Client({ auth: secret });
const database_id = "41e42f70a1ec4a6c917045f4ed6c930a";

const album = {
    name: "Mandatory Fun",
    artist: `"Weird Al" Yankovic`,
    release_date: "07/15/2014",
    cover: "https://m.media-amazon.com/images/I/81cPt0wKVIL._UF1000,1000_QL80_.jpg",
    tracks: [
        "Handy (Parody of Fancy by Iggy Azalea)",
        "Lame Claim to Fame (Style Parody of Southern Culture on the Skids)",
        "Foil (Parody of Royals by Lorde)",
        "Sports Song (Style Parody of College Football Fight Songs)",
        "Word Crimes (Parody of Blurred Lines by Robin Thicke)",
        "My Own Eyes (Style Parody of Foo Fighters)",
        "NOW That’s What I Call Polka!",
        "Mission Statement (Style Parody of Crosby, Stills & Nash)",
        "Inactive (Parody of Radioactive by Imagine Dragons)",
        "First World Problems (Style Parody of Pixies)",
        "Tacky (Parody of Happy by Pharrell Williams)",
        "Jackson Park Express (Style Parody of Cat Stevens)"
    ]
}

const listItems = album.tracks.map((track) => ({
    numbered_list_item: {
        rich_text: [
            {
                text: {
                    content: track,
                },
            },
        ],
    },
}));

function getISODate(dateString) {
    return new Date(dateString).toISOString();
}

const page = {
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

const response = notion.pages.create(page);