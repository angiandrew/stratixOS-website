// Prevent browser scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Force page to start at the top immediately - run before DOM is ready
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

// Additional scroll prevention that runs immediately
(function() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
})();

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Force page to start at the top immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Solutions tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding panel
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const company = this.querySelector('input[placeholder="Company Name"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .feature, .tech-item, .dashboard-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Parallax effect for hero orbs
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const orbs = document.querySelectorAll('.gradient-orb');
        
        orbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.1);
            orb.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                line.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    const animateCounters = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/\D/g, ''));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (stat.textContent.includes('+')) {
                    stat.textContent = Math.floor(current) + '+';
                } else if (stat.textContent.includes('%')) {
                    stat.textContent = current.toFixed(1) + '%';
                } else if (stat.textContent.includes('/')) {
                    stat.textContent = '24/7';
                }
            }, 16);
        });
    };

    // Trigger counter animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateCounters, 1000);
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroSection);
    }

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add loading animation to dashboard cards
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    dashboardCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Add floating animation to tech stack items
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('float-animation');
    });
});

// Simple ROI Calculator
let currentQuestion = 1;

function nextQuestion() {
    hideCurrentQuestion();
    currentQuestion++;
    showQuestion(currentQuestion);
}

function prevQuestion() {
    hideCurrentQuestion();
    currentQuestion--;
    showQuestion(currentQuestion);
}

function showQuestion(questionNum) {
    const question = document.getElementById(`q${questionNum}`);
    if (question) {
        question.classList.add('active');
        
        // Focus on input
        const input = question.querySelector('input');
        if (input) {
            setTimeout(() => input.focus(), 300);
        }
    }
}

function hideCurrentQuestion() {
    const current = document.querySelector('.question-card.active');
    if (current) {
        current.classList.remove('active');
        current.classList.add('prev');
    }
}

function showResults() {
    hideCurrentQuestion();
    calculateResults();
    const resultsCard = document.getElementById('results');
    if (resultsCard) {
        resultsCard.classList.add('active');
    }
}

function calculateResults() {
    const callsPerMonth = parseInt(document.getElementById('calls-per-month').value) || 0;
    const missedPercentage = parseInt(document.getElementById('missed-percentage').value) || 0;
    const leadValue = parseInt(document.getElementById('lead-value').value) || 0;
    
    const missedCalls = Math.round((callsPerMonth * missedPercentage) / 100);
    const lostRevenuePerMonth = missedCalls * leadValue;
    
    console.log('Calculating:', { callsPerMonth, missedPercentage, leadValue, lostRevenuePerMonth });
    
    // Update the result immediately
    const lostRevenueElement = document.getElementById('lost-revenue');
    if (lostRevenueElement) {
        lostRevenueElement.textContent = '$' + lostRevenuePerMonth.toLocaleString();
    }
    
    // Show savings message in the results area
    if (lostRevenuePerMonth > 0) {
        showSavingsMessage(lostRevenuePerMonth);
    }
}

function showSavingsMessage(amount) {
    const savingsMessage = document.getElementById('savings-message');
    const savingsAmount = document.getElementById('savings-amount');
    
    savingsAmount.textContent = '$' + amount.toLocaleString();
    savingsMessage.style.display = 'block';
}

function recalculate() {
    hideCurrentQuestion();
    currentQuestion = 1;
    
    // Clear inputs
    document.getElementById('calls-per-month').value = '';
    document.getElementById('missed-percentage').value = '20';
    document.getElementById('lead-value').value = '';
    
    // Reset percentage display
    document.querySelector('.percentage-display').textContent = '20%';
    
    // Hide savings message
    const savingsMessage = document.getElementById('savings-message');
    if (savingsMessage) {
        savingsMessage.style.display = 'none';
    }
    
    // Show first question
    showQuestion(1);
}

function animateNumber(element, start, end, duration, isCurrency = false) {
    const startTime = performance.now();
    const prefix = isCurrency ? '$' : '';
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * easeOutCubic);
        
        element.textContent = prefix + current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function restartCalculator() {
    // Hide all questions
    document.querySelectorAll('.question-card').forEach(card => {
        card.classList.remove('active', 'prev');
    });
    
    // Reset to first question
    currentQuestion = 1;
    showQuestion(1);
    
    // Clear inputs
    document.getElementById('calls-per-month').value = '';
    document.getElementById('missed-percentage').value = '20';
    document.getElementById('lead-value').value = '';
    
    // Reset percentage display
    document.querySelector('.percentage-display').textContent = '20%';
}

// Initialize calculator
document.addEventListener('DOMContentLoaded', function() {
    // Force page to start at the top - multiple attempts to ensure it works
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Ensure only the first question is active on page load
    document.querySelectorAll('.question-card').forEach(card => {
        card.classList.remove('active', 'prev');
    });
    document.getElementById('q1').classList.add('active');
    currentQuestion = 1;
    
    // Set up percentage slider
    const percentageSlider = document.getElementById('missed-percentage');
    const percentageDisplay = document.querySelector('.percentage-display');
    
    if (percentageSlider) {
        percentageSlider.addEventListener('input', function() {
            percentageDisplay.textContent = this.value + '%';
        });
    }
    
    // Set up keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const activeCard = document.querySelector('.question-card.active');
            const nextBtn = activeCard.querySelector('.btn-primary');
            if (nextBtn) {
                nextBtn.click();
            }
        }
    });
    
    // Set up input validation
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value && parseInt(this.value) > 0) {
                this.style.borderColor = 'var(--primary-color)';
            } else {
                this.style.borderColor = 'var(--border-color)';
            }
        });
    });
});

// Additional scroll prevention on window load
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
});

// Additional scroll prevention on window focus
window.addEventListener('focus', function() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
});

// Additional scroll prevention on window resize
window.addEventListener('resize', function() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
});

// Prevent any automatic scrolling on page load only
let pageLoaded = false;
window.addEventListener('scroll', function() {
    if (!pageLoaded && window.scrollY > 0) {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }
});

// Allow scrolling after page is fully loaded
window.addEventListener('load', function() {
    pageLoaded = true;
});

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll to contact form
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const offsetTop = contactSection.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Notification system removed - using inline savings message instead

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .float-animation {
        animation: float-gentle 3s ease-in-out infinite;
    }
    
    @keyframes float-gentle {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .animate-in {
        animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-top: none;
        flex-direction: column;
        padding: 20px;
        gap: 20px;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);
