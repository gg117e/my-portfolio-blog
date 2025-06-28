import Head from 'next/head'
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/Books.module.css'
import { useState, useMemo } from 'react'

export async function getStaticProps() {
  const booksData = await import('../data/books.json')
  return {
    props: {
      booksData: booksData.default,
    },
  }
}

export default function Books({ booksData }) {
  const [searchQuery, setSearchQuery] = useState('')

  // クライアントサイドでフィルタリング
  const filteredBooks = useMemo(() => {
    return booksData.filter((book) => {
      const searchContent = `${book.title} ${book.author} ${book.description || ''}`.toLowerCase()
      return searchContent.includes(searchQuery.toLowerCase())
    })
  }, [booksData, searchQuery])

  return (
    <>
      <Head>
        <title>Reading List</title>
      </Head>
      <h1 className="display-4 fw-bold mb-4 text-center">Reading List</h1>
      <div className="mb-3 input-group"> {/* input-group を追加 */}
        <span className="input-group-text">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--text-muted-color)" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search books by title, author, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ul className={styles.bookList}>
          {filteredBooks.map(({ id, title, author, date, description, blogPostPath }) => (
            <li className={styles.bookItem} key={id}>
              <div className={styles.bookInfo}>
                <h3 className={styles.bookTitle}>{title}</h3>
                <p className={styles.bookAuthor}>著者: {author}</p>
                <p className={styles.bookDate}>読了日: {date}</p>
                <p className={styles.bookDescription}>{description}</p>
                {blogPostPath && (
                  <Link href={blogPostPath} className={styles.readMore}>
                    詳細を見る
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
        {filteredBooks.length === 0 && (
          <p className="text-center text-muted mt-5">No books found.</p>
        )}
    </>
  )
}