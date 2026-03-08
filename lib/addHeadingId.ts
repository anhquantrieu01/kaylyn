export function addHeadingId(html: string) {

  let index = 0

  return html.replace(/<h2>(.*?)<\/h2>/g, (_, text) => {

    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9à-ỹ\s]/g, "")
      .trim()
      .replace(/\s+/g, "-")

    return `<h2 id="${id}-${index++}">${text}</h2>`
  })
}