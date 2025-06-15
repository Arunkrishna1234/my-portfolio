// Dark mode toggle
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(themeToggle);

let isDarkMode = localStorage.getItem('darkMode') === 'true';
updateTheme();

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    updateTheme();
});

function updateTheme() {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .timeline-item, .experience-card, .project-card, .certificate-card, .skills-section, .interest-item').forEach((el) => {
    observer.observe(el);
});

// Initialize Framer Motion
const { motion } = window.Motion;

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
};

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Animate hero content
    motion('.hero-content', {
        opacity: [0, 1],
        y: [50, 0],
        transition: { duration: 0.8, ease: 'easeOut' }
    });

    // Animate timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        motion(item, {
            opacity: [0, 1],
            x: [-50, 0],
            transition: { 
                duration: 0.5,
                delay: index * 0.2,
                ease: 'easeOut'
            }
        });
    });

    // Animate cards
    document.querySelectorAll('.experience-card, .project-card, .certificate-card').forEach((card, index) => {
        motion(card, {
            opacity: [0, 1],
            y: [30, 0],
            transition: {
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut'
            }
        });
    });

    // Add hover animations to cards
    document.querySelectorAll('.experience-card, .project-card, .certificate-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            motion(card, {
                scale: 1.05,
                transition: { duration: 0.3 }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            motion(card, {
                scale: 1,
                transition: { duration: 0.3 }
            });
        });
    });
}); 