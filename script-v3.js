/**
 * TENWAYS V3 - UI/UX Pro Max Design System
 * Interactions with accessibility and reduced motion support
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ========================================
    // Promo Bar Close
    // ========================================
    const promoBar = document.querySelector('.promo-bar');
    const promoClose = document.querySelector('.promo-close');

    if (promoClose && promoBar) {
        promoClose.addEventListener('click', () => {
            promoBar.style.display = 'none';
        });
    }

    // ========================================
    // Hero Slider
    // ========================================
    const heroNavBtns = document.querySelectorAll('.hero-nav-btn');
    let currentHeroSlide = 0;
    let heroInterval;

    const heroSlides = [
        {
            badge: 'New Release',
            subtitle: 'The Refined Comfort Explorer',
            title: 'WAYFARER',
            desc: 'An all-road e-bike engineered for comfort and effortless range. Premium craftsmanship meets sustainable mobility.',
            specs: { range: '70km', weight: '19kg', price: '$1,999' }
        },
        {
            badge: 'Popular',
            subtitle: 'Comfort Meets Style',
            title: 'CGO800S',
            desc: 'A comfortable e-bike for commuting and leisure rides. Where elegance meets everyday practicality.',
            specs: { range: '100km', weight: '17kg', price: '$1,799' }
        },
        {
            badge: 'Bestseller',
            subtitle: 'The Lightweight Champion',
            title: 'CGO600 Pro',
            desc: 'Available in Shimano 8-Speed or Gates Carbon Belt Drive. Pure performance, zero compromise.',
            specs: { range: '100km', weight: '16kg', price: '$1,299' }
        },
        {
            badge: 'New',
            subtitle: 'The Urban All-rounder',
            title: 'AGO X',
            desc: 'Designed for daily errands and excelling on tougher terrains. Built for those who demand more.',
            specs: { range: '80km', weight: '21kg', price: '$1,699' }
        }
    ];

    function updateHeroSlide(index) {
        heroNavBtns.forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
            btn.setAttribute('aria-current', i === index ? 'true' : 'false');
        });

        const content = heroSlides[index];
        const heroContent = document.querySelector('.hero-content');

        if (heroContent && !prefersReducedMotion) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(20px)';

            setTimeout(() => {
                document.querySelector('.hero-badge span').textContent = content.badge;
                document.querySelector('.title-small').textContent = content.subtitle;
                document.querySelector('.title-large').textContent = content.title;
                document.querySelector('.hero-desc').textContent = content.desc;
                document.querySelectorAll('.spec-value')[0].textContent = content.specs.range;
                document.querySelectorAll('.spec-value')[1].textContent = content.specs.weight;
                document.querySelectorAll('.spec-value')[2].textContent = content.specs.price;

                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }

        currentHeroSlide = index;
    }

    heroNavBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            clearInterval(heroInterval);
            updateHeroSlide(index);
            startHeroAutoplay();
        });
    });

    function startHeroAutoplay() {
        if (!prefersReducedMotion) {
            heroInterval = setInterval(() => {
                const next = (currentHeroSlide + 1) % heroSlides.length;
                updateHeroSlide(next);
            }, 6000);
        }
    }

    startHeroAutoplay();

    // ========================================
    // Category Tabs
    // ========================================
    const categoryTabs = document.querySelectorAll('.category-tab');
    const categoryPanels = document.querySelectorAll('.category-panel');

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('aria-controls');

            // Update tabs
            categoryTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            // Update panels
            categoryPanels.forEach(panel => {
                if (panel.id === targetId) {
                    panel.classList.add('active');
                    panel.removeAttribute('hidden');
                } else {
                    panel.classList.remove('active');
                    panel.setAttribute('hidden', '');
                }
            });
        });

        // Keyboard navigation
        tab.addEventListener('keydown', (e) => {
            const tabs = Array.from(categoryTabs);
            const index = tabs.indexOf(tab);

            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const next = tabs[(index + 1) % tabs.length];
                next.focus();
                next.click();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prev = tabs[(index - 1 + tabs.length) % tabs.length];
                prev.focus();
                prev.click();
            }
        });
    });

    // ========================================
    // Testimonials Carousel
    // ========================================
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const testimonialPrev = document.querySelector('.testimonial-btn.prev');
    const testimonialNext = document.querySelector('.testimonial-btn.next');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonialSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
            dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
        });

        currentTestimonial = index;
    }

    function nextTestimonial() {
        showTestimonial((currentTestimonial + 1) % testimonialSlides.length);
    }

    function prevTestimonial() {
        showTestimonial((currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length);
    }

    if (testimonialNext) {
        testimonialNext.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            nextTestimonial();
            startTestimonialAutoplay();
        });
    }

    if (testimonialPrev) {
        testimonialPrev.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            prevTestimonial();
            startTestimonialAutoplay();
        });
    }

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            showTestimonial(index);
            startTestimonialAutoplay();
        });
    });

    function startTestimonialAutoplay() {
        if (!prefersReducedMotion) {
            testimonialInterval = setInterval(nextTestimonial, 5000);
        }
    }

    startTestimonialAutoplay();

    // ========================================
    // Scroll Animations
    // ========================================
    if (!prefersReducedMotion) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-visible');
                    animateOnScroll.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section-header, .product-card, .feature-card, .discover-card').forEach(el => {
            el.classList.add('animate-on-scroll');
            animateOnScroll.observe(el);
        });

        // Add animation styles
        const animationStyles = document.createElement('style');
        animationStyles.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 600ms cubic-bezier(0.33, 1, 0.68, 1),
                            transform 600ms cubic-bezier(0.33, 1, 0.68, 1);
            }

            .animate-on-scroll.animate-visible {
                opacity: 1;
                transform: translateY(0);
            }

            .product-card.animate-on-scroll,
            .feature-card.animate-on-scroll,
            .discover-card.animate-on-scroll {
                transition-delay: calc(var(--stagger, 0) * 100ms);
            }
        `;
        document.head.appendChild(animationStyles);

        // Add stagger delays
        document.querySelectorAll('.product-grid .product-card').forEach((card, i) => {
            card.style.setProperty('--stagger', i);
        });
        document.querySelectorAll('.features-grid .feature-card').forEach((card, i) => {
            card.style.setProperty('--stagger', i);
        });
        document.querySelectorAll('.discover-grid .discover-card').forEach((card, i) => {
            card.style.setProperty('--stagger', i);
        });
    }

    // ========================================
    // Header Scroll Behavior
    // ========================================
    const header = document.querySelector('.header');
    let lastScrollY = 0;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (scrollY > lastScrollY && scrollY > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    // Add header scroll styles
    const headerStyles = document.createElement('style');
    headerStyles.textContent = `
        .header {
            transition: transform 400ms cubic-bezier(0.33, 1, 0.68, 1);
        }

        .header.hidden {
            transform: translateY(-100%);
        }
    `;
    document.head.appendChild(headerStyles);

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

                    if (prefersReducedMotion) {
                        window.scrollTo(0, targetPosition);
                    } else {
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });

    // ========================================
    // Newsletter Form
    // ========================================
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            const checkbox = this.querySelector('input[type="checkbox"]');

            if (emailInput.value && checkbox.checked) {
                // Disable button during "submission"
                submitBtn.disabled = true;
                const originalContent = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Subscribing...</span>';

                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Subscribed!</span>';
                    submitBtn.style.background = '#22c55e';

                    setTimeout(() => {
                        submitBtn.innerHTML = originalContent;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                        this.reset();
                    }, 2000);
                }, 1000);
            }
        });
    }

    // ========================================
    // Chat Widget
    // ========================================
    const chatWidget = document.querySelector('.chat-widget');

    if (chatWidget) {
        chatWidget.addEventListener('click', () => {
            // Placeholder for chat integration
            alert('Chat support would open here');
        });
    }

    // ========================================
    // Mobile Menu
    // ========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);

            // Toggle mobile menu visibility
            if (!isExpanded) {
                navMenu.classList.add('mobile-open');
            } else {
                navMenu.classList.remove('mobile-open');
            }
        });
    }

    // Add mobile menu styles
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        @media (max-width: 1023px) {
            .nav-menu.mobile-open {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: var(--glass-bg, rgba(255, 255, 255, 0.95));
                backdrop-filter: blur(20px);
                border-bottom: 1px solid var(--color-border, #E7E5E4);
                padding: var(--space-4, 1rem);
            }
        }
    `;
    document.head.appendChild(mobileStyles);

    // ========================================
    // Image Lazy Loading Enhancement
    // ========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});
