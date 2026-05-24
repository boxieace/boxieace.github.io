import { useState } from 'react'

const projects = [
  {
    title: '3D Printed Robot Chassis',
    type: 'Robotics',
    note: 'Testing wheel spacing, battery placement, and sensor mounts.',
    tags: ['CAD', 'FDM print', 'V1 prototype'],
  },
  {
    title: 'Gear Train Experiments',
    type: 'Mechanical',
    note: 'Learning how gear size changes speed, torque, and print tolerance.',
    tags: ['Fusion 360', 'Tolerances', 'Motion'],
  },
  {
    title: 'Arduino Sensor Rig',
    type: 'Electronics',
    note: 'A breadboard setup for reading sensors before adding them to a robot.',
    tags: ['Arduino', 'Breadboard', 'Testing'],
  },
]

const tools = ['Fusion 360', 'Onshape', 'Arduino', 'Python', '3D printing', 'Hand tools']

const templates = [
  {
    id: 'notebook',
    name: 'Maker Notebook',
    short: 'Build logs, sketches, experiments, and lessons learned.',
  },
  {
    id: 'workshop',
    name: 'Workshop Wall',
    short: 'A neat project board with tools, parts, and build tiles.',
  },
  {
    id: 'binder',
    name: 'Project Binder',
    short: 'Simple school portfolio pages with clean project reports.',
  },
  {
    id: 'lab',
    name: 'Prototype Lab',
    short: 'A lightweight lab dashboard for projects and model viewers.',
  },
  {
    id: 'gallery',
    name: 'Build Gallery',
    short: 'Photo-first, casual, and personal.',
  },
]

function App() {
  const [activeTemplate, setActiveTemplate] = useState(templates[0].id)

  return (
    <main className="appShell">
      <header className="templateHeader">
        <div>
          <p className="kicker">Boxieace portfolio drafts</p>
          <h1>Pick a direction, then we can tune it.</h1>
        </div>
        <p>
          Five different starter designs for a grade 9 engineering portfolio.
          They use the same project content so the style is easier to compare.
        </p>
      </header>

      <nav className="templatePicker" aria-label="Template picker">
        {templates.map((template) => (
          <button
            className={activeTemplate === template.id ? 'active' : ''}
            key={template.id}
            onClick={() => setActiveTemplate(template.id)}
            type="button"
          >
            <span>{template.name}</span>
            <small>{template.short}</small>
          </button>
        ))}
      </nav>

      <TemplatePreview id={activeTemplate} />
    </main>
  )
}

function TemplatePreview({ id }) {
  const previews = {
    notebook: <MakerNotebook />,
    workshop: <WorkshopWall />,
    binder: <ProjectBinder />,
    lab: <PrototypeLab />,
    gallery: <BuildGallery />,
  }

  return <section className="previewStage">{previews[id]}</section>
}

function MakerNotebook() {
  return (
    <article className="template notebook">
      <div className="notebookHero">
        <div>
          <p className="handLabel">Engineering notebook</p>
          <h2>Hi, I&apos;m Boxieace. I make robots, printed parts, and small prototypes.</h2>
          <p>
            This version is more about the process: what I tried, what broke,
            what I changed, and what I want to build next.
          </p>
        </div>
        <img src="/engineering-workbench.png" alt="Engineering workbench" />
      </div>
      <div className="logGrid">
        {projects.map((project, index) => (
          <section className="logEntry" key={project.title}>
            <span>Entry {index + 1}</span>
            <h3>{project.title}</h3>
            <p>{project.note}</p>
            <ul>
              <li>Goal: make one working version</li>
              <li>Next: add real photos and test notes</li>
            </ul>
          </section>
        ))}
      </div>
    </article>
  )
}

function WorkshopWall() {
  return (
    <article className="template workshop">
      <div className="workshopTop">
        <div>
          <p className="kicker">Workshop wall</p>
          <h2>Parts, tools, and projects in progress.</h2>
        </div>
        <div className="toolRack">
          {tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      </div>
      <div className="pegboard">
        {projects.map((project) => (
          <section className="partBin" key={project.title}>
            <p>{project.type}</p>
            <h3>{project.title}</h3>
            <span>{project.note}</span>
          </section>
        ))}
      </div>
    </article>
  )
}

function ProjectBinder() {
  return (
    <article className="template binder">
      <aside className="binderTabs">
        <span>About</span>
        <span>Projects</span>
        <span>Skills</span>
        <span>Contact</span>
      </aside>
      <div className="binderPage">
        <p className="kicker">Project binder</p>
        <h2>Engineering portfolio</h2>
        <p>
          A straightforward layout for school, clubs, competitions, or anyone
          who wants to quickly understand what each project does.
        </p>
        <div className="reportList">
          {projects.map((project) => (
            <section className="reportRow" key={project.title}>
              <div>
                <h3>{project.title}</h3>
                <p>{project.note}</p>
              </div>
              <span>{project.type}</span>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}

function PrototypeLab() {
  return (
    <article className="template lab">
      <div className="labHeader">
        <div>
          <p className="kicker">Prototype lab</p>
          <h2>Project tests, model files, and build notes.</h2>
        </div>
        <div className="statusBox">
          <span>Next feature</span>
          <strong>3D model viewer</strong>
        </div>
      </div>
      <div className="labGrid">
        <section className="modelViewerMock">
          <div className="modelShape" />
          <p>STL / OBJ / GLB preview area</p>
        </section>
        <section className="labPanel">
          <h3>How project assets could work</h3>
          <p>
            Put files in <code>public/projects/project-name/</code>, then show
            photos, SVG sketches, downloadable STLs, and an inspectable 3D model.
          </p>
          <div className="fileList">
            <span>chassis.glb</span>
            <span>bracket.stl</span>
            <span>wiring-sketch.svg</span>
          </div>
        </section>
      </div>
    </article>
  )
}

function BuildGallery() {
  return (
    <article className="template gallery">
      <div className="galleryHero">
        <img src="/engineering-workbench.png" alt="Engineering workbench" />
        <div>
          <p className="kicker">Build gallery</p>
          <h2>Stuff I made, tested, fixed, and learned from.</h2>
          <p>
            This style is the most casual: photos first, short captions, and
            simple notes that sound like a real student made them.
          </p>
        </div>
      </div>
      <div className="photoGrid">
        {projects.map((project) => (
          <section className="photoCard" key={project.title}>
            <div className="photoPlaceholder">{project.type}</div>
            <h3>{project.title}</h3>
            <p>{project.note}</p>
          </section>
        ))}
      </div>
    </article>
  )
}

export default App
