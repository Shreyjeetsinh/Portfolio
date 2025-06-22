// Portfolio JavaScript - Enhanced with animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initScrollAnimations();
    initTypingEffect();
    initParallaxEffect();
    initSmoothScrolling();
    initProjectCards();
    initSkillAnimations();
    initContactForm();
    initLoadingAnimation();
    initMarqueeEffects();
    initImageEffects();
    initParticleSystem();
    initSkillBars();
    initMobileMenu();
    initAvatarInteractions();
    initAnimatedTitles();
    initAnimatedHeaderButton();
    initAnimatedNavButtons();

    // Initialize avatar interactions
    function initAvatarInteractions() {
        const avatar = document.querySelector('.boy-avatar');
        const eyes = document.querySelectorAll('.eye');
        const mouth = document.querySelector('.mouth');
        const arms = document.querySelectorAll('.arm');
        
        if (!avatar) return;

        // Make avatar follow mouse cursor
        document.addEventListener('mousemove', (e) => {
            const rect = avatar.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            
            // Limit eye movement
            const maxMove = 2;
            const eyeMoveX = Math.max(-maxMove, Math.min(maxMove, deltaX * 0.02));
            const eyeMoveY = Math.max(-maxMove, Math.min(maxMove, deltaY * 0.02));
            
            eyes.forEach(eye => {
                eye.style.transform = `translate(${eyeMoveX}px, ${eyeMoveY}px)`;
            });
        });

        // Avatar click interactions
        avatar.addEventListener('click', () => {
            // Make avatar wave
            arms.forEach(arm => {
                arm.style.animation = 'wave 0.5s ease-in-out';
                setTimeout(() => {
                    arm.style.animation = '';
                }, 500);
            });
            
            // Make mouth smile
            if (mouth) {
                mouth.style.animation = 'bounce 0.3s ease-in-out';
                setTimeout(() => {
                    mouth.style.animation = '';
                }, 300);
            }
        });

        // Avatar hover effects
        avatar.addEventListener('mouseenter', () => {
            avatar.style.transform = 'scale(1.1) rotate(5deg)';
            avatar.style.transition = 'transform 0.3s ease';
        });

        avatar.addEventListener('mouseleave', () => {
            avatar.style.transform = 'scale(1) rotate(0deg)';
            // Reset eye position
            eyes.forEach(eye => {
                eye.style.transform = 'translate(0, 0)';
            });
        });

        // Random blinking
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance every 3 seconds
                eyes.forEach(eye => {
                    eye.style.animation = 'blink 0.2s ease-in-out';
                    setTimeout(() => {
                        eye.style.animation = '';
                    }, 200);
                });
            }
        }, 3000);
    }

    // Check if Font Awesome is loaded
    function checkFontAwesome() {
        const testIcon = document.createElement('i');
        testIcon.className = 'fas fa-check';
        testIcon.style.position = 'absolute';
        testIcon.style.left = '-9999px';
        document.body.appendChild(testIcon);
        
        const isLoaded = window.getComputedStyle(testIcon, ':before').content !== 'none';
        document.body.removeChild(testIcon);
        
        return isLoaded;
    }

    // Handle icon loading with fallback
    function handleIconLoading() {
        const marqueeIcons = document.querySelectorAll('.marquee span i');
        
        marqueeIcons.forEach(icon => {
            // Add loading class
            icon.classList.add('loading');
            
            // Set fallback text if icon fails to load
            const fallbackText = getFallbackText(icon.className);
            if (fallbackText) {
                icon.setAttribute('data-fallback', fallbackText);
            }
        });

        // Check if Font Awesome loaded after a short delay
        setTimeout(() => {
            if (checkFontAwesome()) {
                marqueeIcons.forEach(icon => {
                    icon.classList.remove('loading');
                    icon.classList.add('loaded');
                });
            } else {
                // If Font Awesome didn't load, show fallback text
                marqueeIcons.forEach(icon => {
                    const fallback = icon.getAttribute('data-fallback');
                    if (fallback) {
                        icon.textContent = fallback;
                        icon.classList.add('fallback');
                    }
                });
            }
        }, 1000);
    }

    // Get fallback text for each icon
    function getFallbackText(className) {
        const fallbacks = {
            'fas fa-rocket': '🚀',
            'fas fa-code': '💻',
            'fas fa-palette': '🎨',
            'fas fa-mobile-alt': '📱',
            'fas fa-tools': '🔧',
            'fas fa-star': '⭐'
        };
        
        for (const [iconClass, fallback] of Object.entries(fallbacks)) {
            if (className.includes(iconClass.split(' ')[2])) {
                return fallback;
            }
        }
        return null;
    }

    // Initialize icon loading
    handleIconLoading();

    // Smooth scrolling for navigation links
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

    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    
    if (mobileMenu && nav) {
        mobileMenu.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (nav.classList.contains('active')) {
                document.body.classList.add('menu-open');
                document.body.style.overflow = 'hidden';
                // Add backdrop blur effect
                document.body.style.filter = 'blur(5px)';
            } else {
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
                document.body.style.filter = '';
            }
            
            // Change icon with smooth transition
            const icon = mobileMenu.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.style.transform = 'rotate(90deg)';
                setTimeout(() => {
                    icon.className = 'fas fa-times';
                    icon.style.transform = 'rotate(0deg)';
                }, 150);
            } else {
                icon.style.transform = 'rotate(90deg)';
                setTimeout(() => {
                    icon.className = 'fas fa-bars';
                    icon.style.transform = 'rotate(0deg)';
                }, 150);
            }
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
            document.body.style.filter = '';
            
            const icon = mobileMenu.querySelector('i');
            icon.style.transform = 'rotate(90deg)';
            setTimeout(() => {
                icon.className = 'fas fa-bars';
                icon.style.transform = 'rotate(0deg)';
            }, 150);
        });
    });

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animate elements on scroll
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
    document.querySelectorAll('.skill-category, .project-card, .contact-item').forEach(el => {
        observer.observe(el);
    });
});

