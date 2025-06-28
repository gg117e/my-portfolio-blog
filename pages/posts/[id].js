import { getAllPostIds, getPostData } from '../../lib/posts'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}

export default function Post({ postData }) {
  return (
    <div className="py-5">
      <h1 className="display-4 fw-bold mb-3 text-center">{postData.title}</h1>
      <p className="text-muted text-center mb-4">{postData.date}</p>
      <div className="card bg-dark text-white border-secondary p-4">
        <div className="card-body">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </div>
      </div>
    </div>
  )
}
