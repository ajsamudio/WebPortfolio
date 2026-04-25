export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <p className="footer-name">AJ Samudio</p>
            <p className="footer-tagline">Full-Stack Developer &amp; Creative Technologist</p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="#projects" className="footer-link">Projects</a>
            <a href="#contact" className="footer-link">Let&apos;s Build Something</a>
          </nav>

          <div className="footer-social" aria-label="Social media links">
            <a
              href="https://www.linkedin.com/in/antonio-samudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin" aria-hidden="true" />
            </a>
            <a
              href="https://github.com/ajsamudio"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="GitHub"
            >
              <i className="fab fa-github" aria-hidden="true" />
            </a>
            <a
              href="https://drive.google.com/file/d/1NZXH08GMuCFBd7i2MRLJqNHVCkOt0L01/view"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Resume"
            >
              <i className="fas fa-file-alt" aria-hidden="true" />
            </a>
          </div>
        </div>

        <p className="footer-copy">
          &copy; {year} AJ Samudio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