// Scroll animations for elements
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .project-card, .skill-category').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Typing effect for hero section
function initTypingEffect() {
    const heroTitle = document.querySelector('#hero h2');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--primary-color)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Parallax effect for hero background
function initParallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
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
}

// Interactive project cards
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                this.style.transform = 'translateY(-15px) scale(1.02)';
                setTimeout(() => {
                    this.style.transform = 'translateY(0) scale(1)';
                }, 150);
            }
        });
    });
}

// Animated skill items with progress bars
function initSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        // Stagger animation
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
        
        // Add hover sound effect (visual feedback)
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Animate skill progress bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = bar.getAttribute('data-level');
                bar.style.width = level + '%';
                
                // Add percentage text
                const percentage = document.createElement('span');
                percentage.textContent = level + '%';
                percentage.style.cssText = `
                    position: absolute;
                    right: -30px;
                    top: -2px;
                    font-size: 0.7rem;
                    color: var(--primary-color);
                    font-weight: 600;
                `;
                bar.parentElement.style.position = 'relative';
                bar.parentElement.appendChild(percentage);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('header nav ul');
    
    if (mobileMenu && nav) {
        // Add touch feedback
        mobileMenu.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        mobileMenu.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        mobileMenu.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (nav.classList.contains('active')) {
                document.body.classList.add('menu-open');
                document.body.style.overflow = 'hidden';
                // Add backdrop blur effect
                document.body.style.filter = 'blur(5px)';
            } else {
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
                document.body.style.filter = '';
            }
            
            // Change icon with smooth transition
            const icon = mobileMenu.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.style.transform = 'rotate(90deg)';
                setTimeout(() => {
                    icon.className = 'fas fa-times';
                    icon.style.transform = 'rotate(0deg)';
                }, 150);
            } else {
                icon.style.transform = 'rotate(90deg)';
                setTimeout(() => {
                    icon.className = 'fas fa-bars';
                    icon.style.transform = 'rotate(0deg)';
                }, 150);
            }
        });
        
        // Close menu when clicking on a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
                document.body.style.filter = '';
                
                const icon = mobileMenu.querySelector('i');
                icon.style.transform = 'rotate(90deg)';
                setTimeout(() => {
                    icon.className = 'fas fa-bars';
                    icon.style.transform = 'rotate(0deg)';
                }, 150);
            });
            
            // Add touch feedback for nav links
            link.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            link.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.filter = '';
                
                const icon = mobileMenu.querySelector('i');
                icon.className = 'fas fa-bars';
                icon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                nav.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.filter = '';
                
                const icon = mobileMenu.querySelector('i');
                icon.className = 'fas fa-bars';
                icon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Enhanced touch/swipe support for mobile
        let startX = 0;
        let startY = 0;
        let isSwiping = false;
        
        nav.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isSwiping = false;
        });
        
        nav.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            const diffX = startX - e.touches[0].clientX;
            const diffY = startY - e.touches[0].clientY;
            
            // If horizontal swipe is greater than vertical and significant
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
                isSwiping = true;
                e.preventDefault(); // Prevent default scroll
            }
        });
        
        nav.addEventListener('touchend', (e) => {
            if (!startX || !startY || !isSwiping) {
                startX = 0;
                startY = 0;
                isSwiping = false;
                return;
            }
            
            const diffX = startX - e.changedTouches[0].clientX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - close menu
                    nav.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    document.body.style.filter = '';
                    
                    const icon = mobileMenu.querySelector('i');
                    icon.className = 'fas fa-bars';
                    icon.style.transform = 'rotate(0deg)';
                }
            }
            
            startX = 0;
            startY = 0;
            isSwiping = false;
        });
        
        // Add keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.filter = '';
                
                const icon = mobileMenu.querySelector('i');
                icon.className = 'fas fa-bars';
                icon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Add focus management for accessibility
        mobileMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                mobileMenu.click();
            }
        });
        
        // Improve accessibility
        mobileMenu.setAttribute('role', 'button');
        mobileMenu.setAttribute('aria-label', 'Toggle navigation menu');
        mobileMenu.setAttribute('aria-expanded', 'false');
        
        // Update aria-expanded when menu toggles
        const updateAriaExpanded = () => {
            const isExpanded = nav.classList.contains('active');
            mobileMenu.setAttribute('aria-expanded', isExpanded.toString());
        };
        
        mobileMenu.addEventListener('click', updateAriaExpanded);
    }
}

