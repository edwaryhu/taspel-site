/* ========================================
   CG0800S Product Page Interactions
   ======================================== */

// ==========================================
// Global State
// ==========================================
let currentLightboxIndex = 0;
let currentLifestyleLightboxIndex = 0;
let isMetric = false;
let basePrice = 1899;
let accessoriesTotal = 0;

const productImages = [
  'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&h=600&fit=crop'
];

const lifestyleImages = [
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&h=1200&fit=crop',
  'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1200&h=1200&fit=crop',
  'https://images.unsplash.com/photo-1505705694340-019e1e335916?w=1200&h=1200&fit=crop',
  'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&h=1200&fit=crop'
];

// ==========================================
// DOM Ready
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initThumbnails();
  initColorSwatches();
  initSizePills();
  initTabs();
  initCarouselDrag();
  initVideoAutoplay();
  initScrollAnimations();
});

// ==========================================
// Gallery & Thumbnails
// ==========================================
function initThumbnails() {
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.getElementById('mainImage');

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      // Fade transition
      mainImage.style.opacity = '0';
      setTimeout(() => {
        mainImage.src = thumb.dataset.src;
        mainImage.style.opacity = '1';
      }, 150);
    });
  });
}

// ==========================================
// Lightbox
// ==========================================
function openLightbox(index) {
  currentLightboxIndex = index;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCurrent = document.getElementById('lightboxCurrent');
  const lightboxTotal = document.getElementById('lightboxTotal');

  lightboxImg.src = productImages[index];
  lightboxCurrent.textContent = index + 1;
  lightboxTotal.textContent = productImages.length;

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxNav(direction) {
  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) currentLightboxIndex = productImages.length - 1;
  if (currentLightboxIndex >= productImages.length) currentLightboxIndex = 0;

  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCurrent = document.getElementById('lightboxCurrent');

  lightboxImg.style.opacity = '0';
  setTimeout(() => {
    lightboxImg.src = productImages[currentLightboxIndex];
    lightboxCurrent.textContent = currentLightboxIndex + 1;
    lightboxImg.style.opacity = '1';
  }, 150);
}

// Lifestyle Lightbox
function openLifestyleLightbox(index) {
  currentLifestyleLightboxIndex = index;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCurrent = document.getElementById('lightboxCurrent');
  const lightboxTotal = document.getElementById('lightboxTotal');

  lightboxImg.src = lifestyleImages[index];
  lightboxCurrent.textContent = index + 1;
  lightboxTotal.textContent = lifestyleImages.length;

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Override nav for lifestyle images
  window.currentLightboxMode = 'lifestyle';
}

// Update lightboxNav to handle both modes
const originalLightboxNav = lightboxNav;
window.lightboxNav = function(direction) {
  if (window.currentLightboxMode === 'lifestyle') {
    currentLifestyleLightboxIndex += direction;
    if (currentLifestyleLightboxIndex < 0) currentLifestyleLightboxIndex = lifestyleImages.length - 1;
    if (currentLifestyleLightboxIndex >= lifestyleImages.length) currentLifestyleLightboxIndex = 0;

    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCurrent = document.getElementById('lightboxCurrent');

    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = lifestyleImages[currentLifestyleLightboxIndex];
      lightboxCurrent.textContent = currentLifestyleLightboxIndex + 1;
      lightboxImg.style.opacity = '1';
    }, 150);
  } else {
    originalLightboxNav(direction);
  }
};

// Close lightbox on escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeVideoModal();
    closeMiniCart();
  }
});

// Close lightbox on backdrop click
document.getElementById('lightbox')?.addEventListener('click', (e) => {
  if (e.target.id === 'lightbox') {
    closeLightbox();
    window.currentLightboxMode = null;
  }
});

// ==========================================
// Video Modal
// ==========================================
function openVideoModal() {
  const modal = document.getElementById('videoModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('videoModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'videoModal') {
    closeVideoModal();
  }
});

// ==========================================
// Color Swatches
// ==========================================
function initColorSwatches() {
  const swatches = document.querySelectorAll('.color-swatch');
  const selectedColor = document.getElementById('selectedColor');

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      selectedColor.textContent = swatch.dataset.color;
    });
  });
}

// ==========================================
// Size Pills
// ==========================================
function initSizePills() {
  const pills = document.querySelectorAll('.size-pill');
  const selectedSize = document.getElementById('selectedSize');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedSize.textContent = pill.dataset.size;
    });
  });
}

