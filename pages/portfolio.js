import Link from 'next/link'
import projectsData from '../data/projects.json'
import { Card, Button } from 'react-bootstrap'

export async function getStaticProps() {
  return {
    props: {
      projects: projectsData,
    },
  }
}

export default function Portfolio({ projects }) {
  return (
    <div className="py-5">
      <h1 className="display-4 fw-bold mb-4 text-center">My Projects</h1>
      <div className="row">
        {projects.map((project) => (
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
    </div>
  )
}
