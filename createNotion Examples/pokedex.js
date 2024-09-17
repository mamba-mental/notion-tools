const axios = require('axios')
const { Client } = require('@notionhq/client')
import { createNotion } from 'notion-helper'

const notion = new Client({auth: process.env.NOTION_KEY})

const pokeArray = []

async function getPokemon() {
  const start = 1
  const end = 10
  for (let i = start; i <= end; i++) {
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .then((poke) => {
      const typesRaw = poke.data.types
      const typesArray = []
      for (let type of typesRaw) {
        const typeObj = {
          "name": type.type.name
        }
        typesArray.push(typeObj)
      }

      const bulbURL = `https://bulbapedia.bulbagarden.net/wiki/${processedName
.replace(' ', '_')}_(Pokémon)`

      const sprite = (!poke.data.sprites.front_default) ? poke.data.sprites.other['official-artwork'].front_default : poke.data.sprites.front_default

      const pokeData = {
        "number": poke.data.id,
        "types": typesArray,
        "height": poke.data.height,
        "weight": poke.data.weight,
        "hp": poke.data.stats[0].base_stat,
        "attack": poke.data.stats[1].base_stat,
        "defense": poke.data.stats[2].base_stat,
        "special-attack": poke.data.stats[3].base_stat,
        "special-defense": poke.data.stats[4].base_stat,
        "speed": poke.data.stats[5].base_stat,
        "sprite": sprite,
        "artwork": poke.data.sprites.other['official-artwork'].front_default,
        "bulbURL": bulbURL
      }

      console.log(`Fetched ${pokeData.name}.`)

      pokeArray.push(pokeData)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  for (let pokemon of pokeArray) {
    const flavor = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.number}`)
      .then((flavor) => {

        pokemon.name = flavor.data.names.find(({language: { name }}) => name === "en").name
        pokemon['flavor-text'] = flavor.data.flavor_text_entries.find(({language: { name }}) => name === "en").flavor_text.replace(/\n|\f|\r/g, " ")
        pokemon.category = flavor.data.genera.find(({language: { name }}) => name === "en").genus
        pokemon.generation = flavor.data.generation.name.split(/-/).pop().toUpperCase()

        console.log(`Fetched flavor info for ${pokemon.name}.`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  createNotionPage();
}

getPokemon();

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
};

async function createNotionPage() {
  for (let pokemon of pokeArray) {
    
    const date = createNotion()
        .parentDb(process.env.NOTION_DATABASE_ID)
        .icon(pokemon.sprite)
        .cover(pokemon.artwork)
        .title("Name", pokemon.name)
        .richText("Category", pokemon.category)
        .number("No", pokemon.number)
        .multiSelect("Type", pokemon.types)
        .select("Generation", pokemon.generation)
        .files("Sprite", pokemon.sprite)
        .number("Height", pokemon.height)
        .number("Weight", pokemon.weight)
        .number("HP", pokemon.hp)
        .number("Attack", pokemon.attack)
        .number("Defense", pokemon.defense)
        .number("Sp. Attack", pokemon['special-attack'])
        .number("Sp. Defense", pokemon['special-defense'])
        .number("Speed", pokemon.speed)
        .quote(pokemon['flavor-text'])
        .paragraph("")
        .paragraph("View This Pokémon's Entry on Bulbapedia:")
        .bookmark(pokemon.bulbURL)

    await sleep(50)
    
    console.log(`Sending ${pokemon.name} to Notion`)
    const response = await notion.pages.create( data )
    console.log(response)
  }

  console.log(`Operation complete.`)
}