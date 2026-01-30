/**
 * Product Detail Page JavaScript
 * Handles all interactive functionality for the PDP
 */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // GALLERY FUNCTIONALITY
    // ============================================
    const mainImg = document.getElementById('mainImg');
    const thumbs = document.querySelectorAll('.pdp-thumb');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Update active state
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');

            // Update main image
            const newSrc = thumb.dataset.image;
            if (newSrc && mainImg) {
                mainImg.style.opacity = '0';
                setTimeout(() => {
                    mainImg.src = newSrc;
                    mainImg.style.opacity = '1';
                }, 200);
            }
        });
    });

    // ============================================
    // COLOR SWATCHES
    // ============================================
    const colorSwatches = document.querySelectorAll('.pdp-swatch');
    const selectedColorSpan = document.getElementById('selectedColor');

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            colorSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            if (selectedColorSpan) {
                selectedColorSpan.textContent = swatch.dataset.color;
            }
        });
    });

    // ============================================
    // SIZE SELECTION
    // ============================================
    const sizeBtns = document.querySelectorAll('.pdp-size-btn');
    const selectedSizeSpan = document.getElementById('selectedSize');

    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (selectedSizeSpan) {
                selectedSizeSpan.textContent = btn.dataset.size;
            }
        });
    });

    // ============================================
    // ACCORDIONS
    // ============================================
    const accordions = document.querySelectorAll('.pdp-accordion');

    accordions.forEach(accordion => {
        const header = accordion.querySelector('.pdp-accordion-header');

        header.addEventListener('click', () => {
            const isOpen = accordion.classList.contains('open');

            // Close all accordions
            accordions.forEach(a => {
                a.classList.remove('open');
                a.querySelector('.pdp-accordion-header').setAttribute('aria-expanded', 'false');
            });

            // Open clicked one if it was closed
            if (!isOpen) {
                accordion.classList.add('open');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ============================================
    // ADD TO CART
    // ============================================
    const addToCartBtn = document.getElementById('addToCartBtn');
    const mobileAddToCart = document.getElementById('mobileAddToCart');
    const toast = document.getElementById('toast');
    const cartBtn = document.getElementById('cartBtn');
    const cartCount = document.querySelector('.cart-count');
    const miniCart = document.getElementById('miniCart');
    const miniCartOverlay = document.getElementById('miniCartOverlay');
    const miniCartClose = document.getElementById('miniCartClose');
    const miniCartCount = document.querySelector('.mini-cart-count');

    let cartItems = 0;

    function addToCart() {
        // Show loading state
        addToCartBtn.classList.add('loading');

        setTimeout(() => {
            addToCartBtn.classList.remove('loading');

            // Update cart count
            cartItems++;
            if (cartCount) cartCount.textContent = cartItems;
            if (miniCartCount) miniCartCount.textContent = `(${cartItems})`;

            // Show toast notification
            showToast();

            // Show mini cart
            setTimeout(() => {
                openMiniCart();
            }, 1500);
        }, 800);
    }

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addToCart);
    }

    if (mobileAddToCart) {
        mobileAddToCart.addEventListener('click', addToCart);
    }

    function showToast() {
        const selectedColor = document.getElementById('selectedColor')?.textContent || 'Midnight Black';
        const toastMessage = toast.querySelector('.toast-message');
        if (toastMessage) {
            toastMessage.textContent = `CGO600 Pro - ${selectedColor}`;
        }
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }

    // Mini Cart
    function openMiniCart() {
        miniCart?.classList.add('active');
        miniCartOverlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMiniCart() {
        miniCart?.classList.remove('active');
        miniCartOverlay?.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (cartBtn) {
        cartBtn.addEventListener('click', openMiniCart);
    }

    if (miniCartClose) {
        miniCartClose.addEventListener('click', closeMiniCart);
    }

    if (miniCartOverlay) {
        miniCartOverlay.addEventListener('click', closeMiniCart);
    }

    // ============================================
    // WISHLIST
    // ============================================
    const wishlistBtn = document.querySelector('.pdp-wishlist-btn');

    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', () => {
            wishlistBtn.classList.toggle('active');
        });
    }

    // ============================================
    // TABS
    // ============================================
    const tabs = document.querySelectorAll('.pdp-tab');
    const tabContents = document.querySelectorAll('.pdp-tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            // Update tab active state
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update content active state
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.dataset.content === target) {
                    content.classList.add('active');
                }
            });
        });
    });

    // ============================================
    // VIDEO CAROUSEL (DRAG TO SCROLL)
    // ============================================
    const videoTrack = document.getElementById('videoTrack');

    if (videoTrack) {
        let isDown = false;
        let startX;
        let scrollLeft;

        videoTrack.addEventListener('mousedown', (e) => {
            isDown = true;
            videoTrack.style.cursor = 'grabbing';
            startX = e.pageX - videoTrack.offsetLeft;
            scrollLeft = videoTrack.scrollLeft;
        });

        videoTrack.addEventListener('mouseleave', () => {
            isDown = false;
            videoTrack.style.cursor = 'grab';
        });

        videoTrack.addEventListener('mouseup', () => {
            isDown = false;
            videoTrack.style.cursor = 'grab';
        });

        videoTrack.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - videoTrack.offsetLeft;
            const walk = (x - startX) * 2;
            videoTrack.scrollLeft = scrollLeft - walk;
        });

        // Touch support
        videoTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - videoTrack.offsetLeft;
            scrollLeft = videoTrack.scrollLeft;
        });

        videoTrack.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX - videoTrack.offsetLeft;
            const walk = (x - startX) * 2;
            videoTrack.scrollLeft = scrollLeft - walk;
        });
    }

    // Video carousel navigation
    const videoPrev = document.getElementById('videoPrev');
    const videoNext = document.getElementById('videoNext');

    if (videoPrev && videoNext && videoTrack) {
        const scrollAmount = 320;

        videoPrev.addEventListener('click', () => {
            videoTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        videoNext.addEventListener('click', () => {
            videoTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    // ============================================
    // RECOMMENDED CAROUSEL (DRAG TO SCROLL)
    // ============================================
    const recTrack = document.getElementById('recommendedTrack');

    if (recTrack) {
        let isDown = false;
        let startX;
        let scrollLeft;

        recTrack.addEventListener('mousedown', (e) => {
            isDown = true;
            recTrack.style.cursor = 'grabbing';
            startX = e.pageX - recTrack.offsetLeft;
            scrollLeft = recTrack.scrollLeft;
        });

        recTrack.addEventListener('mouseleave', () => {
            isDown = false;
            recTrack.style.cursor = 'grab';
        });

        recTrack.addEventListener('mouseup', () => {
            isDown = false;
            recTrack.style.cursor = 'grab';
        });

        recTrack.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - recTrack.offsetLeft;
            const walk = (x - startX) * 2;
            recTrack.scrollLeft = scrollLeft - walk;
        });

        // Touch support
        recTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - recTrack.offsetLeft;
            scrollLeft = recTrack.scrollLeft;
        });

        recTrack.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX - recTrack.offsetLeft;
            const walk = (x - startX) * 2;
            recTrack.scrollLeft = scrollLeft - walk;
        });
    }

    // Recommended carousel navigation
    const recPrev = document.getElementById('recPrev');
    const recNext = document.getElementById('recNext');

    if (recPrev && recNext && recTrack) {
        const scrollAmount = 300;

        recPrev.addEventListener('click', () => {
            recTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        recNext.addEventListener('click', () => {
            recTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    // ============================================
    // FIT TOOL
    // ============================================
    const heightSlider = document.getElementById('heightSlider');
    const heightFeet = document.getElementById('heightFeet');
    const heightInches = document.getElementById('heightInches');
    const heightCm = document.getElementById('heightCm');
    const fitSizeLabel = document.getElementById('fitSizeLabel');
    const fitResult = document.getElementById('fitResult');
    const unitBtns = document.querySelectorAll('.pdp-unit-btn');
    const imperialInputs = document.querySelector('.pdp-fit-inputs.imperial');
    const metricInputs = document.querySelector('.pdp-fit-inputs.metric');

    function cmToFeetInches(cm) {
        const totalInches = cm / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        return { feet, inches };
    }

    function feetInchesToCm(feet, inches) {
        return Math.round((feet * 12 + parseInt(inches)) * 2.54);
    }

    function getRecommendedSize(cm) {
        if (cm < 163) return { size: 'S', name: 'Small Frame', range: '5\'2" - 5\'6"' };
        if (cm < 178) return { size: 'M', name: 'Medium Frame', range: '5\'6" - 5\'10"' };
        return { size: 'L', name: 'Large Frame', range: '5\'10" - 6\'2"' };
    }

    function updateFitResult(cm) {
        const recommendation = getRecommendedSize(cm);

        if (fitSizeLabel) {
            fitSizeLabel.textContent = recommendation.size;
        }

        if (fitResult) {
            const sizeEl = fitResult.querySelector('.pdp-fit-size');
            const nameEl = fitResult.querySelector('.pdp-fit-name');
            const rangeEl = fitResult.querySelector('.pdp-fit-range');
            const btnEl = fitResult.querySelector('.pdp-fit-select');

            if (sizeEl) sizeEl.textContent = recommendation.size;
            if (nameEl) nameEl.textContent = recommendation.name;
            if (rangeEl) rangeEl.textContent = `Recommended for ${recommendation.range}`;
            if (btnEl) btnEl.textContent = `Select Size ${recommendation.size}`;
        }

        // Update size buttons
        sizeBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.size === recommendation.size) {
                btn.classList.add('active');
            }
        });

        if (selectedSizeSpan) {
            selectedSizeSpan.textContent = recommendation.size;
        }
    }

    // Unit toggle
    unitBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            unitBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (btn.dataset.unit === 'imperial') {
                imperialInputs.style.display = 'flex';
                metricInputs.style.display = 'none';
            } else {
                imperialInputs.style.display = 'none';
                metricInputs.style.display = 'flex';
            }
        });
    });

    // Slider input
    if (heightSlider) {
        heightSlider.addEventListener('input', (e) => {
            const cm = parseInt(e.target.value);
            const { feet, inches } = cmToFeetInches(cm);

            if (heightFeet) heightFeet.value = feet;
            if (heightInches) heightInches.value = inches;
            if (heightCm) heightCm.value = cm;

            updateFitResult(cm);
        });
    }

    // Feet/Inches input
    if (heightFeet && heightInches) {
        [heightFeet, heightInches].forEach(input => {
            input.addEventListener('input', () => {
                const feet = parseInt(heightFeet.value) || 5;
                const inches = parseInt(heightInches.value) || 0;
                const cm = feetInchesToCm(feet, inches);

                if (heightSlider) heightSlider.value = cm;
                if (heightCm) heightCm.value = cm;

                updateFitResult(cm);
            });
        });
    }

    // CM input
    if (heightCm) {
        heightCm.addEventListener('input', (e) => {
            const cm = parseInt(e.target.value) || 170;
            const { feet, inches } = cmToFeetInches(cm);

            if (heightSlider) heightSlider.value = cm;
            if (heightFeet) heightFeet.value = feet;
            if (heightInches) heightInches.value = inches;

            updateFitResult(cm);
        });
    }

    // Fit select button
    const fitSelectBtn = document.querySelector('.pdp-fit-select');
    if (fitSelectBtn) {
        fitSelectBtn.addEventListener('click', () => {
            // Scroll to buy box
            document.querySelector('.pdp-buybox')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // ============================================
    // LIGHTBOX
    // ============================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.pdp-lightbox-close');
    const lightboxPrev = document.querySelector('.pdp-lightbox-prev');
    const lightboxNext = document.querySelector('.pdp-lightbox-next');
    const lifestyleItems = document.querySelectorAll('.pdp-lifestyle-item');

    let currentLightboxIndex = 0;
    const lightboxImages = Array.from(lifestyleItems).map(item => item.dataset.full);

    function openLightbox(index) {
        currentLightboxIndex = index;
        lightboxImg.src = lightboxImages[index];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function nextLightboxImage() {
        currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
        lightboxImg.src = lightboxImages[currentLightboxIndex];
    }

    function prevLightboxImage() {
        currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
        lightboxImg.src = lightboxImages[currentLightboxIndex];
    }

    lifestyleItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', prevLightboxImage);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextLightboxImage);
    }

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevLightboxImage();
        if (e.key === 'ArrowRight') nextLightboxImage();
    });

    // ============================================
    // VIDEO MODAL
    // ============================================
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const videoModalClose = document.querySelector('.pdp-video-modal-close');
    const videoPlayBtns = document.querySelectorAll('.pdp-video-play, .pdp-howto-play, .pdp-video-play-btn');

    function openVideoModal() {
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        modalVideo?.play();
    }

    function closeVideoModal() {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
        modalVideo?.pause();
    }

    videoPlayBtns.forEach(btn => {
        btn.addEventListener('click', openVideoModal);
    });

    if (videoModalClose) {
        videoModalClose.addEventListener('click', closeVideoModal);
    }

    videoModal?.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });

    // ============================================
    // BRAND VIDEO AUTOPLAY ON SCROLL
    // ============================================
    const brandVideo = document.getElementById('brandVideo');

    if (brandVideo) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    brandVideo.play();
                } else {
                    brandVideo.pause();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(brandVideo);
    }

    // ============================================
    // REVIEWS FILTER
    // ============================================
    const filterBtns = document.querySelectorAll('.pdp-filter-btn');
    const reviewCards = document.querySelectorAll('.pdp-review-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            reviewCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (filter === 'photos') {
                    const hasPhotos = card.querySelector('.pdp-review-photos');
                    card.style.display = hasPhotos ? 'block' : 'none';
                } else {
                    const rating = card.dataset.rating;
                    card.style.display = rating === filter ? 'block' : 'none';
                }
            });
        });
    });

    // ============================================
    // MOBILE STICKY BAR
    // ============================================
    const mobileStickyBar = document.getElementById('mobileStickyBar');
    const buyBox = document.getElementById('buyBox');

    if (mobileStickyBar && buyBox) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    mobileStickyBar.style.transform = 'translateY(100%)';
                } else {
                    mobileStickyBar.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0, rootMargin: '-100px 0px 0px 0px' });

        observer.observe(buyBox);
    }

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    const revealElements = document.querySelectorAll('[data-reveal]');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ============================================
    // ACCESSORIES PRICE UPDATE
    // ============================================
    const accessoryCheckboxes = document.querySelectorAll('.pdp-acc-item input');
    const priceDisplay = document.querySelector('.pdp-price-current');
    const atcPriceDisplay = document.querySelector('.atc-price');
    const basePrice = 1699;

    function updateTotalPrice() {
        let total = basePrice;

        accessoryCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                total += parseInt(checkbox.dataset.price);
            }
        });

        const formattedPrice = `$${total.toLocaleString()}`;
        if (priceDisplay) priceDisplay.textContent = formattedPrice;
        if (atcPriceDisplay) atcPriceDisplay.textContent = formattedPrice;
    }

    accessoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateTotalPrice);
    });

    // ============================================
    // HELPFUL BUTTON
    // ============================================
    const helpfulBtns = document.querySelectorAll('.pdp-helpful-btn');

    helpfulBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.textContent.trim();
            const match = text.match(/\((\d+)\)/);
            if (match) {
                const count = parseInt(match[1]) + 1;
                btn.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                    </svg>
                    Helpful (${count})
                `;
                btn.style.color = 'var(--color-accent)';
                btn.disabled = true;
            }
        });
    });

    // ============================================
    // PHOTO GALLERY TAB LIGHTBOX
    // ============================================
    const photoItems = document.querySelectorAll('.pdp-photo-item');

    photoItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src.replace('300&h=300', '1200&h=800');
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // ============================================
    // REVIEW PHOTOS LIGHTBOX
    // ============================================
    const reviewPhotos = document.querySelectorAll('.pdp-review-photos img');

    reviewPhotos.forEach(photo => {
        photo.addEventListener('click', () => {
            const imgSrc = photo.src.replace('100&h=100', '800&h=600');
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox on background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // ============================================
    // IMMERSIVE SCROLL SECTION
    // ============================================
    const immersiveSection = document.getElementById('immersiveSection');

    if (immersiveSection) {
        const immersiveObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    immersiveSection.classList.add('in-view');
                    // Animate stats numbers
                    animateImmersiveStats();
                } else {
                    // Optional: remove class when out of view for re-animation
                    // immersiveSection.classList.remove('in-view');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-50px 0px'
        });

        immersiveObserver.observe(immersiveSection);

        // Animate stats numbers
        function animateImmersiveStats() {
            const statNumbers = immersiveSection.querySelectorAll('.stat-number[data-count]');

            statNumbers.forEach(stat => {
                if (stat.dataset.animated) return;
                stat.dataset.animated = 'true';

                const target = parseInt(stat.dataset.count);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const counter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        stat.textContent = target.toLocaleString();
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(current).toLocaleString();
                    }
                }, 16);
            });
        }
    }

    // ============================================
    // PARALLAX EFFECT FOR IMMERSIVE SECTION
    // ============================================
    const immersiveBg = document.querySelector('.pdp-immersive-bg-img');

    if (immersiveBg && immersiveSection) {
        window.addEventListener('scroll', () => {
            const rect = immersiveSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight && rect.bottom > 0) {
                const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
                const parallaxOffset = scrollProgress * 50;
                immersiveBg.style.transform = `scale(1.1) translateY(${parallaxOffset}px)`;
            }
        }, { passive: true });
    }
});