// Contact form functionality
function initContactForm() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Loading animation
function initLoadingAnimation() {
    // Simulate loading time for better UX
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        body.style.opacity = '1';
    }, 100);
}

// Enhanced marquee effects
function initMarqueeEffects() {
    const marquee = document.querySelector('.marquee');
    const skillsScroll = document.querySelector('.skills-scroll');
    
    if (marquee) {
        // Pause marquee on hover
        marquee.addEventListener('mouseenter', () => {
            marquee.style.animationPlayState = 'paused';
        });
        
        marquee.addEventListener('mouseleave', () => {
            marquee.style.animationPlayState = 'running';
        });
    }
    
    if (skillsScroll) {
        // Pause skills scroll on hover
        skillsScroll.addEventListener('mouseenter', () => {
            skillsScroll.style.animationPlayState = 'paused';
        });
        
        skillsScroll.addEventListener('mouseleave', () => {
            skillsScroll.style.animationPlayState = 'running';
        });
    }
}

// Enhanced image effects
function initImageEffects() {
    const profileImage = document.querySelector('.profile-image');
    
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Add parallax effect to project images
    const projectImages = document.querySelectorAll('.project-img');
    
    projectImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Particle system for background
function initParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: var(--primary-color);
        border-radius: 50%;
        opacity: 0.3;
        animation: float 6s ease-in-out infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, 6000);
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
        }
        25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
        }
        50% {
            transform: translateY(-10px) translateX(-10px);
            opacity: 0.8;
        }
        75% {
            transform: translateY(-30px) translateX(5px);
            opacity: 0.4;
        }
    }
`;
document.head.appendChild(style);

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Reveal on scroll with throttling
function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', throttle(revealOnScroll, 100));

// Show loading screen on page load
function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-color);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease-out;
    `;
    
    const spinner = document.createElement('div');
    spinner.className = 'loading';
    loadingScreen.appendChild(spinner);
    
    document.body.appendChild(loadingScreen);
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1000);
}

