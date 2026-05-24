import { useEffect, useState } from 'react'

const contents = [
  { value: '01', label: 'About', href: '#about' },
  { value: '02', label: 'Projects', href: '#projects' },
  { value: '03', label: 'Skills', href: '#skills' },
  { value: '04', label: 'Build log', href: '#build-log' },
  { value: '05', label: 'Contact', href: '#contact' },
]

const projects = [
  {
    title: 'FRC Team NOVA 11270 Robotics Experience',
    type: 'Robotics chapter',
    tags: ['FRC', 'team systems', 'strategy', 'pit workflow'],
    problem:
      'Robotics competitions require more than a machine. The team needs organization, communication, branding, event setup, strategy, and people who understand how the system works under pressure.',
    process:
      'Contributed through team branding, human player experience, pit layout/design, outreach and sponsorship support, and competition preparation.',
    result:
      'Built a practical understanding of how engineering teams operate: technical work, presentation, logistics, and match strategy all connect.',
  },
  {
    title: 'NOVA 11270 Keychains and Pins',
    type: 'Small-batch manufacturing',
    tags: ['3D printing', 'AMS', 'batch production', 'team identity'],
    problem:
      'Team trading items needed to look sharp, match the NOVA identity, and be realistic to manufacture in batches without wasting time or material.',
    process:
      'Designed galaxy blue/purple keychains and pins for multi-colour printing, then organized production into containers for events and trading.',
    result:
      'Turned a team-branding idea into a repeatable fabrication workflow involving design, print-time planning, colour changes, and batch organization.',
  },
  {
    title: 'Bambu Lab P1S / AMS Optimization',
    type: 'Troubleshooting case study',
    tags: ['P1S', 'AMS', 'purge tuning', 'hotend diagnostics'],
    problem:
      'Multi-colour printing introduces real tradeoffs: purge waste, print time, colour transition quality, top-surface finish, and occasional temperature or hardware errors.',
    process:
      'Investigated purge settings, nozzle/hotend behavior, thermistor and temperature errors, print layout, and batch timing.',
    result:
      'Improved the reliability and efficiency of multi-colour prints while learning how machine setup affects final part quality.',
  },
  {
    title: 'Laser-Cut / CNC NOVA Magnet Design',
    type: 'Design constraints',
    tags: ['laser/CNC', 'connected geometry', '1.5 mm details', 'DFM'],
    problem:
      'A team-themed magnet had to work as a fabricated object, not just as a graphic. Floating pieces, overly small details, and disconnected geometry would fail.',
    process:
      'Reworked the design around manufacturable cut paths, connected cutout geometry, and minimum detail sizes around 1.5 mm.',
    result:
      'Produced a cleaner design direction shaped by fabrication constraints, material behavior, and real manufacturing limits.',
  },
  {
    title: 'Diamond Impact Engraving Research',
    type: 'Manufacturing research',
    tags: ['engraving', 'materials', 'machine setup', 'process testing'],
    problem:
      'Engraving quality depends on material, surface finish, depth, tip shape, and machine settings. Good results require process knowledge before cutting final parts.',
    process:
      'Researched impact engraving, diamond conical tips, engraving depth, and material compatibility including polycarbonate, acrylic, and powder-coated surfaces.',
    result:
      'Built a stronger understanding of engraving setup variables and how to approach manufacturing tests before committing to final materials.',
  },
  {
    title: 'Robotics Branding and Engineering Portfolio Planning',
    type: 'Technical communication',
    tags: ['visual identity', 'signage', 'documentation', 'portfolio system'],
    problem:
      'Engineering work needs to be understandable. Teams, mentors, sponsors, and programs need clear documentation, organized visuals, and a strong technical story.',
    process:
      'Worked on team visual identity, signage/pit presentation, project organization, and the structure for documenting fabrication and robotics work.',
    result:
      'Created a portfolio direction that connects engineering decisions, build constraints, and finished artifacts without making FRC the entire identity.',
  },
]

const toolchain = [
  {
    group: 'Robotics',
    items: ['FRC team workflow', 'competition strategy', 'mechanism thinking', 'pit organization'],
  },
  {
    group: 'Fabrication',
    items: ['Bambu P1S', 'AMS printing', 'laser/CNC design', 'diamond engraving research'],
  },
  {
    group: 'Design',
    items: ['CAD-style planning', 'manufacturing constraints', 'team branding', 'technical layouts'],
  },
  {
    group: 'Process',
    items: ['prototyping', 'batch production', 'troubleshooting', 'documentation'],
  },
]

