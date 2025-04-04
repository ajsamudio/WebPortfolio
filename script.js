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
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        });

        card.addEventListener('mouseleave', (e) => {
            const icon = e.currentTarget.querySelector('.project-icon i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Add smooth scroll for better user experience
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
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
        const cards = document.querySelectorAll('.project-card');
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = rect.left + rect.width / 2;
            const cardY = rect.top + rect.height / 2;

            const angleX = (mouseY - cardY) / 30;
            const angleY = (mouseX - cardX) / -30;

            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
    });

    // Reset card transform on mouse leave
    document.addEventListener('mouseleave', () => {
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

    // Popup Form Functionality
    const contactBtn = document.querySelector('.contact-btn');
    const formPopup = document.querySelector('.form-popup');
    const closeBtn = document.querySelector('.close-btn');
    const formPopupContent = document.querySelector('.form-popup-content');

    // Open popup
    contactBtn.addEventListener('click', () => {
        formPopup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
    });

    // Close popup
    const closePopup = () => {
        formPopup.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    closeBtn.addEventListener('click', closePopup);

    // Close popup when clicking outside
    formPopup.addEventListener('click', (e) => {
        if (e.target === formPopup) {
            closePopup();
        }
    });

    // Prevent popup from closing when clicking inside the form
    formPopupContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && formPopup.classList.contains('active')) {
            closePopup();
        }
    });

    // Email form handling
    function sendEmail(event) {
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
        
        // Clear form and close popup
        document.getElementById('emailForm').reset();
        closePopup();
        
        return false;
    }
}); 