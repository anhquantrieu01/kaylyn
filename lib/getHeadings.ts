export function getHeadings(html: string) {

  const regex = /<h2.*?>(.*?)<\/h2>/g

  const headings = []

  let match

  while ((match = regex.exec(html)) !== null) {
    headings.push(match[1])
  }

  return headings
}