// ==========================================
// Accessories Accordion
// ==========================================
function toggleAccessories() {
  const module = document.querySelector('.accessories-module');
  module.classList.toggle('open');
}

function updateTotal() {
  const checkboxes = document.querySelectorAll('.accessory-check');
  accessoriesTotal = 0;

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      accessoriesTotal += parseInt(checkbox.dataset.price);
    }
  });

  const total = basePrice + accessoriesTotal;
  document.getElementById('totalPrice').textContent = `$${total.toLocaleString()}`;
  document.getElementById('cartSubtotal').textContent = `$${total.toLocaleString()}`;
}

// ==========================================
// Add to Cart
// ==========================================
function addToCart() {
  const btn = document.getElementById('addToCartBtn');
  btn.classList.add('loading');
  btn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    btn.classList.remove('loading');
    btn.disabled = false;

    // Show toast
    showToast();

    // Open mini cart
    setTimeout(() => {
      openMiniCart();
    }, 500);
  }, 1500);
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ==========================================
// Mini Cart
// ==========================================
function openMiniCart() {
  const cart = document.getElementById('miniCart');
  const overlay = document.getElementById('miniCartOverlay');
  cart.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMiniCart() {
  const cart = document.getElementById('miniCart');
  const overlay = document.getElementById('miniCartOverlay');
  cart.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('miniCartOverlay')?.addEventListener('click', closeMiniCart);

// ==========================================
// Tabs
// ==========================================
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;

      // Update buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panels with animation
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `tab-${tabId}`) {
          setTimeout(() => panel.classList.add('active'), 50);
        }
      });
    });
  });
}

// ==========================================
// FAQ Accordion
// ==========================================
function toggleFaq(button) {
  const item = button.closest('.faq-item');
  const wasOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

  // Toggle current
  if (!wasOpen) {
    item.classList.add('open');
  }
}

// ==========================================
// Fit Tool
// ==========================================
function switchUnit(unit) {
  const unitBtns = document.querySelectorAll('.unit-btn');
  unitBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.unit === unit);
  });

  isMetric = unit === 'metric';
  updateHeight(document.getElementById('heightSlider').value);

  // Update slider labels
  const labels = document.querySelector('.slider-labels');
  if (isMetric) {
    labels.innerHTML = '<span>150 cm</span><span>200 cm</span>';
  } else {
    labels.innerHTML = '<span>4\'11"</span><span>6\'7"</span>';
  }
}

function updateHeight(value) {
  const heightValue = document.getElementById('heightValue');
  const recommendedSize = document.getElementById('recommendedSize');
  const sizeSegments = document.querySelectorAll('.size-segment');

  let displayValue;
  let size;

  if (isMetric) {
    displayValue = `${value} cm`;

    if (value < 160) size = 'XS';
    else if (value < 170) size = 'S';
    else if (value < 180) size = 'M';
    else size = 'L';
  } else {
    // Convert cm to feet/inches
    const totalInches = value / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    displayValue = `${feet}'${inches}"`;

    if (value < 160) size = 'XS';
    else if (value < 170) size = 'S';
    else if (value < 180) size = 'M';
    else size = 'L';
  }

  // Animate value change
  heightValue.style.transition = 'transform 0.1s ease';
  heightValue.textContent = displayValue;

  // Update size recommendation
  const sizeNames = { 'XS': 'Extra Small', 'S': 'Small', 'M': 'Medium', 'L': 'Large' };
  recommendedSize.textContent = sizeNames[size];

  // Update size bar
  sizeSegments.forEach(segment => {
    segment.classList.toggle('active', segment.dataset.size === size);
  });

  // Update buy box size pill
  const sizePills = document.querySelectorAll('.size-pill');
  const selectedSize = document.getElementById('selectedSize');
  sizePills.forEach(pill => {
    if (pill.textContent === size) {
      sizePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedSize.textContent = pill.dataset.size;
    }
  });
}

// ==========================================
// Video Carousels
// ==========================================
let videoCarouselPosition = 0;
let productCarouselPosition = 0;

function slideVideoCarousel(direction) {
  const carousel = document.getElementById('videoCarousel');
  const cardWidth = 280 + 24; // card width + gap
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;

  videoCarouselPosition += direction * cardWidth;
  videoCarouselPosition = Math.max(0, Math.min(videoCarouselPosition, maxScroll));

  carousel.scrollTo({ left: videoCarouselPosition, behavior: 'smooth' });

  updateVideoDots();
}

