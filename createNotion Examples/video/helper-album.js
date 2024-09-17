import "dotenv/config";
import { Client } from "@notionhq/client";
import { createNotion } from "notion-helper";

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

const page = createNotion()
    .parentDb(database_id)
    .title("Name", album.name)
    .richText("Artist", album.artist)
    .date("Released", album.release_date)
    .heading1("Tracklist")
    .loop("numbered_list_item", album.tracks)
    .heading1("Album Art")
    .image(album.cover)
    .build();

const response = notion.pages.create(page);