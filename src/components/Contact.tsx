export default function Contact() {
  return (
    <section className="contact-section" id="contact" aria-label="Contact AJ Samudio">
      <div className="container">
        <div className="contact-wrapper reveal">
          <h2 className="section-title">Let&apos;s Build Something</h2>

          <div className="social-links" aria-label="Social links">
            <a
              href="https://www.linkedin.com/in/antonio-samudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="AJ Samudio on LinkedIn"
            >
              <i className="fab fa-linkedin" aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href="https://drive.google.com/file/d/1NZXH08GMuCFBd7i2MRLJqNHVCkOt0L01/view"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Download AJ Samudio's resume"
            >
              <i className="fas fa-file-alt" aria-hidden="true" />
              Resume
            </a>
            <a
              href="https://github.com/ajsamudio"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="AJ Samudio on GitHub"
            >
              <i className="fab fa-github" aria-hidden="true" />
              GitHub
            </a>
          </div>

          <form
            className="contact-form"
            action="https://formsubmit.co/antsamudio99@gmail.com"
            method="POST"
            aria-label="Contact form"
          >
            {/* Honeypot */}
            <input type="text" name="_honey" style={{ display: "none" }} />
            <input type="hidden" name="_captcha" value="true" />
            <input type="hidden" name="_next" value="https://ajsamudio.github.io/WebPortfolio/" />

            <div className="form-group">
              <label htmlFor="name" className="visually-hidden">Your name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your Name"
                required
                autoComplete="name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="visually-hidden">Your email address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Your Email"
                required
                autoComplete="email"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="visually-hidden">Your message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                rows={5}
                required
                className="form-input"
              />
            </div>

            <button type="submit" className="btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
