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
  const [searchQuery, setSearchQuery] = useState('') // 検索クエリを追加

  // クライアントサイドでソートとフィルタリング
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = allPostsData.filter((post) => {
      // タイトルと本文を検索対象にする
      const searchContent = `${post.title} ${post.content || ''}`.toLowerCase()
      return searchContent.includes(searchQuery.toLowerCase())
    })

    const sorted = filtered.sort((a, b) => {
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
  }, [allPostsData, sortOrder, searchQuery]) // searchQuery を依存配列に追加

  return (
    <div className="py-5">
      <h1 className="display-4 fw-bold mb-4 text-center">Blog</h1>
      <section className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h3 mb-0">Posts</h2>
          <div className="d-flex align-items-center"> {/* 検索とソートをまとめる */}
            <div className="input-group me-2"> {/* input-group を追加 */}
              <span className="input-group-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--text-muted-color)" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="form-select w-auto"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">新しい順</option>
              <option value="asc">古い順</option>
            </select>
          </div>
        </div>

        <ul className="list-unstyled row">
          {filteredAndSortedPosts.map(({ id, date, title }) => (
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
        {filteredAndSortedPosts.length === 0 && (
          <p className="text-center text-muted mt-5">No posts found.</p>
        )}
      </section>
    </div>
  )
}