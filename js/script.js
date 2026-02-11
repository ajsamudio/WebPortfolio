// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    // Generic observer (will observe multiple classes)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add click-to-play for video projects
    document.querySelectorAll('.js-video').forEach(video => {
        video.addEventListener('click', function () {
            if (this.paused) {
                this.play();
            } else {
                this.pause();
            }
        });
    });

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.project-card, .fade-in, .slide-up, .reveal');
    animatedElements.forEach(el => {
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

    // Typewriter effect
    const typewriterElement = document.getElementById('typewriter');
    const textToType = "Creative developer dedicated to crafting immersive digital experiences through innovative multimedia design, robust programming, and professional video production.";
    let index = 0;

    function typeWriter() {
        if (index < textToType.length) {
            typewriterElement.innerHTML += textToType.charAt(index);
            index++;
            setTimeout(typeWriter, 30);
        }
    }

    if (typewriterElement) {
        // Trigger typewriter after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Form handling moved to FormSubmit.co service in HTML
});
