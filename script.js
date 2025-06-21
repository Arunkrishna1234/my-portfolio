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

// Particle Animation System
class ParticleAnimation {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0, radius: 150 };
        this.particleCount = 100;
        this.maxDistance = 150;
        
        this.init();
        this.animate();
        this.handleMouseMove();
        this.handleResize();
    }
    
    init() {
        this.resizeCanvas();
        this.createParticles();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomColor()
            });
        }
    }
    
    getRandomColor() {
        const colors = [
            '#60a5fa', // Blue
            '#f093fb', // Pink
            '#4facfe', // Light Blue
            '#43e97b', // Green
            '#fa709a', // Rose
            '#a8edea'  // Light Cyan
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    handleMouseMove() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }
            
            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        });
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
        });
        
        // Draw connections
        this.drawConnections();
        
        // Reset global alpha
        this.ctx.globalAlpha = 1;
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.maxDistance) {
                    const opacity = (this.maxDistance - distance) / this.maxDistance * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = '#60a5fa';
                    this.ctx.globalAlpha = opacity;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    handleMouseInteraction() {
        this.particles.forEach(particle => {
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.mouse.radius) {
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                const angle = Math.atan2(dy, dx);
                
                particle.vx -= Math.cos(angle) * force * 0.5;
                particle.vy -= Math.sin(angle) * force * 0.5;
            }
        });
    }
    
    animate() {
        this.updateParticles();
        this.handleMouseInteraction();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

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
    // Initialize particle animation
    new ParticleAnimation();
    
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