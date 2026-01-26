// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || '0s';

                if (entry.target.classList.contains('slide-up')) {
                    entry.target.style.animation = `slideUp 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards ${delay}`;
                } else if (entry.target.classList.contains('fade-in') || entry.target.classList.contains('project-card')) {
                    entry.target.style.animation = `fadeIn 1.6s cubic-bezier(0.4, 0, 0.2, 1) forwards ${delay}`;
                }

                // entry.target.style.opacity = '1'; /* Removed to let animation handle visibility */
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up, .project-card').forEach(el => {
        el.style.opacity = '0'; // Ensure they are hidden initially
        observer.observe(el);
    });

    // Three.js background is handled by js/three-background.js via <script> tag

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Profile Image 3D Tilt Effect
    const profileContainer = document.querySelector('.profile-image-container');
    const profileImage = document.querySelector('.profile-image');
    let isHovering = false;

    if (profileContainer && profileImage) {
        profileContainer.addEventListener('mouseenter', () => {
            isHovering = true;
        });

        profileContainer.addEventListener('mouseleave', () => {
            isHovering = false;
            profileImage.style.transform = 'scale(1)';
            profileContainer.style.transform = 'scale(1)';
        });

        profileContainer.addEventListener('mousemove', (e) => {
            if (!isHovering) return;

            const rect = profileContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Limit rotation to avoid too much distortion
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
            const rotateY = ((x - centerX) / centerX) * 10;

            profileContainer.style.transform = `scale(1.05) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    // Add a small delay for staggered animation could be nice, but simple fade is safer
                    card.style.opacity = '0';
                    card.style.animation = 'none';
                    card.offsetHeight; /* trigger reflow */
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Email form handling
    window.sendEmail = function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const mailtoLink = `mailto:your-email@example.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;
        window.location.href = mailtoLink;
        document.getElementById('emailForm').reset();
        return false;
    };
});
