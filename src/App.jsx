import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import Lightfall from './lightfall';
import PillNav from './components/PillNav/PillNav';
import CardSwap, { Card } from './components/CardSwap/CardSwap';
import ChromaGrid from './components/ChromaGrid/ChromaGrid';
import CircularGallery from './components/CircularGallery/CircularGallery';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack/ScrollStack';
import BorderGlow from './components/BorderGlow/BorderGlow';
import Particles from './components/Particles/Particles';

const Lanyard = lazy(() => import('./components/Lanyard/Lanyard'));

const projects = [
  {
    id: "1",
    title: "Teacher Performance & Task Dashboard",
    desc: "A comprehensive role-based web application developed for FirstCry Intellitots to digitize teacher performance management. Features KPI dashboards, attendance tracking, task management, Kanban boards, and duty rosters.",
    image: "/images/teacher_dashboard.png",
    tags: ["React", "Vite", "Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "JWT", "Framer Motion"],
    codeUrl: "https://github.com/VaitlaBilwanath",
    liveUrl: "#",
    borderColor: "#7042f8",
    gradient: "linear-gradient(145deg, rgba(112, 66, 248, 0.25), #030014)"
  },
  {
    id: "2",
    title: "Aira – AI Desktop Assistant",
    desc: "An intelligent AI desktop assistant featuring natural voice conversations, speech recognition, text-to-speech, desktop automation, application launching, system monitoring, and an interactive interface.",
    image: "/images/ai_assistant.png",
    tags: ["Python", "OpenAI APIs", "Speech Recognition", "TTS", "React"],
    codeUrl: "https://github.com/VaitlaBilwanath",
    liveUrl: "#",
    borderColor: "#00f2fe",
    gradient: "linear-gradient(145deg, rgba(0, 242, 254, 0.25), #030014)"
  },
  {
    id: "3",
    title: "Contact List Manager",
    desc: "A responsive full-stack contact management application that allows users to create, edit, search, organize, and securely manage contacts through an intuitive CRUD interface.",
    image: "/images/contact_manager.png",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js"],
    codeUrl: "https://github.com/VaitlaBilwanath",
    liveUrl: "#",
    borderColor: "#FF9FFC",
    gradient: "linear-gradient(145deg, rgba(255, 159, 252, 0.25), #030014)"
  },
  {
    id: "4",
    title: "Team Portfolio Website",
    desc: "A modern, responsive portfolio website designed to showcase team members, projects, technical skills, and achievements with interactive animations and mobile-friendly layouts.",
    image: "/images/team_portfolio.png",
    tags: ["HTML", "CSS", "JavaScript", "React"],
    codeUrl: "https://github.com/VaitlaBilwanath",
    liveUrl: "#",
    borderColor: "#5227FF",
    gradient: "linear-gradient(145deg, rgba(82, 39, 255, 0.25), #030014)"
  }
];

export default function App() {
  const bgRef = useRef(null);
  const progressRef = useRef(null);
  const [activeSection, setActiveSection] = useState('#hero');
  const [projectsView, setProjectsView] = useState('grid'); // 'grid' | 'stack' | 'carousel' | 'scroll'

  // ScrollSpy to track active section
  useEffect(() => {
    const sections = ['hero', 'work', 'skills', 'education', 'about', 'contact'];
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Scroll progress
  useEffect(() => {
    const handler = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const s = window.scrollY / h;
      if (progressRef.current) progressRef.current.style.width = `${s * 100}%`;
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Card tilt
  useEffect(() => {
    const cards = document.querySelectorAll('[data-tilt]');
    const onMove = (card) => (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    };
    const onLeave = (card) => () => {
      card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    };
    const handlers = [];
    cards.forEach(card => {
      const move = onMove(card);
      const leave = onLeave(card);
      card.addEventListener('mousemove', move);
      card.addEventListener('mouseleave', leave);
      handlers.push({ card, move, leave });
    });
    return () => handlers.forEach(({ card, move, leave }) => {
      card.removeEventListener('mousemove', move);
      card.removeEventListener('mouseleave', leave);
    });
  }, []);

  // Lightfall background
  useEffect(() => {
    if (!bgRef.current) return;
    const lf = new Lightfall(bgRef.current, {
      colors: ['#7042f8', '#00f2fe', '#5227FF', '#FF9FFC'],
      backgroundColor: '#030014',
      speed: 0.25,
      streakCount: 8,
      streakWidth: 1,
      streakLength: 1.2,
      glow: 1.2,
      density: 0.6,
      twinkle: 1,
      zoom: 2,
      backgroundGlow: 0.4,
      opacity: 1,
      mouseInteraction: true,
      mouseStrength: 0.8,
      mouseRadius: 0.8,
      mouseDampening: 0.15,
    });
    return () => lf.destroy();
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div className="scroll-progress" id="progress" ref={progressRef}></div>

      {/* Nav */}
      <PillNav
        logo="VB"
        items={[
          { label: 'Home', href: '#hero' },
          { label: 'Projects', href: '#work' },
          { label: 'Skills', href: '#skills' },
          { label: 'Education', href: '#education' },
          { label: 'About', href: '#about' },
          { label: 'Contact', href: '#contact' }
        ]}
        activeHref={activeSection}
        baseColor="#7042f8"
        pillColor="rgba(255, 255, 255, 0.03)"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#d1d1f0"
      />

      {/* Floating Socials */}
      <div className="floating-socials">
        <a href="https://github.com/VaitlaBilwanath" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-circle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/binnu-vaitla-318255377/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-circle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
      </div>

      {/* Hero with Lightfall canvas */}
      <header className="hero" id="hero">
        <div id="bg-canvas" ref={bgRef}></div>
        <div className="hero__content reveal">
          <p className="hero__eyebrow">FULL STACK DEVELOPER • AI ENTHUSIAST</p>
          <h1 className="hero__title"><span className="grad">VAITLA</span><br />BILWANATH</h1>
          <p className="hero__sub">B.Tech Computer Science student passionate about building scalable web applications, AI-powered tools, and intuitive digital experiences.</p>
          <div className="hero__actions">
            <a href="#work" className="btn btn--gradient">View Projects</a>
            <a href="/Vaitla_Bilwanath_Resume.pdf" download="Vaitla_Bilwanath_Resume.pdf" className="btn btn--outline-purple">Download Resume</a>
          </div>
        </div>
        <div className="hero__scroll-hint">scroll</div>
      </header>

      {/* Work / Projects */}
      <section className="section" id="work" style={{ position: 'relative', overflow: 'hidden' }}>
        <Particles
          particleColors={["#7042f8", "#00f2fe", "#ffffff"]}
          particleCount={40}
          particleSpread={10}
          speed={0.12}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
        <div className="section__header-toggle">
          <h2 className="section__title reveal" style={{ margin: 0 }}>Selected Work</h2>
          <div className="view-toggle">
            <button
              className={`toggle-btn ${projectsView === 'grid' ? 'active' : ''}`}
              onClick={() => setProjectsView('grid')}
            >
              Spotlight Grid
            </button>
            <button
              className={`toggle-btn ${projectsView === 'stack' ? 'active' : ''}`}
              onClick={() => setProjectsView('stack')}
            >
              3D Stack
            </button>
            <button
              className={`toggle-btn ${projectsView === 'carousel' ? 'active' : ''}`}
              onClick={() => setProjectsView('carousel')}
            >
              3D Carousel
            </button>
            <button
              className={`toggle-btn ${projectsView === 'scroll' ? 'active' : ''}`}
              onClick={() => setProjectsView('scroll')}
            >
              Stack-on-Scroll
            </button>
          </div>
        </div>

        <div style={{ marginTop: '3rem', minHeight: '660px', position: 'relative' }}>
          {projectsView === 'grid' ? (
            <ChromaGrid
              items={projects}
              columns={3}
              rows={2}
              radius={280}
            />
          ) : projectsView === 'stack' ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '560px', width: '100%', position: 'relative' }}>
              <CardSwap
                width={480}
                height={520}
                cardDistance={40}
                verticalDistance={30}
                delay={5000}
                pauseOnHover={true}
              >
                {projects.map(project => (
                  <Card key={project.id}>
                    <article className="card" style={{ height: '100%', margin: 0, display: 'flex', flexDirection: 'column' }}>
                      <div className="card__media">
                        <img src={project.image} alt={project.title} />
                      </div>
                      <h3 className="card__title">{project.title}</h3>
                      <p className="card__desc">{project.desc}</p>
                      <div className="card__tags">
                        {project.tags.map(tag => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <div className="card__actions">
                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="btn-project btn-project--code">Code</a>
                        {project.liveUrl && project.liveUrl !== '#' && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-project btn-project--live">Live Link</a>
                        )}
                      </div>
                    </article>
                  </Card>
                ))}
              </CardSwap>
            </div>
          ) : projectsView === 'carousel' ? (
            <div style={{ height: '600px', position: 'relative', width: '100%', overflow: 'hidden' }}>
              <CircularGallery
                bend={3}
                textColor="#ffffff"
                borderRadius={0.05}
                scrollEase={0.03}
                fontUrl="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
                font="bold 28px Orbitron"
                items={projects.map(p => ({
                  image: p.image,
                  text: p.title,
                  url: p.liveUrl && p.liveUrl !== '#' ? p.liveUrl : p.codeUrl
                }))}
                onItemClick={(item) => {
                  if (item?.url) {
                    window.open(item.url, '_blank', 'noopener,noreferrer');
                  }
                }}
              />
            </div>
          ) : (
            <div style={{ height: '600px', position: 'relative', width: '100%', overflow: 'visible' }}>
              <ScrollStack useWindowScroll={false} itemDistance={60} itemStackDistance={35} baseScale={0.88}>
                {projects.map(project => (
                  <ScrollStackItem key={project.id}>
                    <article className="card" style={{ height: '100%', margin: 0, display: 'flex', flexDirection: 'row', gap: '2rem', padding: '2rem', alignItems: 'center' }}>
                      <div className="card__media" style={{ width: '40%', height: '100%', flexShrink: 0, borderRadius: '12px', overflow: 'hidden' }}>
                        <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%', justifyContent: 'center' }}>
                        <h3 className="card__title" style={{ fontSize: '1.45rem', marginBottom: '0.6rem' }}>{project.title}</h3>
                        <p className="card__desc" style={{ fontSize: '0.94rem', marginBottom: '1.2rem', WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', color: 'var(--muted)', lineHeight: '1.5' }}>{project.desc}</p>
                        <div className="card__tags" style={{ marginBottom: '1.4rem' }}>
                          {project.tags.map(tag => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                        <div className="card__actions" style={{ marginTop: 'auto' }}>
                          <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="btn-project btn-project--code">Code</a>
                          {project.liveUrl && project.liveUrl !== '#' && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-project btn-project--live">Live Link</a>
                          )}
                        </div>
                      </div>
                    </article>
                  </ScrollStackItem>
                ))}
              </ScrollStack>
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section className="section" id="skills" style={{ position: 'relative', overflow: 'hidden' }}>
        <Particles
          particleColors={["#7042f8", "#00f2fe", "#ffffff"]}
          particleCount={45}
          particleSpread={9}
          speed={0.15}
          particleBaseSize={70}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
        <h2 className="section__title reveal">Skills &amp; Technologies</h2>
        <div className="skills__grid reveal">
          <div className="skills__category">
            <h3>Frontend</h3>
            <div className="skills__list">
              <span>React</span><span>Vite</span><span>HTML5</span><span>CSS3</span><span>JavaScript (ES6+)</span><span>Framer Motion</span>
            </div>
          </div>
          <div className="skills__category">
            <h3>Backend &amp; Databases</h3>
            <div className="skills__list">
              <span>Node.js</span><span>Express.js</span><span>PostgreSQL</span><span>Prisma ORM</span><span>REST APIs</span><span>JWT Auth</span>
            </div>
          </div>
          <div className="skills__category">
            <h3>AI &amp; Languages</h3>
            <div className="skills__list">
              <span>Python</span><span>OpenAI APIs</span><span>Speech Recognition</span><span>AI Assistants</span>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="section" id="education" style={{ position: 'relative', overflow: 'hidden' }}>
        <Particles
          particleColors={["#7042f8", "#00f2fe", "#ffffff"]}
          particleCount={40}
          particleSpread={10}
          speed={0.12}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
        <h2 className="section__title reveal">Education</h2>
        <div className="timeline reveal">
          <div className="timeline__item">
            <div className="timeline__date">2025 – 2029 (Expected)</div>
            <div className="timeline__content">
              <h3>Bachelor of Technology (B.Tech)</h3>
              <p className="timeline__institution">Aurora Deemed to be University</p>
              <p className="timeline__desc">Computer Science &amp; Engineering (Full Stack Development)</p>
            </div>
          </div>
          <div className="timeline__item">
            <div className="timeline__date">2023 – 2025</div>
            <div className="timeline__content">
              <h3>Intermediate (Class XII)</h3>
              <p className="timeline__institution">Ayati Junior College</p>
              <p className="timeline__desc">Achieved 83%</p>
            </div>
          </div>
          <div className="timeline__item">
            <div className="timeline__date">Completed in 2023</div>
            <div className="timeline__content">
              <h3>Secondary School (Class X)</h3>
              <p className="timeline__institution">Spring Fields High School</p>
              <p className="timeline__desc">Achieved 85%</p>
            </div>
          </div>
        </div>
      </section>

      {/* About — Split layout with Lanyard */}
      <section className="section about" id="about" style={{ position: 'relative', overflow: 'hidden' }}>
        <Particles
          particleColors={["#7042f8", "#00f2fe", "#ffffff"]}
          particleCount={40}
          particleSpread={10}
          speed={0.12}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
        <h2 className="section__title reveal">About</h2>
        <div className="about__split reveal">
          <BorderGlow
            edgeSensitivity={30}
            glowColor="260 85 70"
            backgroundColor="rgba(3, 0, 20, 0.45)"
            borderRadius={18}
            glowRadius={50}
            glowIntensity={1.0}
            coneSpread={25}
            animated={true}
            colors={['#7042f8', '#00f2fe', '#f472b6']}
          >
            <div className="about__text" style={{ background: 'transparent', border: 'none', padding: '3rem', margin: 0 }}>
              <p>I'm Vaitla Bilwanath, a B.Tech Computer Science Engineering student specializing in Full Stack Development with a strong passion for Artificial Intelligence, modern web development, and software engineering. I enjoy building scalable web applications, AI-powered assistants, and intuitive user experiences using technologies like React, Node.js, Express.js, PostgreSQL, Prisma, and Python. I'm constantly exploring new technologies, solving real-world problems, and creating projects that combine innovation with practical impact.</p>
            </div>
          </BorderGlow>
          <div className="about__lanyard">
            <Suspense fallback={<div className="lanyard-loading">Loading 3D Card...</div>}>
              <Lanyard
                position={[0, 0, 20]}
                gravity={[0, -40, 0]}
                frontImage="/images/my-photo.jpg"
                imageFit="cover"
              />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section contact" id="contact" style={{ position: 'relative', overflow: 'hidden' }}>
        <Particles
          particleColors={["#7042f8", "#00f2fe", "#ffffff"]}
          particleCount={40}
          particleSpread={10}
          speed={0.12}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
        <h2 className="section__title reveal">Let's connect</h2>
        <div className="contact__container reveal">
          <div className="contact__info">
            <div className="info-card">
              <div className="info-card__icon">✉️</div>
              <div className="info-card__content">
                <h4>Email</h4>
                <a href="mailto:vaitlabinnu@gmail.com">vaitlabinnu@gmail.com</a>
              </div>
            </div>
            <div className="info-card">
              <div className="info-card__icon">📍</div>
              <div className="info-card__content">
                <h4>Location</h4>
                <p>India</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-card__icon">🌐</div>
              <div className="info-card__content">
                <h4>Socials</h4>
                <div className="info-card__socials">
                  <a href="https://github.com/VaitlaBilwanath" target="_blank" rel="noopener noreferrer">GitHub</a> ·{' '}
                  <a href="https://www.linkedin.com/in/binnu-vaitla-318255377/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>

          <form className="contact__form" onSubmit={e => { e.preventDefault(); alert('Message sent! Thank you.'); e.target.reset(); }}>
            <div className="form__group">
              <input type="text" id="name" placeholder="Your Name" required />
            </div>
            <div className="form__group">
              <input type="email" id="email" placeholder="Your Email" required />
            </div>
            <div className="form__group">
              <input type="text" id="subject" placeholder="Subject" required />
            </div>
            <div className="form__group">
              <textarea id="message" rows="5" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" className="btn btn--gradient">Send Message</button>
          </form>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="footer">
        <div className="footer__content">
          <div className="footer__col">
            <h3>Community</h3>
            <a href="https://github.com/VaitlaBilwanath" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/binnu-vaitla-318255377/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div className="footer__col">
            <h3>Contact</h3>
            <a href="mailto:vaitlabinnu@gmail.com">Email Me</a>
            <a href="https://github.com/VaitlaBilwanath" target="_blank" rel="noopener noreferrer">Request CV</a>
          </div>
          <div className="footer__col">
            <h3>About</h3>
            <p>B.Tech Computer Science Engineering student specializing in Full Stack Development and AI.</p>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; 2026 Vaitla Bilwanath. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
