import { useEffect, useRef, Suspense, lazy } from 'react';
import Lightfall from './lightfall';

const Lanyard = lazy(() => import('./components/Lanyard/Lanyard'));

export default function App() {
  const bgRef = useRef(null);
  const progressRef = useRef(null);

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
      <nav className="nav">
        <a href="#hero" className="nav__logo">VB</a>
        <ul className="nav__links">
          <li><a href="#work">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav__socials">
          <a href="https://github.com/VaitlaBilwanath" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/binnu-vaitla-318255377/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </nav>

      {/* Hero with Lightfall canvas */}
      <header className="hero" id="hero">
        <div id="bg-canvas" ref={bgRef}></div>
        <div className="hero__content reveal">
          <p className="hero__eyebrow">Full Stack Developer | AI Enthusiast</p>
          <h1 className="hero__title">Building <span className="grad">intelligent</span><br />web apps &amp; AI experiences</h1>
          <p className="hero__sub">Building Intelligent Web Applications and AI-Powered Experiences with Modern Technologies.</p>
          <div className="hero__actions">
            <a href="#work" className="btn btn--gradient">View Projects</a>
            <a href="#" className="btn btn--outline-purple">Download Resume</a>
          </div>
        </div>
        <div className="hero__scroll-hint">scroll</div>
      </header>

      {/* Work / Projects */}
      <section className="section" id="work">
        <h2 className="section__title reveal">Selected Work</h2>
        <div className="grid">
          {/* Project 1 */}
          <article className="card reveal" data-tilt="">
            <div className="card__media">
              <img src="/images/teacher_dashboard.png" alt="Teacher Performance & Task Dashboard" />
            </div>
            <h3 className="card__title">Teacher Performance &amp; Task Dashboard</h3>
            <p className="card__desc">A comprehensive role-based web application developed for FirstCry Intellitots to digitize teacher performance management. Features KPI dashboards, attendance tracking, task management, Kanban boards, and duty rosters.</p>
            <div className="card__tags">
              <span>React</span><span>Vite</span><span>Node.js</span><span>Express.js</span><span>PostgreSQL</span><span>Prisma ORM</span><span>JWT</span><span>Framer Motion</span>
            </div>
            <div className="card__actions">
              <a href="https://github.com/VaitlaBilwanath" target="_blank" rel="noopener noreferrer" className="btn-project btn-project--code">Code</a>
              <a href="#" className="btn-project btn-project--live">Live Link</a>
            </div>
          </article>

          {/* Project 2 */}
          <article className="card reveal" data-tilt="">
            <div className="card__media">
              <img src="/images/ai_assistant.png" alt="Aira – AI Desktop Assistant" />
            </div>
            <h3 className="card__title">Aira – AI Desktop Assistant</h3>
            <p className="card__desc">An intelligent AI desktop assistant featuring natural voice conversations, speech recognition, text-to-speech, desktop automation, application launching, system monitoring, and an interactive interface.</p>
            <div className="card__tags">
              <span>Python</span><span>OpenAI APIs</span><span>Speech Recognition</span><span>TTS</span><span>React</span>
            </div>
            <div className="card__actions">
              <a href="https://github.com/VaitlaBilwanath" target="_blank" rel="noopener noreferrer" className="btn-project btn-project--code">Code</a>
              <a href="#" className="btn-project btn-project--live">Live Link</a>
            </div>
          </article>

          {/* Project 3 */}
          <article className="card reveal" data-tilt="">
            <div className="card__media">
              <img src="/images/contact_manager.png" alt="Contact List Manager" />
            </div>
            <h3 className="card__title">Contact List Manager</h3>
            <p className="card__desc">A responsive full-stack contact management application that allows users to create, edit, search, organize, and securely manage contacts through an intuitive CRUD interface.</p>
            <div className="card__tags">
              <span>HTML</span><span>CSS</span><span>JavaScript</span><span>Node.js</span><span>Express.js</span>
            </div>
            <div className="card__actions">
              <a href="https://github.com/VaitlaBilwanath" target="_blank" rel="noopener noreferrer" className="btn-project btn-project--code">Code</a>
              <a href="#" className="btn-project btn-project--live">Live Link</a>
            </div>
          </article>

          {/* Project 4 */}
          <article className="card reveal" data-tilt="">
            <div className="card__media">
              <img src="/images/team_portfolio.png" alt="Team Portfolio Website" />
            </div>
            <h3 className="card__title">Team Portfolio Website</h3>
            <p className="card__desc">A modern, responsive portfolio website designed to showcase team members, projects, technical skills, and achievements with interactive animations and mobile-friendly layouts.</p>
            <div className="card__tags">
              <span>HTML</span><span>CSS</span><span>JavaScript</span><span>React</span>
            </div>
            <div className="card__actions">
              <a href="https://github.com/VaitlaBilwanath" target="_blank" rel="noopener noreferrer" className="btn-project btn-project--code">Code</a>
              <a href="#" className="btn-project btn-project--live">Live Link</a>
            </div>
          </article>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section" id="skills">
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
      <section className="section" id="education">
        <h2 className="section__title reveal">Education &amp; Experience</h2>
        <div className="timeline reveal">
          <div className="timeline__item">
            <div className="timeline__date">2023 — 2027</div>
            <div className="timeline__content">
              <h3>B.Tech in Computer Science Engineering</h3>
              <p className="timeline__institution">Your University</p>
              <p className="timeline__desc">Specializing in Full Stack Development and Artificial Intelligence. Learning core engineering principles, database systems, algorithms, and advanced software design.</p>
            </div>
          </div>
          <div className="timeline__item">
            <div className="timeline__date">2024</div>
            <div className="timeline__content">
              <h3>Full Stack Developer Trainee</h3>
              <p className="timeline__institution">FirstCry Intellitots (Project Collaboration)</p>
              <p className="timeline__desc">Developed a comprehensive role-based teacher performance management and task dashboard web application using React, Node.js, and PostgreSQL.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About — Split layout with Lanyard */}
      <section className="section about" id="about">
        <h2 className="section__title reveal">About</h2>
        <div className="about__split reveal">
          <div className="about__text">
            <p>I'm Vaitla Bilwanath, a B.Tech Computer Science Engineering student specializing in Full Stack Development with a strong passion for Artificial Intelligence, modern web development, and software engineering. I enjoy building scalable web applications, AI-powered assistants, and intuitive user experiences using technologies like React, Node.js, Express.js, PostgreSQL, Prisma, and Python. I'm constantly exploring new technologies, solving real-world problems, and creating projects that combine innovation with practical impact.</p>
          </div>
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
      <section className="section contact" id="contact">
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