const logbook = [
  ['01', 'Define', 'Start with a physical goal, a fabrication limit, or a system that needs to work in the real world.'],
  ['02', 'Constrain', 'Identify the limits: material, detail size, print time, machine setup, geometry, or event workflow.'],
  ['03', 'Prototype', 'Build a first version quickly enough to expose what is weak, unclear, or inefficient.'],
  ['04', 'Refine', 'Adjust the model, process, layout, or setup based on test results and manufacturing feedback.'],
  ['05', 'Document', 'Capture the result as a project record: problem, process, result, files, and next improvements.'],
]

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('isVisible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="siteShell">
      <BlueprintBackground />

      <header className="navBar">
        <a className="brandMark" href="#top" aria-label="Portfolio home">
          <span className="brandGlyph">BX</span>
          <span>
            Engineering Portfolio
            <small>builder / fabricator / student</small>
          </span>
        </a>

        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#build-log">Build log</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className={`themeSwitch ${theme}`} aria-label="Theme selector">
          <button
            className={theme === 'dark' ? 'active' : ''}
            onClick={() => setTheme('dark')}
            type="button"
            aria-pressed={theme === 'dark'}
          >
            Dark
          </button>
          <button
            className={theme === 'light' ? 'active' : ''}
            onClick={() => setTheme('light')}
            type="button"
            aria-pressed={theme === 'light'}
          >
            Light
          </button>
        </div>
      </header>

      <section className="heroSection" id="top">
        <div className="heroCopy reveal isVisible">
          <p className="eyebrow">Robotics / fabrication / design systems</p>
          <h1>Engineering student building at the intersection of robotics, fabrication, and design.</h1>
          <p>
            I build physical systems that combine design, fabrication, and
            problem-solving. My work focuses on turning rough ideas into
            testable, manufacturable projects through prototypes, constraints,
            iteration, and real-world testing.
          </p>
          <div className="heroActions">
            <a className="actionButton primary" href="#projects">
              View project records
            </a>
            <a className="actionButton secondary" href="#build-log">
              Read build process
            </a>
          </div>
        </div>

        <div className="engineeringBoard reveal isVisible" aria-label="Engineering dashboard preview">
          <div className="boardHeader">
            <span>Portfolio system</span>
            <strong>Fabrication archive</strong>
          </div>
          <div className="boardDiagram">
            <span className="axis xAxis" />
            <span className="axis yAxis" />
            <div className="machineBlock mainBlock">CAD</div>
            <div className="machineBlock blockA">PRINT</div>
            <div className="machineBlock blockB">CNC</div>
            <div className="machineBlock blockC">FRC</div>
          </div>
          <div className="measurementRail">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
          <div className="boardFooter">
            <span>constraints</span>
            <span>iteration</span>
            <span>manufacturing</span>
          </div>
        </div>
      </section>

      <section className="metricStrip reveal" aria-label="Portfolio contents">
        {contents.map((item) => (
          <a href={item.href} key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </a>
        ))}
      </section>

      <section className="aboutBoard reveal" id="about">
        <div>
          <p className="eyebrow">Identity</p>
          <h2>Not just a robotics profile. A developing engineering workspace.</h2>
        </div>
        <div className="aboutCopy">
          <p>
            This portfolio documents the systems, tools, and experiments I use
            to grow as an engineering student. FRC Team NOVA 11270 is an
            important chapter, but the larger direction is robotics,
            fabrication, aerospace-minded design, mechatronics, and
            manufacturing.
          </p>
          <p>
            The work here is intentionally practical: design for
            manufacturability, batch production, machine troubleshooting,
            branding as technical communication, and project records that show
            how an idea becomes something physical.
          </p>
        </div>
      </section>

      <section className="projectSection" id="projects">
        <div className="sectionHeader reveal">
          <p className="eyebrow">Project records</p>
          <h2>Technical spec sheets for real work.</h2>
          <p>
            Each record is framed as problem, process, and result so the
            portfolio shows engineering thinking instead of a list of finished
            objects.
          </p>
        </div>

        <div className="projectGrid">
          {projects.map((project, index) => (
            <article className="projectCard reveal" key={project.title}>
              <div className="projectIndex">{String(index + 1).padStart(2, '0')}</div>
              <div className="projectBody">
                <div className="projectHeading">
                  <span>{project.type}</span>
                  <h3>{project.title}</h3>
                </div>

                <div className="specColumns">
                  <section>
                    <h4>Problem</h4>
                    <p>{project.problem}</p>
                  </section>
                  <section>
                    <h4>Process</h4>
                    <p>{project.process}</p>
                  </section>
                  <section>
                    <h4>Result</h4>
                    <p>{project.result}</p>
                  </section>
                </div>

                <div className="tagRow">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="toolchainSection reveal" id="skills">
        <div className="sectionHeader compact">
          <p className="eyebrow">Toolchain</p>
          <h2>Engineering console, organized by workflow.</h2>
        </div>
        <div className="toolchainGrid">
          {toolchain.map((group) => (
            <article className="toolModule" key={group.group}>
              <h3>{group.group}</h3>
              <div>
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="logbookSection" id="build-log">
        <div className="sectionHeader reveal">
          <p className="eyebrow">Build logbook</p>
          <h2>A simple process for turning rough ideas into physical systems.</h2>
        </div>
        <div className="logbookRail">
          {logbook.map(([number, phase, text]) => (
            <article className="logbookItem reveal" key={phase}>
              <span>{number}</span>
              <h3>{phase}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="assetSection reveal">
        <div>
          <p className="eyebrow">Archive structure</p>
          <h2>Built to hold files, photos, notes, and fabrication references.</h2>
          <p>
            Future project folders can include STL files for printing, SVG files
            for laser/CNC work, process photos, CAD exports, and notes about
            settings, constraints, and revisions.
          </p>
        </div>
        <div className="assetList">
          <span>/projects/nova-keychains/</span>
          <span>/projects/magnet-design/</span>
          <span>/projects/engraving-research/</span>
          <span>/projects/p1s-ams-optimization/</span>
        </div>
      </section>

      <section className="contactSection reveal" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>For robotics mentors, engineering programs, and project collaborators.</h2>
          <p>
            Replace the placeholders with your real email, resume, GitHub, and
            project archive links as the portfolio fills in.
          </p>
        </div>
        <div className="contactActions">
          <a href="https://github.com/boxieace">GitHub</a>
          <a href="mailto:hello@example.com">Email</a>
          <a href="/resume.pdf">Resume</a>
          <a href="#projects">Projects</a>
        </div>
      </section>
    </main>
  )
}

function BlueprintBackground() {
  return (
    <div className="blueprintBackground" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  )
}

export default App
