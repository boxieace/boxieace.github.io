import { useEffect, useState } from 'react'

const stats = [
  { value: '11270', label: 'FRC Team NOVA' },
  { value: '7', label: 'featured builds' },
  { value: 'CAD -> CAM', label: 'design workflow' },
]

const projects = [
  {
    title: 'FRC Team NOVA 11270 Robotics',
    category: 'Robotics team systems',
    summary:
      'Competition robotics experience across team branding, human player practice, pit layout, outreach, sponsorship work, and match strategy.',
    details: [
      'Helped connect technical work with team identity, presentation, and event readiness.',
      'Worked around real competition constraints: fast decisions, pit organization, teamwork, and communication.',
      'Built experience with how mechanical, electrical, strategy, and outreach roles fit together.',
    ],
    signal: 'Teamwork / strategy / competition',
  },
  {
    title: 'NOVA 11270 3D Printed Keychains & Pins',
    category: 'Design and batch production',
    summary:
      'Custom galaxy blue and purple team keychains and pins designed for events, trading, and team identity.',
    details: [
      'Designed parts for multi-colour 3D printing with clean top surfaces and readable team styling.',
      'Optimized batch layouts, print time, and organization into containers for event use.',
      'Turned a branding idea into a small manufacturing workflow.',
    ],
    signal: 'AMS printing / batching / identity',
  },
  {
    title: 'Bambu Lab P1S + AMS Print Optimization',
    category: 'Technical troubleshooting',
    summary:
      'A practical print tuning case study covering multi-colour print quality, purge settings, temperature errors, and batch speed.',
    details: [
      'Investigated nozzle, hotend, thermistor, and temperature error behavior during printing.',
      'Tuned colour transitions and reduced waste where possible while protecting quality.',
      'Improved batch timing and top surface finish through iteration and test prints.',
    ],
    signal: 'P1S / AMS / purge tuning',
  },
  {
    title: 'Laser-Cut / CNC NOVA Magnet Design',
    category: 'Design for manufacturability',
    summary:
      'A team-themed magnet designed around fabrication constraints instead of just visual appearance.',
    details: [
      'Designed connected cutout geometry with no floating pieces.',
      'Worked around minimum detail sizes near 1.5 mm so the design could actually be made.',
      'Balanced team branding with laser/CNC manufacturing limits.',
    ],
    signal: 'DfM / cut geometry / constraints',
  },
  {
    title: 'CNC / Diamond Engraving Research',
    category: 'Manufacturing process research',
    summary:
      'Research into impact engraving, diamond conical engraver tips, setup variables, and compatible materials.',
    details: [
      'Studied engraving depth, pressure, and how tip geometry affects marks.',
      'Compared materials such as polycarbonate, acrylic, and powder-coated surfaces.',
      'Built process knowledge for engraving setups before cutting real parts.',
    ],
    signal: 'Engraving / materials / setup',
  },
  {
    title: 'Raspberry Pi Escape Room Puzzle Box',
    category: 'Hardware and software integration',
    summary:
      'An interactive physical puzzle system with servo locks, RFID or keypad input, LEDs, LCD hints, buzzer feedback, and a timed sequence.',
    details: [
      'Combines mechanical locking, input handling, feedback, and puzzle state logic.',
      'Designed as a real object people can touch, solve, and reset.',
      'Good fit for documenting wiring, code, timing, and enclosure design.',
    ],
    signal: 'Pi / servos / interactive system',
  },
  {
    title: 'Vision Target Shooting Game',
    category: 'Computer vision and embedded feedback',
    summary:
      'A Raspberry Pi game concept using Pi Camera or OpenCV, joystick input, LEDs, target detection, and scoring feedback.',
    details: [
      'Connects computer vision with physical controls and visible feedback.',
      'Uses target detection to make gameplay respond to real-world movement.',
      'A strong base for experimenting with accuracy, lighting, scoring, and latency.',
    ],
    signal: 'OpenCV / camera / scoring',
  },
]

const skills = [
  {
    group: 'Robotics',
    items: ['FRC teamwork', 'mechanism thinking', 'competition strategy', 'sensors', 'pit workflow'],
  },
  {
    group: 'Fabrication',
    items: ['3D printing', 'AMS printing', 'laser cutting', 'CNC', 'diamond engraving'],
  },
  {
    group: 'Design',
    items: ['CAD-style thinking', 'product design', 'team branding', 'design constraints'],
  },
  {
    group: 'Programming / Hardware',
    items: ['Raspberry Pi', 'OpenCV', 'servo control', 'LEDs', 'LCDs', 'keypads', 'RFID'],
  },
  {
    group: 'Engineering Process',
    items: ['prototyping', 'testing', 'troubleshooting', 'iteration', 'documentation'],
  },
]

