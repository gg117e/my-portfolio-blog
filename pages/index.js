import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import projectsData from '../data/projects.json'
import { Card, Button } from 'react-bootstrap'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  const latestPosts = allPostsData.slice(0, 3) // 最新の3件
  const featuredProjects = projectsData.slice(0, 3) // 注目の3件

  return {
    props: {
      latestPosts,
      featuredProjects,
    },
  }
}

export default function Home({ latestPosts, featuredProjects }) {
  return (
    <div className="py-5">
      {/* Hero Section */}
      <section className="text-center mb-5">
        <h1 className="display-3 fw-bold mb-3 text-primary">Genko's Dev Portfolio & Blog</h1>
        <p className="lead mb-4">学習と開発の旅を記録し、私のプロジェクトとスキルを紹介します。</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
          <Link href="/portfolio" legacyBehavior><Button variant="outline-info" size="lg">プロジェクトを見る</Button></Link>
          <Link href="/blog" legacyBehavior><Button variant="outline-light" size="lg">ブログを読む</Button></Link>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="mb-5">
        <h2 className="text-center mb-4 display-5 fw-bold">最新の学習記録</h2>
        <div className="row justify-content-center">
          {latestPosts.map(({ id, date, title }) => (
            <div key={id} className="col-md-6 col-lg-4 mb-4">
              <Card bg="dark" text="white" className="h-100 border-secondary">
                <Card.Body>
                  <Card.Title><Link href={`/posts/${id}`} legacyBehavior><a className="text-decoration-none">{title}</a></Link></Card.Title>
                  <Card.Text><small className="text-muted">{date}</small></Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link href="/blog" legacyBehavior><Button variant="outline-light">すべての記事を見る</Button></Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <h2 className="text-center mb-4 display-5 fw-bold">注目のプロジェクト</h2>
        <div className="row justify-content-center">
          {featuredProjects.map((project) => (
            <div key={project.id} className="col-md-6 col-lg-4 mb-4">
              <Card bg="dark" text="white" className="h-100 border-secondary">
                <Card.Img variant="top" src={project.image} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{project.title}</Card.Title>
                  <Card.Text className="flex-grow-1">{project.description}</Card.Text>
                  <Button variant="outline-info" href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link href="/portfolio" legacyBehavior><Button variant="outline-light">すべてのプロジェクトを見る</Button></Link>
        </div>
      </section>
    </div>
  )
}
