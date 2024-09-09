// Used in a Pipedream script. Placed here to retain the constructor functions as a reference.
import collect from 'collect.js';
import dayjs from 'dayjs'

function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "..."
  }

  return str
}

function rtoConstructor(text, opts, url) {
  return {
    type: "text",
    text: {
      content: truncateString(text),
      ...(url && url.length > 0 && {
        link: {
          url: url
        }
      }),
    },
    annotations: { ...opts }
  }
}

function blockConstructor(type, rtoArray) {
  // Check if rtoArray.length > 100
  const rtoCollection = collect(rtoArray)
  const rtos = rtoCollection.chunk(100)

  const blocks = []

  for (let rto of rtos) {
    const block = {
      type: type,
      [type]: {
        rich_text: rto
      }
    }

    blocks.push(block)
  }

  return blocks
  
}

function headingConstructor(blockArray, title, url) {
    return {
        type: "heading_1",
        heading_1: {
            rich_text: [
                rtoConstructor(title, null, url)
            ],
            is_toggleable: true,
            children: blockArray
        }
    }
}

function createURLSeparatedLineArray(line, regex) {
  const result = []
  let match
  let lastIndex = 0

  if (line === '\n' || line.length === 0) {
    result.push(rtoConstructor("\n"))
  } else {
    const matches = line.matchAll(regex)

    for (match of matches) {
      if (match.index > lastIndex) {
        const nonURLLine = line.substring(lastIndex, match.index)
        const nonURLobj = rtoConstructor(nonURLLine)
        result.push(nonURLobj)
      }
  
      const URLobj = rtoConstructor(match[0], { color: "yellow_background" }, match[0].trim())
      result.push(URLobj)
  
      lastIndex = match.index + match[0].length
    }
  
    if (lastIndex < line.length) {
      const lastNonURLLine = line.substring(lastIndex)
      const lastNonURLobj = rtoConstructor(lastNonURLLine)
      result.push(lastNonURLobj)
    }
  }

  return result
}

export default defineComponent({
  async run({ steps, $ }) {
    const videos = steps.get_all_channel_videos.$return_value
    const urlRegex = /(?:https?:\/\/)?(?:www\.)?[\w.-]+\.(?:com|net|io|dev|co|me|us|org|edu|gov|info|biz|ai|ly|tv|uk|be|page|sh|app|club|site|gg)(?:\/[^\s]*)?/g;


    const videoArray = []
    for (let video of videos) {
      const descriptionLines = video.snippet.description.split(
        /(\n)/
      )

      const descriptionArray = descriptionLines.map((line) => {
        return createURLSeparatedLineArray(line, urlRegex)
      })

      const publishDate = `Published: ${dayjs(video.snippet.publishedAt).format('MMMM D, YYYY')}`

      const description = blockConstructor("paragraph", descriptionArray.flat())
      const publishBlock = blockConstructor("paragraph", [rtoConstructor(publishDate)])
      const videoBody = [...publishBlock, ...description]

      const titleToggle = headingConstructor(videoBody, video.snippet.title, `https://www.youtube.com/watch?v=${video.contentDetails.videoId}`)

      
      
      // const item = {
      //   title: blockConstructor("heading_2", [rtoConstructor(video.snippet.title, null, `https://www.youtube.com/watch?v=${video.contentDetails.videoId}`)]),
      //   published: blockConstructor("paragraph", [rtoConstructor(publishDate)]),
      //   description: blockConstructor("paragraph", descriptionArray.flat())
      // }

      videoArray.push(titleToggle)
    }

    // const childBlocks = [...videoArray.map((video) => {
    //   return Object.values(video)
    // })].flat().flat()

    return videoArray
  },
})