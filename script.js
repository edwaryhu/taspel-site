// Hero Slider
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const thumbnails = document.querySelectorAll('.thumbnail');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function startAutoplay() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
        clearInterval(slideInterval);
    }

    // Thumbnail click handlers
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            stopAutoplay();
            showSlide(index);
            startAutoplay();
        });
    });

    // Start autoplay
    startAutoplay();

    // Pause on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', stopAutoplay);
    heroSlider.addEventListener('mouseleave', startAutoplay);

    // Announcement bar close
    const closeBtn = document.querySelector('.announcement-bar .close-btn');
    const announcementBar = document.querySelector('.announcement-bar');

    if (closeBtn && announcementBar) {
        closeBtn.addEventListener('click', () => {
            announcementBar.style.display = 'none';
        });
    }

    // Reviews slider
    const reviews = [
        {
            quote: '"A smooth and responsive feel that can make you feel like a superhero–or at least a pro athlete!"',
            cite: '— Professional E-bike Review Website —'
        },
        {
            quote: '"Good-looking e-bike that performs well."',
            cite: '— Top Green Transport News Website —'
        },
        {
            quote: '"Extremely pleasant cycling experience."',
            cite: '— Multinational Business News Website —'
        },
        {
            quote: '"Packed with features usually attributed to more expensive e-bikes."',
            cite: '— Buying Guide for the Best Product —'
        },
        {
            quote: '"An impressive pedaling experience."',
            cite: '— The Heart of Tech —'
        }
    ];

    let currentReview = 0;
    const reviewContent = document.querySelector('.review-content');
    const prevReviewBtn = document.querySelector('.press-reviews .slider-btn.prev');
    const nextReviewBtn = document.querySelector('.press-reviews .slider-btn.next');

    function updateReview() {
        if (reviewContent) {
            reviewContent.innerHTML = `
                <blockquote>${reviews[currentReview].quote}</blockquote>
                <cite>${reviews[currentReview].cite}</cite>
            `;
        }
    }

    if (prevReviewBtn) {
        prevReviewBtn.addEventListener('click', () => {
            currentReview = (currentReview - 1 + reviews.length) % reviews.length;
            updateReview();
        });
    }

    if (nextReviewBtn) {
        nextReviewBtn.addEventListener('click', () => {
            currentReview = (currentReview + 1) % reviews.length;
            updateReview();
        });
    }

    // Smooth scroll for category navigation
    const categoryLinks = document.querySelectorAll('.category-nav a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.bike-card, .feature-card, .discover-card').forEach(el => {
        observer.observe(el);
    });

    // Chat widget
    const chatWidget = document.querySelector('.chat-widget');
    if (chatWidget) {
        chatWidget.addEventListener('click', () => {
            alert('Chat support would open here!');
        });
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .bike-card, .feature-card, .discover-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .bike-card.animate-in, .feature-card.animate-in, .discover-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
