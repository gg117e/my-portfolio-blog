import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import { useState, useMemo } from 'react'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData() // サーバーサイドで全ての記事データを取得
  return {
    props: {
      allPostsData,
    },
  }
}

export default function Blog({ allPostsData }) {
  const [sortOrder, setSortOrder] = useState('desc') // 'desc' (新しい順) または 'asc' (古い順)

  // クライアントサイドでソート
  const sortedPosts = useMemo(() => {
    const sorted = [...allPostsData].sort((a, b) => {
      if (sortOrder === 'desc') {
        if (a.date < b.date) {
          return 1
        } else {
          return -1
        }
      }
      // sortOrder === 'asc'
      if (a.date > b.date) {
        return 1
      } else {
        return -1
      }
    })
    return sorted
  }, [allPostsData, sortOrder])

  return (
    <div className="py-5">
      <h1 className="display-4 fw-bold mb-4 text-center">Blog</h1>
      <section className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h3 mb-0">Posts</h2>
          <select
            className="form-select w-auto"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">新しい順</option>
            <option value="asc">古い順</option>
          </select>
        </div>

        <ul className="list-unstyled row">
          {sortedPosts.map(({ id, date, title }) => (
            <li key={id} className="col-md-6 col-lg-4 mb-4">
              <div className="card bg-dark text-white h-100 border-secondary">
                <div className="card-body">
                  <h5 className="card-title"><Link href={`/posts/${id}`} legacyBehavior><a className="text-decoration-none">{title}</a></Link></h5>
                  <p className="card-text"><small className="text-muted">{date}</small></p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}