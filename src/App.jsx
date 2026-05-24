const projects = [
  {
    title: '3D Printed Robot Chassis',
    type: 'Robotics',
    description:
      'A starter platform for testing wheel spacing, battery placement, and sensor mounts before adding electronics.',
    details: ['CAD layout', 'FDM printing', 'Iterative prototyping'],
  },
  {
    title: 'Gear Train Experiments',
    type: 'Mechanical design',
    description:
      'Printable gear sets for learning torque, speed, tolerance, and how tiny design changes affect motion.',
    details: ['Fusion 360', 'Tolerances', 'Motion testing'],
  },
  {
    title: 'Arduino Sensor Rig',
    type: 'Electronics',
    description:
      'A breadboard-based test station for reading sensors, logging values, and planning future robot behavior.',
    details: ['Arduino', 'Breadboarding', 'Data collection'],
  },
]

const tools = [
  'Fusion 360',
  'Onshape',
  '3D printing',
  'Arduino',
  'Python',
  'Soldering',
  'CAD sketches',
  'Mechanical testing',
]

const steps = [
  'Sketch the idea and decide what problem the build should solve.',
  'Make a rough CAD version, print or assemble the first prototype, then test it.',
  'Measure what changed, improve the design, and document the next version.',
]

function App() {
  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Boxieace home">
          Boxieace
        </a>
        <div className="navLinks">
          <a href="#projects">Projects</a>
          <a href="#tools">Tools</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <img
          className="heroImage"
          src="/engineering-workbench.png"
          alt="Engineering workbench with a small robot prototype, tools, and 3D printed parts"
        />
        <div className="heroOverlay" />
        <div className="heroContent">
          <p className="eyebrow">Grade 9 engineering portfolio</p>
          <h1>Robotics, 3D printing, and prototypes that keep getting better.</h1>
          <p className="intro">
            I build student engineering projects with CAD, printed parts,
            electronics, and a lot of testing. This site is where my best builds,
            notes, and lessons will live.
          </p>
          <div className="heroActions">
            <a className="button primary" href="#projects">
              View projects
            </a>
            <a className="button secondary" href="#contact">
              Get in touch
            </a>
          </div>
        </div>
      </section>

      <section className="section introGrid" aria-label="Portfolio highlights">
        <div>
          <p className="sectionLabel">Current focus</p>
          <h2>Building the habits of an engineer early.</h2>
        </div>
        <p>
          The goal is not just to show finished projects. It is to show how the
          idea changed, what failed, what got measured, and what the next version
          should do better.
        </p>
      </section>

      <section className="section" id="projects">
        <div className="sectionHeader">
          <p className="sectionLabel">Featured work</p>
          <h2>Project starting points</h2>
        </div>
        <div className="projectGrid">
          {projects.map((project) => (
            <article className="projectCard" key={project.title}>
              <div>
                <p className="projectType">{project.type}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="tagRow">
                {project.details.map((detail) => (
                  <span key={detail}>{detail}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split" id="tools">
        <div>
          <p className="sectionLabel">Workshop stack</p>
          <h2>Tools I use to turn ideas into working prototypes.</h2>
        </div>
        <div className="toolGrid">
          {tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      </section>

      <section className="section process">
        <div className="sectionHeader">
          <p className="sectionLabel">Process</p>
          <h2>How each project page can be written</h2>
        </div>
        <div className="stepGrid">
          {steps.map((step, index) => (
            <article className="step" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact" id="contact">
        <div>
          <p className="sectionLabel">Next update</p>
          <h2>Add real photos, CAD screenshots, and build notes.</h2>
          <p>
            Replace the starter cards with your actual projects as you collect
            images and write down what each version taught you.
          </p>
        </div>
        <a className="button primary" href="mailto:hello@example.com">
          Email me
        </a>
      </section>
    </main>
  )
}

export default App
