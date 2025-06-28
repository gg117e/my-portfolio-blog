import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import slug from 'remark-slug'
import { visit } from 'unist-util-visit'
import GithubSlugger from 'github-slugger'

const postsDirectory = path.join(process.cwd(), 'posts')
console.log('Posts Directory:', postsDirectory)

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  const slugger = new GithubSlugger()
  const headings = []

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(() => {
      return (tree) => {
        visit(tree, 'heading', (node) => {
          const text = node.children
            .filter((n) => n.type === 'text')
            .map((n) => n.value)
            .join('')
          const level = node.depth
          const slug = slugger.slug(text)
          headings.push({ level, text, slug })
        })
      }
    })
    .use(slug)
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    headings,
    ...matterResult.data,
  }
}