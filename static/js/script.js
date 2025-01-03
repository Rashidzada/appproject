// Navigation scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Skills animation
const skillBars = document.querySelectorAll('.progress');

const showProgress = () => {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

// Trigger skills animation when scrolled into view
const skillsSection = document.querySelector('.skills');
let animated = false;

window.addEventListener('scroll', () => {
    if (isInViewport(skillsSection) && !animated) {
        showProgress();
        animated = true;
    }
});

// Helper function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Auto-hide messages after 5 seconds
document.addEventListener('DOMContentLoaded', () => {
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => {
        setTimeout(() => {
            message.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                message.remove();
            }, 300);
        }, 5000);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const body = document.body;

    function toggleNav() {
        // Toggle navigation
        nav.classList.toggle('nav-active');
        body.classList.toggle('nav-active');

        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.2}s`;
            }
        });

        // Burger animation
        burger.classList.toggle('active');
    }

    burger.addEventListener('click', toggleNav);

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                toggleNav();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('nav-active') && 
            !nav.contains(e.target) && 
            !burger.contains(e.target)) {
            toggleNav();
        }
    });

    // Scroll functionality
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            document.querySelector('.header').style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('nav-active')) {
            // Scrolling down & menu is closed
            document.querySelector('.header').style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            document.querySelector('.header').style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
});