function updateVideoDots() {
  const dots = document.querySelectorAll('#videoDots .dot');
  const carousel = document.getElementById('videoCarousel');
  const cardWidth = 280 + 24;
  const currentPage = Math.round(carousel.scrollLeft / (cardWidth * 2));

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentPage);
  });
}

function slideProductCarousel(direction) {
  const carousel = document.getElementById('productCarousel');
  const cardWidth = 220 + 24; // card width + gap
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;

  productCarouselPosition += direction * cardWidth * 2;
  productCarouselPosition = Math.max(0, Math.min(productCarouselPosition, maxScroll));

  carousel.scrollTo({ left: productCarouselPosition, behavior: 'smooth' });
}

// ==========================================
// Carousel Drag Support
// ==========================================
function initCarouselDrag() {
  const carousels = document.querySelectorAll('.video-carousel, .product-carousel');

  carousels.forEach(carousel => {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.style.cursor = 'grabbing';
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    });
  });
}

// ==========================================
// Brand Video
// ==========================================
let brandVideoPlaying = false;
let brandVideoMuted = true;

function initVideoAutoplay() {
  const videoStrip = document.getElementById('brandVideo');
  const video = document.getElementById('brandVideoPlayer');
  const playPauseBtn = document.getElementById('playPauseBtn');

  if (!videoStrip || !video) return;

  // IntersectionObserver for autoplay
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // For demo purposes, we'll just show the poster
        // In production, uncomment the video play logic
        // video.play();
        // brandVideoPlaying = true;
        // playPauseBtn?.classList.add('playing');
      } else {
        // video.pause();
        // brandVideoPlaying = false;
        // playPauseBtn?.classList.remove('playing');
      }
    });
  }, { threshold: 0.5 });

  observer.observe(videoStrip);
}

function toggleBrandVideo() {
  const video = document.getElementById('brandVideoPlayer');
  const playPauseBtn = document.getElementById('playPauseBtn');

  if (brandVideoPlaying) {
    video.pause();
    playPauseBtn.classList.remove('playing');
  } else {
    video.play();
    playPauseBtn.classList.add('playing');
  }
  brandVideoPlaying = !brandVideoPlaying;
}

function toggleMute() {
  const video = document.getElementById('brandVideoPlayer');
  const muteBtn = document.getElementById('muteBtn');

  video.muted = !video.muted;
  brandVideoMuted = video.muted;
  muteBtn.classList.toggle('unmuted', !brandVideoMuted);
}

// ==========================================
// Reviews Sorting & Pagination
// ==========================================
function sortReviews() {
  const grid = document.getElementById('reviewsGrid');
  grid.classList.add('loading');

  // Simulate API call
  setTimeout(() => {
    grid.classList.remove('loading');
    // In production, this would re-render reviews based on sort
  }, 500);
}

function loadReviewPage(page) {
  const grid = document.getElementById('reviewsGrid');
  const pageBtns = document.querySelectorAll('.page-btn');

  // Update active page
  pageBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent == page) {
      btn.classList.add('active');
    }
  });

  // Show skeleton loading
  grid.classList.add('loading');

  // Simulate API call
  setTimeout(() => {
    grid.classList.remove('loading');
    // In production, this would fetch and render new reviews
    window.scrollTo({
      top: document.getElementById('reviews').offsetTop - 100,
      behavior: 'smooth'
    });
  }, 500);
}

// ==========================================
// Scroll Animations
// ==========================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.section-title, .feature-card, .review-card, .howto-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ==========================================
// Keyboard Navigation
// ==========================================
document.addEventListener('keydown', (e) => {
  // Lightbox navigation
  const lightbox = document.getElementById('lightbox');
  if (lightbox.classList.contains('open')) {
    if (e.key === 'ArrowLeft') lightboxNav(-1);
    if (e.key === 'ArrowRight') lightboxNav(1);
  }
});

// ==========================================
// Initialize on scroll for lazy elements
// ==========================================
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Update video carousel dots on scroll
      const videoCarousel = document.getElementById('videoCarousel');
      if (videoCarousel) {
        videoCarouselPosition = videoCarousel.scrollLeft;
        updateVideoDots();
      }
      ticking = false;
    });
    ticking = true;
  }
});