// Initialize animated titles with scroll triggers
function initAnimatedTitles() {
    const animatedTitles = document.querySelectorAll('.animated-title');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target;
                const titleLines = title.querySelectorAll('.title-line');
                const decoration = title.querySelector('.title-decoration');
                
                // Reset animations
                titleLines.forEach(line => {
                    line.style.animation = 'none';
                    line.offsetHeight; // Trigger reflow
                });
                
                if (decoration) {
                    decoration.style.animation = 'none';
                    decoration.offsetHeight; // Trigger reflow
                }
                
                // Start animations
                titleLines.forEach((line, index) => {
                    line.style.animation = `slideInUp 0.8s ease forwards ${index * 0.2}s`;
                });
                
                if (decoration) {
                    decoration.style.animation = 'fadeInScale 0.6s ease forwards 0.4s';
                }
                
                // Add a subtle glow effect
                title.style.filter = 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))';
                setTimeout(() => {
                    title.style.filter = 'none';
                }, 1000);
                
                titleObserver.unobserve(title);
            }
        });
    }, observerOptions);
    
    animatedTitles.forEach(title => {
        titleObserver.observe(title);
    });
    
    // Add hover sound effects (optional)
    animatedTitles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            // Add a subtle scale effect on hover
            title.style.transform = 'scale(1.02)';
            title.style.transition = 'transform 0.3s ease';
        });
        
        title.addEventListener('mouseleave', () => {
            title.style.transform = 'scale(1)';
        });
    });
}

// Initialize animated header button
function initAnimatedHeaderButton() {
    const hireMeBtn = document.querySelector('.hire-me-btn');
    if (!hireMeBtn) return;

    // Add click animation
    hireMeBtn.addEventListener('click', function(e) {
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

        // Add click sound effect (optional)
        playClickSound();
        
        // Trigger particle burst
        createParticleBurst(this);
    });

    // Add hover effects
    hireMeBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
        this.style.boxShadow = '0 12px 30px rgba(102, 126, 234, 0.8)';
        
        // Animate icon
        const icon = this.querySelector('.btn-icon i');
        if (icon) {
            icon.style.animation = 'rocketShake 0.5s ease-in-out';
        }
    });

    hireMeBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
        
        // Reset icon animation
        const icon = this.querySelector('.btn-icon i');
        if (icon) {
            icon.style.animation = '';
        }
    });

    // Add keyboard support
    hireMeBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });

    // Add focus styles
    hireMeBtn.addEventListener('focus', function() {
        this.style.outline = '2px solid rgba(102, 126, 234, 0.5)';
        this.style.outlineOffset = '2px';
    });

    hireMeBtn.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
}

// Create particle burst effect
function createParticleBurst(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'burst-particle';
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: burstParticle 0.8s ease-out forwards;
        `;
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        particle.style.setProperty('--end-x', endX + 'px');
        particle.style.setProperty('--end-y', endY + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
}

// Play click sound effect
function playClickSound() {
    // Create a simple click sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        // Fallback for browsers that don't support Web Audio API
        console.log('Audio not supported');
    }
}

// Initialize animated navigation buttons
function initAnimatedNavButtons() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        // Add click effects
        button.addEventListener('click', function(e) {
            // Create ripple effect
            createNavRipple(this, e);
            
            // Add active state
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Animate icon
            const icon = this.querySelector('.nav-btn-icon i');
            if (icon) {
                icon.style.animation = 'navIconBounce 0.6s ease-in-out';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 600);
            }
        });

        // Add hover effects
        button.addEventListener('mouseenter', function() {
            // Add floating effect
            this.style.transform = 'translateY(-2px)';
            
            // Animate icon
            const icon = this.querySelector('.nav-btn-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });

        button.addEventListener('mouseleave', function() {
            // Reset transform
            this.style.transform = 'translateY(0)';
            
            // Reset icon
            const icon = this.querySelector('.nav-btn-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });

        // Add keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Set active state based on current section
    updateActiveNavButton();
    
    // Update active state on scroll
    window.addEventListener('scroll', throttle(updateActiveNavButton, 100));
}

// Create ripple effect for navigation buttons
function createNavRipple(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(59, 130, 246, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: navRippleEffect 0.6s linear;
        pointer-events: none;
        z-index: 1;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Update active navigation button based on scroll position
function updateActiveNavButton() {
    const sections = ['about', 'skills', 'projects', 'contact'];
    const navButtons = document.querySelectorAll('.nav-btn');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section;
            }
        }
    });
    
    navButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('href') === `#${currentSection}`) {
            button.classList.add('active');
        }
    });
}

console.log('Portfolio enhanced with cool animations and interactions! 🚀'); 