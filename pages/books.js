import Head from 'next/head'
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/Books.module.css'

export async function getStaticProps() {
  const booksData = await import('../data/books.json')
  return {
    props: {
      booksData: booksData.default,
    },
  }
}

export default function Books({ booksData }) {
  return (
    <>
      <Head>
        <title>Reading List</title>
      </Head>
      <h1>Reading List</h1>
      <ul className={styles.bookList}>
          {booksData.map(({ id, title, author, date, description, blogPostPath }) => (
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
      
    </>
  )
}