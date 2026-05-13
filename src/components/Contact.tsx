"use client";

import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setStatus("sent");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <section className="contact-section" id="contact" aria-label="Contact AJ Samudio">
      <div className="container">
        <div className="contact-wrapper" ref={wrapperRef}>
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
            onSubmit={handleSubmit}
            aria-label="Contact form"
          >
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

            <button type="submit" className="btn-primary" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : status === "sent" ? "Message Sent!" : "Send Message"}
            </button>

            {status === "error" && (
              <p style={{ color: "var(--accent-color)", marginTop: "1rem", textAlign: "center" }}>
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
