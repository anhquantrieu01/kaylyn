type PostLink = {
  title: string
  slug: string
}

export function autoInternalLink(
  html: string,
  posts: PostLink[],
  currentSlug: string
) {

  let result = html

  posts.forEach(post => {

    if (post.slug === currentSlug) return

    const keyword = post.title.split(" ").slice(0, 3).join(" ")
    const url = `/blog/${post.slug}`

    const regex = new RegExp(`(${keyword})`, "i")

    if (!result.includes(`href="${url}"`)) {
      result = result.replace(
        regex,
        `<a href="${url}" class="text-blue-600 underline">$1</a>`
      )
    }

  })

  return result
}