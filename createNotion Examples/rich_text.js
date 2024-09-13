import { buildRichTextObj } from 'notion-helper'

const line = "I will be king of the pirates!"

const richText = buildRichTextObj(line)

const higlighted = buildRichTextObj(line, { color: "yellow_background" })

const linked = buildRichTextObj(line, {}, "https://en.wikipedia.org/wiki/Monkey_D._Luffy")

// Or build equations

const equation = "\frac{{ - b \pm \sqrt {b^2 - 4ac} }}{{2a}}"

const richEquation = buildRichTextObj(equation, {}, null, "equation")