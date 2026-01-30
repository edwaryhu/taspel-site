// ========================================
// Product Page - Classic Landing
// Scrollspy, Gallery, Modal, Comparison
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Hero Parallax Effects
    // ========================================
    const heroShowcase = document.querySelector('.product-hero-showcase');
    const productImage = document.querySelector('.product-main-image');
    const floatingSpecs = document.querySelectorAll('.floating-spec');
    const hotspots = document.querySelectorAll('.hotspot');
    const orbs = document.querySelectorAll('.hero-gradient-orb');

    if (heroShowcase && window.innerWidth > 768) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        document.addEventListener('mousemove', (e) => {
            const rect = heroShowcase.getBoundingClientRect();
            mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
            mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
        });

        function animateParallax() {
            // Smooth interpolation
            currentX += (mouseX - currentX) * 0.05;
            currentY += (mouseY - currentY) * 0.05;

            // Product image subtle movement
            if (productImage) {
                productImage.style.transform = `
                    translateY(${Math.sin(Date.now() / 1000) * 10}px)
                    rotateY(${currentX * 5}deg)
                    rotateX(${-currentY * 5}deg)
                `;
            }

            // Floating specs parallax
            floatingSpecs.forEach((spec, index) => {
                const depth = (index + 1) * 10;
                spec.style.transform = `
                    translate(${currentX * depth}px, ${currentY * depth}px)
                `;
            });

            // Hotspots follow slightly
            hotspots.forEach((hotspot, index) => {
                const depth = (index + 1) * 5;
                hotspot.style.transform = `
                    translate(${currentX * depth}px, ${currentY * depth}px)
                `;
            });

            // Orbs move in opposite direction for depth
            orbs.forEach((orb, index) => {
                const depth = (index + 1) * -20;
                orb.style.transform = `
                    translate(${currentX * depth}px, ${currentY * depth}px)
                `;
            });

            requestAnimationFrame(animateParallax);
        }

        animateParallax();
    }

    // ========================================
    // Hero Title Animation Enhancement
    // ========================================
    const titleSpan = document.querySelector('.title-line span');
    if (titleSpan) {
        // Add letters for individual animation if needed
        const text = titleSpan.textContent;
        // Keep it simple for now, the CSS handles the animation
    }

    // ========================================
    // Feature Strip Swipeable Carousel
    // ========================================
    const featureStrip = document.getElementById('featureStrip');
    const stripPrevBtn = document.querySelector('.strip-nav-btn.prev');
    const stripNextBtn = document.querySelector('.strip-nav-btn.next');
    const stripProgressBar = document.querySelector('.strip-progress-bar');

    if (featureStrip) {
        const cardWidth = 240 + 24; // card width + gap
        let isDown = false;
        let startX;
        let scrollLeft;

        // Drag to scroll
        featureStrip.addEventListener('mousedown', (e) => {
            isDown = true;
            featureStrip.style.cursor = 'grabbing';
            startX = e.pageX - featureStrip.offsetLeft;
            scrollLeft = featureStrip.scrollLeft;
        });

        featureStrip.addEventListener('mouseleave', () => {
            isDown = false;
            featureStrip.style.cursor = 'grab';
        });

        featureStrip.addEventListener('mouseup', () => {
            isDown = false;
            featureStrip.style.cursor = 'grab';
        });

        featureStrip.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - featureStrip.offsetLeft;
            const walk = (x - startX) * 2;
            featureStrip.scrollLeft = scrollLeft - walk;
        });

        // Touch events for mobile
        let touchStartX = 0;
        let touchScrollLeft = 0;

        featureStrip.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].pageX;
            touchScrollLeft = featureStrip.scrollLeft;
        }, { passive: true });

        featureStrip.addEventListener('touchmove', (e) => {
            const touchX = e.touches[0].pageX;
            const walk = (touchStartX - touchX) * 1.5;
            featureStrip.scrollLeft = touchScrollLeft + walk;
        }, { passive: true });

        // Navigation buttons
        if (stripPrevBtn) {
            stripPrevBtn.addEventListener('click', () => {
                featureStrip.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' });
            });
        }

        if (stripNextBtn) {
            stripNextBtn.addEventListener('click', () => {
                featureStrip.scrollBy({ left: cardWidth * 2, behavior: 'smooth' });
            });
        }

        // Update progress bar
        function updateProgress() {
            const scrollWidth = featureStrip.scrollWidth - featureStrip.clientWidth;
            const scrollPercent = (featureStrip.scrollLeft / scrollWidth) * 100;
            const barWidth = (featureStrip.clientWidth / featureStrip.scrollWidth) * 100;

            if (stripProgressBar) {
                stripProgressBar.style.width = `${Math.max(barWidth, 15)}%`;
                stripProgressBar.style.transform = `translateX(${scrollPercent * (100 / barWidth - 1)}%)`;
            }

            // Update button states
            if (stripPrevBtn) {
                stripPrevBtn.disabled = featureStrip.scrollLeft <= 10;
            }
            if (stripNextBtn) {
                stripNextBtn.disabled = featureStrip.scrollLeft >= scrollWidth - 10;
            }
        }

        featureStrip.addEventListener('scroll', updateProgress);
        window.addEventListener('resize', updateProgress);

        // Initial update
        setTimeout(updateProgress, 100);
    }

    // ========================================
    // Hotspot Interaction
    // ========================================
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('mouseenter', function() {
            // Pause the ping animation on hover
            const ping = this.querySelector('.hotspot-ping');
            if (ping) {
                ping.style.animationPlayState = 'paused';
            }
        });

        hotspot.addEventListener('mouseleave', function() {
            const ping = this.querySelector('.hotspot-ping');
            if (ping) {
                ping.style.animationPlayState = 'running';
            }
        });
    });

    // ========================================
    // Sticky Section Nav (Scrollspy)
    // ========================================
    const sectionNav = document.getElementById('section-nav');
    const navTabs = document.querySelectorAll('.nav-tab');
    const productHero = document.querySelector('.product-hero');

    // Sections to track
    const sections = {
        'overview': document.getElementById('overview'),
        'performance': document.getElementById('performance'),
        'design': document.getElementById('design'),
        'connectivity': document.getElementById('connectivity'),
        'specifications': document.getElementById('specifications')
    };

    // Show/hide sticky nav based on scroll position
    function updateStickyNav() {
        if (!sectionNav || !productHero) return;

        const heroBottom = productHero.getBoundingClientRect().bottom;

        if (heroBottom <= 0) {
            sectionNav.classList.add('visible');
        } else {
            sectionNav.classList.remove('visible');
        }
    }

    // Update active tab based on scroll position
    function updateActiveTab() {
        const scrollPosition = window.scrollY + 100; // Offset for sticky nav height

        let currentSection = 'overview';

        for (const [id, section] of Object.entries(sections)) {
            if (section && section.offsetTop <= scrollPosition) {
                currentSection = id;
            }
        }

        navTabs.forEach(tab => {
            if (tab.dataset.section === currentSection) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }

    // Smooth scroll to section on tab click
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const navHeight = sectionNav ? sectionNav.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Throttled scroll handler
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateStickyNav();
                updateActiveTab();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial check
    updateStickyNav();
    updateActiveTab();

    // ========================================
    // Feature Chips - Smooth Scroll
    // ========================================
    const chips = document.querySelectorAll('.chip');

    chips.forEach(chip => {
        chip.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const navHeight = sectionNav ? sectionNav.offsetHeight : 60;
                const targetPosition = targetSection.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Feature Story Strip - Smooth Scroll Links
    // ========================================
    const featureStories = document.querySelectorAll('.feature-story');

    featureStories.forEach(story => {
        story.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const navHeight = sectionNav ? sectionNav.offsetHeight : 60;
                const targetPosition = targetSection.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Design Gallery
    // ========================================
    const galleryMain = document.querySelector('.gallery-main img');
    const galleryCaption = document.querySelector('.gallery-caption p');
    const galleryCount = document.querySelector('.gallery-caption span');
    const galleryThumbs = document.querySelectorAll('.gallery-thumb');

    const galleryData = [
        { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop', caption: 'Streamlined cockpit and handlebars' },
        { src: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=1200&h=800&fit=crop', caption: 'Integrated display and controls' },
        { src: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=1200&h=800&fit=crop', caption: 'Iconic front light, always on' },
        { src: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&h=800&fit=crop', caption: 'Sport saddle with ergonomic design' }
    ];

    galleryThumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            // Update active state
            galleryThumbs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Update main image with fade
            if (galleryMain) {
                galleryMain.style.opacity = '0';
                setTimeout(() => {
                    galleryMain.src = galleryData[index].src;
                    galleryMain.style.opacity = '1';
                }, 200);
            }

            // Update caption
            if (galleryCaption) {
                galleryCaption.textContent = galleryData[index].caption;
            }

            // Update count
            if (galleryCount) {
                galleryCount.textContent = `0${index + 1} / 0${galleryData.length}`;
            }
        });
    });

    // Add transition to gallery main image
    if (galleryMain) {
        galleryMain.style.transition = 'opacity 0.3s ease';
    }

    // ========================================
    // Comparison Module
    // ========================================
    const compareSelect = document.getElementById('compare-select');
    const compareDesc = document.querySelector('.compare-desc');
    const comparePrice = document.querySelector('.comparison-card:not(.active) .comparison-price');

    const bikeData = {
        'cruiser': {
            name: 'Cruiser',
            desc: 'Relaxed, upright position',
            price: '$3,299',
            specs: {
                height: '160–190 cm',
                range: '50–100 km',
                frame: 'Step-through',
                handlebar: 'Swept back',
                suspension: 'Spornge fork',
                weight: '18.2 kg',
                saddle: 'Comfort',
                charger: true,
                tires: '50mm puncture-resistant'
            }
        },
        'cruiser-st': {
            name: 'Cruiser ST',
            desc: 'Step-through comfort frame',
            price: '$3,299',
            specs: {
                height: '155–185 cm',
                range: '50–100 km',
                frame: 'Step-through low',
                handlebar: 'Swept back',
                suspension: 'Spornge fork',
                weight: '18.5 kg',
                saddle: 'Comfort plus',
                charger: true,
                tires: '50mm puncture-resistant'
            }
        },
        'cross': {
            name: 'Cross',
            desc: 'Adventure-ready hybrid',
            price: '$3,499',
            specs: {
                height: '170–195 cm',
                range: '45–85 km',
                frame: 'Step-over reinforced',
                handlebar: 'Flat bar wide',
                suspension: 'Spornge+ fork',
                weight: '19.1 kg',
                saddle: 'Sport plus',
                charger: true,
                tires: '50mm all-terrain'
            }
        },
        'cross-st': {
            name: 'Cross ST',
            desc: 'Adventure meets accessibility',
            price: '$3,499',
            specs: {
                height: '160–190 cm',
                range: '45–85 km',
                frame: 'Step-through reinforced',
                handlebar: 'Flat bar',
                suspension: 'Spornge+ fork',
                weight: '19.4 kg',
                saddle: 'Comfort sport',
                charger: true,
                tires: '50mm all-terrain'
            }
        }
    };

    if (compareSelect) {
        compareSelect.addEventListener('change', function() {
            const selectedBike = bikeData[this.value];

            if (selectedBike) {
                // Update description
                if (compareDesc) {
                    compareDesc.textContent = selectedBike.desc;
                }

                // Update price
                if (comparePrice) {
                    comparePrice.textContent = selectedBike.price;
                }

                // Update table
                const tableRows = document.querySelectorAll('.comparison-table tbody tr');
                const specKeys = ['height', 'range', 'frame', 'handlebar', 'suspension', 'weight', 'saddle', 'charger', 'tires'];

                tableRows.forEach((row, index) => {
                    const cells = row.querySelectorAll('td');
                    if (cells.length >= 3 && specKeys[index]) {
                        const value = selectedBike.specs[specKeys[index]];
                        if (typeof value === 'boolean') {
                            cells[2].innerHTML = value ?
                                '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' :
                                '—';
                        } else {
                            cells[2].textContent = value;
                        }
                    }
                });
            }
        });
    }

    // ========================================
    // Test Ride Modal
    // ========================================
    const modal = document.getElementById('test-ride');
    const modalOverlay = modal ? modal.querySelector('.modal-overlay') : null;
    const modalClose = modal ? modal.querySelector('.modal-close') : null;
    const testRideLinks = document.querySelectorAll('a[href="#test-ride"]');

    function openModal() {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    testRideLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Test ride form submission
    const testRideForm = document.querySelector('.test-ride-form');
    if (testRideForm) {
        testRideForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const formData = new FormData(this);

            // Show success state
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Booking confirmed!';
            btn.style.background = 'var(--color-accent)';
            btn.disabled = true;

            // Reset after delay
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
                this.reset();
                closeModal();
            }, 2000);
        });
    }

    // ========================================
    // Accessory Cards - Quick View
    // ========================================
    const accessoryCards = document.querySelectorAll('.accessory-card');

    accessoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const modalType = this.dataset.modal;
            // Here you would typically open a quick-view modal
            // For now, we'll just log the action
            console.log(`Opening quick view for: ${modalType}`);
        });
    });

    // ========================================
    // Mobile Sticky Bar Visibility
    // ========================================
    const mobileBar = document.querySelector('.mobile-sticky-bar');
    const finalCta = document.querySelector('.final-cta');

    function updateMobileBar() {
        if (!mobileBar || !finalCta || window.innerWidth > 768) return;

        const finalCtaRect = finalCta.getBoundingClientRect();

        if (finalCtaRect.top < window.innerHeight) {
            mobileBar.style.transform = 'translateY(100%)';
        } else {
            mobileBar.style.transform = 'translateY(0)';
        }
    }

    window.addEventListener('scroll', updateMobileBar);
    window.addEventListener('resize', updateMobileBar);

    // Add transition to mobile bar
    if (mobileBar) {
        mobileBar.style.transition = 'transform 0.3s ease';
    }

    // ========================================
    // Intersection Observer for Animations
    // ========================================
    const animatedElements = document.querySelectorAll(`
        .split-content,
        .app-feature-card,
        .trust-item,
        .accessory-card,
        .community-content,
        .specs-grid
    `);

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.classList.add('scroll-animate');
        animationObserver.observe(el);
    });

    // Add stagger delays to grid items
    document.querySelectorAll('.app-features-grid .app-feature-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
    });

    document.querySelectorAll('.trust-grid .trust-item').forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.1}s`;
    });

    document.querySelectorAll('.accessories-gallery .accessory-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
    });

    // ========================================
    // Keyboard Navigation
    // ========================================
    // Tab navigation within section nav
    const sectionNavTabs = document.querySelector('.section-nav-tabs');

    if (sectionNavTabs) {
        sectionNavTabs.addEventListener('keydown', function(e) {
            const tabs = Array.from(this.querySelectorAll('.nav-tab'));
            const currentIndex = tabs.findIndex(tab => tab === document.activeElement);

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % tabs.length;
                tabs[nextIndex].focus();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                tabs[prevIndex].focus();
            }
        });
    }

    // Gallery keyboard navigation
    const galleryThumbsContainer = document.querySelector('.gallery-thumbs');

    if (galleryThumbsContainer) {
        galleryThumbsContainer.addEventListener('keydown', function(e) {
            const thumbs = Array.from(this.querySelectorAll('.gallery-thumb'));
            const currentIndex = thumbs.findIndex(thumb => thumb === document.activeElement);

            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % thumbs.length;
                thumbs[nextIndex].focus();
                thumbs[nextIndex].click();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
                thumbs[prevIndex].focus();
                thumbs[prevIndex].click();
            }
        });
    }

    // ========================================
    // Design Detail Modal
    // ========================================
    const designModal = document.getElementById('designModal');
    const openDesignModalBtn = document.getElementById('openDesignModal');
    const designModalBackdrop = designModal ? designModal.querySelector('.design-modal-backdrop') : null;
    const designModalClose = designModal ? designModal.querySelector('.design-modal-close') : null;
    const modalTestRideBtn = document.getElementById('modalTestRideBtn');

    let lastFocusedElement = null;

    function openDesignModal() {
        if (!designModal) return;

        lastFocusedElement = document.activeElement;
        designModal.classList.add('active');
        designModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Focus the close button for accessibility
        setTimeout(() => {
            designModalClose?.focus();
        }, 100);

        // Trap focus within modal
        designModal.addEventListener('keydown', trapFocus);
    }

    function closeDesignModal() {
        if (!designModal) return;

        designModal.classList.remove('active');
        designModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        // Restore focus to trigger element
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }

        designModal.removeEventListener('keydown', trapFocus);
    }

    function trapFocus(e) {
        if (e.key !== 'Tab') return;

        const focusableElements = designModal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    if (openDesignModalBtn) {
        openDesignModalBtn.addEventListener('click', openDesignModal);
    }

    if (designModalBackdrop) {
        designModalBackdrop.addEventListener('click', closeDesignModal);
    }

    if (designModalClose) {
        designModalClose.addEventListener('click', closeDesignModal);
    }

    // Close design modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && designModal && designModal.classList.contains('active')) {
            closeDesignModal();
        }
    });

    // Handle test ride button inside design modal
    if (modalTestRideBtn) {
        modalTestRideBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeDesignModal();
            // Small delay before opening test ride modal
            setTimeout(() => {
                const testRideModal = document.getElementById('test-ride');
                if (testRideModal) {
                    testRideModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }, 300);
        });
    }

    // ========================================
    // Scroll Animations (Editorial & Masonry)
    // ========================================
    const scrollAnimateElements = document.querySelectorAll('[data-animate]');

    const scrollAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseInt(delay));
                scrollAnimationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    scrollAnimateElements.forEach(el => {
        scrollAnimationObserver.observe(el);
    });

    // ========================================
    // Editorial & Masonry Image Hover Effects
    // ========================================
    const editorialImages = document.querySelectorAll('.editorial-image-wrapper');
    const masonryItems = document.querySelectorAll('.masonry-item');

    // Add subtle parallax on hover for editorial images
    editorialImages.forEach(wrapper => {
        wrapper.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const img = this.querySelector('img');
            if (img) {
                img.style.transform = `scale(1.02) translate(${x * 10}px, ${y * 10}px)`;
            }
        });

        wrapper.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // Masonry items hover effect
    masonryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });

        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });

});
