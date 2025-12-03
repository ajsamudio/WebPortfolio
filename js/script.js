// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements when they come into view
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);

        // Add hover effect for project cards
        card.addEventListener('mouseenter', (e) => {
            const icon = e.currentTarget.querySelector('.project-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', (e) => {
            const icon = e.currentTarget.querySelector('.project-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Add smooth scroll for better user experience
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

    // Animate profile image on load
    const profileImage = document.querySelector('.profile-image');

    if (profileImage) {
        profileImage.style.opacity = '0';
        profileImage.style.transform = 'scale(0.8)';

        setTimeout(() => {
            profileImage.style.transition = 'all 0.8s ease';
            profileImage.style.opacity = '1';
            profileImage.style.transform = 'scale(1)';
        }, 300);
    }

    // Add parallax effect to project cards
    document.addEventListener('mousemove', (e) => {
        if (document.body.classList.contains('no-tilt')) return;

        const cards = document.querySelectorAll('.project-card');
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = rect.left + rect.width / 2;
            const cardY = rect.top + rect.height / 2;

            // Reduced sensitivity (80 instead of 30)
            const angleX = (mouseY - cardY) / 80;
            const angleY = (mouseX - cardX) / -80;

            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
    });

    // Reset card transform on mouse leave
    document.addEventListener('mouseleave', () => {
        if (document.body.classList.contains('no-tilt')) return;

        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // Add typing effect to the introduction text
    const introText = document.querySelector('.intro-text p');
    if (introText) {
        const text = introText.textContent;
        introText.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                introText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 45);
            }
        }

        // Start typing effect when the element is in view
        const introObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeWriter();
                introObserver.unobserve(introText);
            }
        });

        introObserver.observe(introText);
    }

    // Email form handling
    window.sendEmail = function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Create mailto link
        const mailtoLink = `mailto:your-email@example.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;

        // Open default email client
        window.location.href = mailtoLink;

        // Clear form
        document.getElementById('emailForm').reset();

        return false;
    };

    // DOM Elements
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'dots-container';
    document.body.appendChild(dotsContainer);

    const profileContainer = document.querySelector('.profile-image-container');
    let isHovering = false;

    // Profile Image Distortion Effect
    if (profileContainer && profileImage) {
        profileContainer.addEventListener('mouseenter', () => {
            isHovering = true;
        });

        profileContainer.addEventListener('mouseleave', () => {
            isHovering = false;
            profileImage.style.transform = 'scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)';
            profileImage.style.filter = 'brightness(1) contrast(1) hue-rotate(0deg) blur(0px)';
        });

        profileContainer.addEventListener('mousemove', (e) => {
            if (!isHovering) return;

            const rect = profileContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
            const distortionIntensity = distance / maxDistance;

            profileImage.style.transform = `
                scale(1.05) 
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
            `;

            const hueRotate = (distortionIntensity * 180) % 360;
            const blur = distortionIntensity * 2;
            profileImage.style.filter = `
                brightness(1.2)
                contrast(1.1)
                hue-rotate(${hueRotate}deg)
                blur(${blur}px)
            `;
        });
    }

    // Animated Dots
    function createDot() {
        const dot = document.createElement('div');
        dot.className = 'dot';

        dot.style.left = `${Math.random() * window.innerWidth}px`;
        dot.style.top = `${Math.random() * window.innerHeight}px`;

        dot.style.animation = 'dotFade 15s ease-in-out forwards';

        dotsContainer.appendChild(dot);

        setTimeout(() => {
            dot.remove();
        }, 15000);
    }

    function initDots() {
        for (let i = 0; i < 15; i++) {
            setTimeout(createDot, Math.random() * 3000);
        }

        setInterval(() => {
            const dotCount = Math.floor(Math.random() * 5) + 8;
            for (let i = 0; i < dotCount; i++) {
                setTimeout(createDot, Math.random() * 3000);
            }
        }, 3000);
    }

    // Update dots container size on window resize
    window.addEventListener('resize', () => {
        dotsContainer.style.height = `${window.innerHeight}px`;
    });

    initDots();

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
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                    // Re-trigger animation if needed
                    card.style.animation = 'none';
                    card.offsetHeight; /* trigger reflow */
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});