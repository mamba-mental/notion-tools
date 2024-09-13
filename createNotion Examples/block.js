import { block } from 'notion-helper'
import { buildRichTextObj } from 'notion-helper'

const image = "https://i.imgur.com/5vSShIw.jpeg"

const imageBlock = block.image.createBlock(image)

// or add a caption...

const captionedImageBlock = block.image.createBlock({
    url: image,
    caption: "A dog wearing sunglasses"
})

// caption coerces to rich text, but you can also pass your own!
// buildRichTextObj() always returns an array, so make use of flat()

const richCaptionedImageBlock = block.image.createBlock({
    url: image,
    caption: [ 
        buildRichTextObj(
            "A dog wearing sunglasses ",
        ),
        buildRichTextObj(
            "(Source)",
            {},
            "https://i.imgur.com/5vSShIw.jpeg"
        )
    ].flat()
})

// block.image.createBlock() feel too verbose? Import the shorthand function!
// Every block has one, and they have the same names as the methods in createNotion()
import { image } from 'notion-helper'

const anotherImageBlock = image(image)