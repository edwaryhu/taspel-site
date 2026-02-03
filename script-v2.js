// ========================================
// TENWAYS V2 - Enhanced Interactions
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Mobile Menu
    // ========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu on resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ========================================
    // Stat Counter Animation
    // ========================================
    const stats = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const countUp = (element, target) => {
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);

            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                countUp(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    // ========================================
    // Bikes Carousel
    // ========================================
    const bikesCarousel = document.querySelector('.bikes-carousel');
    const bikeSlides = document.querySelectorAll('.bike-slide');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const prevBtn = document.querySelector('.carousel-nav .prev');
    const nextBtn = document.querySelector('.carousel-nav .next');
    let currentBikeSlide = 0;
    let bikeInterval;

    function showBikeSlide(index) {
        bikeSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
        });
        currentBikeSlide = index;
    }

    function nextBikeSlide() {
        const next = (currentBikeSlide + 1) % bikeSlides.length;
        showBikeSlide(next);
    }

    function prevBikeSlide() {
        const prev = (currentBikeSlide - 1 + bikeSlides.length) % bikeSlides.length;
        showBikeSlide(prev);
    }

    function startBikeAutoplay() {
        bikeInterval = setInterval(nextBikeSlide, 6000);
    }

    function stopBikeAutoplay() {
        clearInterval(bikeInterval);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopBikeAutoplay();
            nextBikeSlide();
            startBikeAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopBikeAutoplay();
            prevBikeSlide();
            startBikeAutoplay();
        });
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopBikeAutoplay();
            showBikeSlide(index);
            startBikeAutoplay();
        });
    });

    if (bikesCarousel) {
        bikesCarousel.addEventListener('mouseenter', stopBikeAutoplay);
        bikesCarousel.addEventListener('mouseleave', startBikeAutoplay);
        startBikeAutoplay();
    }

    // ========================================
    // Testimonials Slider
    // ========================================
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialPrev = document.querySelector('.testimonial-nav .prev');
    const testimonialNext = document.querySelector('.testimonial-nav .next');
    const progressBar = document.querySelector('.progress-bar');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.classList.toggle('active', i === index);
        });
        if (progressBar) {
            progressBar.style.width = ((index + 1) / testimonials.length * 100) + '%';
        }
        currentTestimonial = index;
    }

    function nextTestimonial() {
        const next = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(next);
    }

    function prevTestimonialSlide() {
        const prev = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(prev);
    }

    function startTestimonialAutoplay() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    function stopTestimonialAutoplay() {
        clearInterval(testimonialInterval);
    }

    if (testimonialNext) {
        testimonialNext.addEventListener('click', () => {
            stopTestimonialAutoplay();
            nextTestimonial();
            startTestimonialAutoplay();
        });
    }

    if (testimonialPrev) {
        testimonialPrev.addEventListener('click', () => {
            stopTestimonialAutoplay();
            prevTestimonialSlide();
            startTestimonialAutoplay();
        });
    }

    startTestimonialAutoplay();

    // ========================================
    // Scroll Animations
    // ========================================
    const animatedElements = document.querySelectorAll(`
        .section-header,
        .bike-card,
        .category-card,
        .feature-card,
        .discover-card,
        .newsletter-container,
        .testimonial-slider
    `);

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.classList.add('scroll-animate');
        scrollObserver.observe(el);
    });

    // Add scroll animation CSS
    const scrollStyle = document.createElement('style');
    scrollStyle.textContent = `
        .scroll-animate {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scroll-animate.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .category-card.scroll-animate,
        .discover-card.scroll-animate,
        .feature-card.scroll-animate {
            transition-delay: calc(var(--delay, 0) * 0.1s);
        }
    `;
    document.head.appendChild(scrollStyle);

    // Stagger animation delays
    document.querySelectorAll('.categories-grid .category-card').forEach((card, i) => {
        card.style.setProperty('--delay', i);
    });
    document.querySelectorAll('.discover-grid .discover-card').forEach((card, i) => {
        card.style.setProperty('--delay', i);
    });
    document.querySelectorAll('.features-bento .feature-card').forEach((card, i) => {
        card.style.setProperty('--delay', i);
    });

    // ========================================
    // Header Scroll Effect
    // ========================================
    const header = document.querySelector('.header');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (currentScrollY > lastScrollY && currentScrollY > 300) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
    });

    // Add header scroll styles
    const headerStyle = document.createElement('style');
    headerStyle.textContent = `
        .header {
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .header.hidden {
            transform: translateY(-100%);
        }

        .header.scrolled .main-nav {
            background: rgba(10, 10, 10, 0.95);
        }
    `;
    document.head.appendChild(headerStyle);

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
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
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
            const email = this.querySelector('input[type="email"]').value;
            const checkbox = this.querySelector('input[type="checkbox"]').checked;

            if (email && checkbox) {
                // Show success state
                const btn = this.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = 'Subscribed!';
                btn.style.background = 'var(--color-accent)';

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    this.reset();
                }, 3000);
            }
        });
    }

    // ========================================
    // Chat Widget
    // ========================================
    const chatWidget = document.querySelector('.chat-widget');
    if (chatWidget) {
        chatWidget.addEventListener('click', () => {
            // Add your chat integration here
            alert('Chat support opening...');
        });
    }

    // ========================================
    // 3D Tilt Effect for Category Cards
    // ========================================
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach(card => {
        let bounds;
        let glowEl = card.querySelector('.card-glow');

        function rotateToMouse(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const leftX = mouseX - bounds.x;
            const topY = mouseY - bounds.y;
            const center = {
                x: leftX - bounds.width / 2,
                y: topY - bounds.height / 2
            };
            const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

            card.style.transform = `
                perspective(1000px)
                rotateX(${center.y / -20}deg)
                rotateY(${center.x / 20}deg)
                translateY(-8px)
                scale3d(1.02, 1.02, 1.02)
            `;

            // Move glow to follow cursor
            if (glowEl) {
                glowEl.style.backgroundImage = `
                    radial-gradient(
                        circle at ${leftX}px ${topY}px,
                        rgba(0, 255, 136, 0.4),
                        transparent 50%
                    )
                `;
            }
        }

        card.addEventListener('mouseenter', () => {
            bounds = card.getBoundingClientRect();
            card.style.transition = 'transform 0.1s ease-out';
        });

        card.addEventListener('mousemove', rotateToMouse);

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.transform = '';
            if (glowEl) {
                glowEl.style.backgroundImage = '';
            }
        });
    });

    // ========================================
    // Scroll-triggered animations for categories
    // ========================================
    const categoriesSection = document.querySelector('.categories');

    if (categoriesSection) {
        const categoryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    categoryObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        categoryObserver.observe(categoriesSection);
    }

    // Add category section animation styles
    const categoryAnimStyle = document.createElement('style');
    categoryAnimStyle.textContent = `
        .categories .section-header {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .categories.in-view .section-header {
            opacity: 1;
            transform: translateY(0);
        }

        .categories .category-card {
            opacity: 0;
            transform: translateY(60px) rotateX(10deg);
        }

        .categories.in-view .category-card {
            opacity: 1;
            transform: translateY(0) rotateX(0);
        }

        .categories.in-view .category-card:nth-child(1) { transition-delay: 0.15s; }
        .categories.in-view .category-card:nth-child(2) { transition-delay: 0.25s; }
        .categories.in-view .category-card:nth-child(3) { transition-delay: 0.35s; }
        .categories.in-view .category-card:nth-child(4) { transition-delay: 0.45s; }
    `;
    document.head.appendChild(categoryAnimStyle);

    // ========================================
    // Magnetic Buttons
    // ========================================
    const magneticBtns = document.querySelectorAll('.btn-primary, .carousel-btn, .testimonial-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ========================================
    // Parallax Background
    // ========================================
    const heroVideo = document.querySelector('.hero-video');
    const supportBg = document.querySelector('.support-bg img');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (heroVideo && scrollY < window.innerHeight) {
            heroVideo.style.transform = `translateY(${scrollY * 0.3}px)`;
        }

        if (supportBg) {
            const supportSection = document.querySelector('.support-cta');
            const sectionTop = supportSection.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight && sectionTop > -supportSection.offsetHeight) {
                supportBg.style.transform = `translateY(${sectionTop * 0.1}px)`;
            }
        }
    });

    // ========================================
    // Image Lazy Loading with Fade
    // ========================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ========================================
    // Touch/Swipe Support for Carousels
    // ========================================
    let touchStartX = 0;
    let touchEndX = 0;

    if (bikesCarousel) {
        bikesCarousel.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        bikesCarousel.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            stopBikeAutoplay();
            if (diff > 0) {
                nextBikeSlide();
            } else {
                prevBikeSlide();
            }
            startBikeAutoplay();
        }
    }

    // ========================================
    // Preloader (optional)
    // ========================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Add loaded state styles
    const loadedStyle = document.createElement('style');
    loadedStyle.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }

        body.loaded .hero-content,
        body.loaded .hero-stats {
            animation-play-state: running;
        }
    `;
    document.head.appendChild(loadedStyle);

});
