// Smooth scrolling
// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth scrolling (close mobile menu on link click)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        if (window.innerWidth <= 600) {
            navMenu.classList.remove('active');
        }
    });
});
// Fade-in on scroll
window.addEventListener('scroll', () => {
    document.querySelectorAll('section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            section.classList.add('visible');
        }
    });
});

// Profile flip on about section intersection
const aboutSection = document.querySelector('#about');
const flipper = document.querySelector('.flipper');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            flipper.style.transform = 'rotateY(180deg)';
        } else {
            flipper.style.transform = 'rotateY(0deg)';
        }
    });
}, {
    threshold: 0.5
});

if (aboutSection && flipper) {
    observer.observe(aboutSection);
}

// Multiple slideshows
document.querySelectorAll('.event-card').forEach(card => {
    let slideIndex = 0;
    const slides = card.querySelectorAll('.slide');
    function showSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].classList.add('active');
        setTimeout(showSlides, 3000);
    }
    showSlides();
});

// Section tracker and social icons visibility
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const dots = document.querySelectorAll('.section-dots li');
    const trackerLine = document.querySelector('.tracker-line');
    const sectionTracker = document.querySelector('.section-tracker');
    const socialsIcons = document.querySelector('.socials-icons');

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute('id');
        }
    });

    // Toggle visibility of section tracker and social icons
    if (currentSection === 'home') {
        sectionTracker.classList.remove('visible');
        socialsIcons.classList.remove('hidden');
    } else {
        sectionTracker.classList.add('visible');
        socialsIcons.classList.add('hidden');
    }

    // Update active dot
    dots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === currentSection) {
            dot.classList.add('active');
        }
    });

    // Update tracker line position
    const activeDot = document.querySelector('.section-dots li.active');
    if (activeDot) {
        const dotTop = activeDot.offsetTop;
        const dotHeight = activeDot.offsetHeight;
        trackerLine.style.height = `${dotHeight}px`;
        trackerLine.style.top = `${dotTop}px`;
    }
});

// Click to scroll to section
document.querySelectorAll('.section-dots li').forEach(dot => {
    dot.addEventListener('click', () => {
        const sectionId = dot.getAttribute('data-section');
        document.querySelector(`#${sectionId}`).scrollIntoView({
            behavior: 'smooth'
        });
    });
});