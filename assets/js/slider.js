/**
 * Prime University Admission Portal - Slider JavaScript
 * This script handles the functionality for the banner slider on the home page
 *
 * Author: [Your Name]
 * Version: 1.0
 * Created: April 2025
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the Bootstrap carousel with options
  const bannerSlider = document.getElementById('banner-slider');

  if (bannerSlider) {
      // Create the carousel object with custom options
      const carousel = new bootstrap.Carousel(bannerSlider, {
          interval: 5000,    // Time between automatic cycling (in milliseconds)
          keyboard: true,    // React to keyboard events
          pause: 'hover',    // Pauses the cycling when the mouse enters the carousel
          ride: 'carousel',  // Autoplays the carousel after the user manually cycles the first item
          wrap: true         // Whether the carousel should cycle continuously or have hard stops
      });

      // Optional: Add additional custom behavior

      // Pause carousel on mobile touch (improves mobile UX)
      bannerSlider.addEventListener('touchstart', function() {
          carousel.pause();
      });

      // Resume carousel when touch ends
      bannerSlider.addEventListener('touchend', function() {
          carousel.cycle();
      });

      // Add smooth animation class when slide changes
      bannerSlider.addEventListener('slide.bs.carousel', function(event) {
          const nextSlide = event.relatedTarget;
          const caption = nextSlide.querySelector('.carousel-caption');

          // Reset animation
          if (caption) {
              caption.style.opacity = '0';
              caption.style.transform = 'translateY(20px)';

              // Trigger animation after a short delay
              setTimeout(function() {
                  caption.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                  caption.style.opacity = '1';
                  caption.style.transform = 'translateY(0)';
              }, 300);
          }
      });

      // Log carousel initialization for debugging
      console.log('Banner slider initialized successfully');
  } else {
      console.warn('Banner slider element not found in the DOM');
  }
});