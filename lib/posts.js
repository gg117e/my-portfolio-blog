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

// order: 'desc' (新しい順) または 'asc' (古い順)
export function getSortedPostsData(order = 'desc') {
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

    // Combine the data with the id and content (本文)
    return {
      id,
      content: matterResult.content, // 本文を追加
      ...matterResult.data,
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (order === 'desc') {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    } else { // order === 'asc'
      if (a.date > b.date) {
        return 1
      } else {
        return -1
      }
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

// 新しいヘルパー関数を追加
export function getAllTags() {
  const allPostsData = getSortedPostsData()
  const tags = new Set()
  allPostsData.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => tags.add(tag))
    }
  })
  return Array.from(tags)
}

export function getAllCategories() {
  const allPostsData = getSortedPostsData()
  const categories = new Set()
  allPostsData.forEach((post) => {
    if (post.categories) {
      post.categories.forEach((category) => categories.add(category))
    }
  })
  return Array.from(categories)
}

export function getPostsByTag(tag) {
  const allPostsData = getSortedPostsData()
  return allPostsData.filter((post) => post.tags && post.tags.includes(tag))
}

export function getPostsByCategory(category) {
  const allPostsData = getSortedPostsData()
  return allPostsData.filter((post) => post.categories && post.categories.includes(category))
}