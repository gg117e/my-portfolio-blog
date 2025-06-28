import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

export default function Blog({ allPostsData }) {
  return (
    <div className="py-5">
      <h1 className="display-4 fw-bold mb-4 text-center">Blog</h1>
      <section className="mt-4">
        <h2 className="h3 mb-3">Latest Posts</h2>
        <ul className="list-unstyled row">
          {allPostsData.map(({ id, date, title }) => (
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
