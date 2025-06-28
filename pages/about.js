export default function About() {
  return (
    <div className="py-5">
      <h1 className="display-4 fw-bold mb-3 text-center">About Me</h1>
      <p className="lead text-center">Hello! I am a passionate software engineer with experience in web development. I enjoy learning new technologies and building useful applications.</p>
      <p className="text-center">This section will contain more details about my background, skills, and interests.</p>
      <div className="row mt-5">
        <div className="col-md-6 mx-auto">
          <h3>My Skills</h3>
          <ul>
            <li>JavaScript (React, Next.js)</li>
            <li>Python (Django, Flask)</li>
            <li>Node.js (Express)</li>
            <li>Databases (PostgreSQL, MongoDB)</li>
            <li>Cloud Platforms (AWS, GCP)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