const buildLog = [
  {
    phase: 'Idea',
    text: 'Start with a physical problem: a team giveaway, a robot role, a puzzle interaction, or a fabrication limit.',
  },
  {
    phase: 'Prototype',
    text: 'Create a fast first version in CAD, print, wiring, code, or layout so the idea can be tested early.',
  },
  {
    phase: 'Problem',
    text: 'Find the weak point: print time, tolerances, unsupported geometry, colour transitions, wiring, or sensor behavior.',
  },
  {
    phase: 'Fix',
    text: 'Tune the model, change the process, improve the setup, and test the next version against the real constraint.',
  },
  {
    phase: 'Result',
    text: 'Document what worked, what still needs improvement, and what the next build should solve.',
  },
]

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    if (savedTheme) return savedTheme
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

  const isDark = theme === 'dark'

  return (
    <main className="siteShell">
      <BlueprintBackground />
      <header className="navBar">
        <a className="brandMark" href="#top" aria-label="Portfolio home">
          <span className="brandGlyph">N</span>
          <span>
            NOVA 11270
            <small>student engineering portfolio</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#projects">Projects</a>
          <a href="#skills">Toolkit</a>
          <a href="#log">Build log</a>
          <a href="#contact">Contact</a>
        </nav>
        <button
          className="themeToggle"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          type="button"
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          <span>{isDark ? 'Light' : 'Dark'}</span>
        </button>
      </header>

      <section className="heroSection" id="top">
        <div className="heroCopy reveal isVisible">
          <p className="eyebrow">Robotics / fabrication / mechatronics</p>
          <h1>Building robots, fabricating ideas, and turning engineering concepts into real systems.</h1>
          <p>
            I am a student engineer interested in robotics, aerospace,
            mechatronics, manufacturing, fabrication, and design. My work
            combines FRC competition experience, CAD-style design, 3D printing,
            CNC/engraving research, hardware troubleshooting, and physical
            interactive systems.
          </p>
          <div className="heroActions">
            <a className="actionButton primary" href="#projects">
              View systems
            </a>
            <a className="actionButton secondary" href="#log">
              Open build log
            </a>
          </div>
        </div>

        <div className="heroVisual reveal isVisible" aria-label="Animated engineering interface">
          <div className="orbitSystem">
            <span className="orbit orbitOne" />
            <span className="orbit orbitTwo" />
            <span className="corePart" />
            <span className="part partA">CAD</span>
            <span className="part partB">CAM</span>
            <span className="part partC">FRC</span>
            <span className="part partD">Pi</span>
          </div>
          <div className="telemetryPanel panelOne">
            <span>print queue</span>
            <strong>AMS batch 04</strong>
            <div className="meter"><i /></div>
          </div>
          <div className="telemetryPanel panelTwo">
            <span>robot system</span>
            <strong>pit ready</strong>
            <div className="signalBars"><i /><i /><i /></div>
          </div>
        </div>
      </section>

      <section className="statStrip reveal" aria-label="Portfolio highlights">
        {stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="sectionGrid aboutSection reveal" id="about">
        <div>
          <p className="eyebrow">About me</p>
          <h2>I like projects where the design has to survive contact with the real world.</h2>
        </div>
        <div className="textPanel">
          <p>
            I am drawn to physical systems: mechanisms, printed parts, sensors,
            wiring, machine setup, and the messy middle where an idea becomes
            something you can test. I like improving designs through hands-on
            iteration, not just making them look finished.
          </p>
          <p>
            Through FRC Team NOVA 11270 and independent builds, I have worked on
            robotics, team fabrication, 3D printing workflows, CNC/engraving
            research, engineering branding, and hardware/software experiments.
          </p>
        </div>
      </section>

      <section className="projectSection" id="projects">
        <div className="sectionHeader reveal">
          <p className="eyebrow">Featured projects</p>
          <h2>Fabrication archive and robotics systems.</h2>
          <p>
            These cards are written like real engineering work: what the project
            involved, what constraints mattered, and what skills were tested.
          </p>
        </div>
        <div className="projectGrid">
          {projects.map((project, index) => (
            <article className="projectCard reveal" key={project.title}>
              <div className="cardTopline">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <small>{project.category}</small>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <ul>
                {project.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <div className="projectSignal">{project.signal}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="skillsSection reveal" id="skills">
        <div className="consoleHeader">
          <div>
            <p className="eyebrow">Engineering console</p>
            <h2>Toolkit organized by how I actually build.</h2>
          </div>
          <span className="consoleStatus">systems online</span>
        </div>
        <div className="skillsConsole">
          {skills.map((skill) => (
            <article className="skillModule" key={skill.group}>
              <h3>{skill.group}</h3>
              <div>
                {skill.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="logSection" id="log">
        <div className="sectionHeader reveal">
          <p className="eyebrow">Build log</p>
          <h2>How a project moves from idea to working system.</h2>
        </div>
        <div className="timeline">
          {buildLog.map((entry) => (
            <article className="timelineItem reveal" key={entry.phase}>
              <span>{entry.phase}</span>
              <p>{entry.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="modelSection reveal">
        <div>
          <p className="eyebrow">Project assets</p>
          <h2>Ready for real files: STL, OBJ, SVG, and web-friendly GLB models.</h2>
          <p>
            Project folders can hold photos, SVG sketches, printable STL files,
            and GLB models for an inspectable 3D viewer. The portfolio is set up
            to grow into a real fabrication archive as projects are documented.
          </p>
        </div>
        <div className="assetRack">
          <span>robot-chassis.glb</span>
          <span>nova-pin.stl</span>
          <span>magnet-cut.svg</span>
          <span>engraving-test.obj</span>
        </div>
      </section>

      <section className="contactSection reveal" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>For robotics, fabrication, mentoring, and engineering opportunities.</h2>
          <p>
            Replace these placeholder links with your real GitHub, email,
            resume, and project archive when you are ready.
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
