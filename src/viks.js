/*!
 * MIT LISENSI
 * Copyright (c) 27 Nov 2024 VIKRI AHPAD TANTOWI
 * Lisensi   : https://github.com/Vixsry/viks-animation/blob/main/LICENSE
 * Website   : https://viksanimation.my.id/
 * Github    : https://github.com/Vixsry/viks-animation
 * Author    : VIKRI AHPAD TANTOWI
 * Instagram : https://www.instagram.com/viksry12
 * Facebook  : https://www.facebook.com/share/1E17jqYu34/
 */

const VIKS = {
  init(customConfig = {}) {
    this.elements = document.querySelectorAll('[data-viks]');
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;

    // Mapping easing names to CSS cubic-bezier values
    this.easingMap = {
      'linear': 'cubic-bezier(0.250, 0.250, 0.750, 0.750)',
      'ease': 'cubic-bezier(0.250, 0.100, 0.250, 1.000)',
      'ease-in': 'cubic-bezier(0.420, 0.000, 1.000, 1.000)',
      'ease-out': 'cubic-bezier(0.000, 0.000, 0.580, 1.000)',
      'ease-in-out': 'cubic-bezier(0.420, 0.000, 0.580, 1.000)',
      'ease-in-sine': 'cubic-bezier(0.47, 0, 0.745, 0.715)',
      'ease-out-sine': 'cubic-bezier(0.39, 0.575, 0.565, 1)',
      'ease-in-out-sine': 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
      'ease-in-quad': 'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
      'ease-out-quad': 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      'ease-in-out-quad': 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
      'ease-in-cubic': 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
      'ease-out-cubic': 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
      'ease-in-out-cubic': 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
      'ease-in-quart': 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
      'ease-out-quart': 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
      'ease-in-out-quart': 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
      'ease-in-quint': 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
      'ease-out-quint': 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
      'ease-in-out-quint': 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',
      'ease-in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
      'ease-out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      'ease-in-out-expo': 'cubic-bezier(1, 0, 0, 1)',
      'ease-in-circ': 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
      'ease-out-circ': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
      'ease-in-out-circ': 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
      'ease-in-back': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
      'ease-out-back': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      'ease-in-out-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      'ease-elastic': 'cubic-bezier(0.5, 0.75, 0.150, 1.650)',
      'ease-bounce': 'cubic-bezier(0.3, 2.1, 0.6, 0.8)',
    };

    this.config = {
      thresholdTop: 0.1,
      thresholdBottom: 0.1,
      disable: false,
      startEvent: 'DOMContentLoaded',
      animatedClassName: 'viks-animate',
      initClassName: 'viks-init',
      useClassNames: false,
      disableMutationObserver: false,
      throttleDelay: 99,
      debounceDelay: 50,
      offset: 120,
      delay: 0,
      duration: 400,
      easing: 'ease',
      once: false,
      mirror: false,
      anchorPlacement: 'top-bottom',
      animateTop: true,
      animateBottom: true,
      ...customConfig
    };

    this.applyGlobalStyles();
    this.initializedElements = new Set();
    this.setupEventListeners();
    this.initObserver();
    this.initMutationObserver();
    this.initResizeObserver();
  },

applyGlobalStyles() {
    // Create style element for global settings
    const styleEl = document.createElement('style');
    const easingValue = this.easingMap[this.config.easing] || this.config.easing;

    styleEl.textContent = `
      [data-viks] {
        transition-duration: ${this.config.duration}ms;
        transition-timing-function: ${easingValue};
      }
      
      /* Override for elements with specific easing */
      ${Object.entries(this.easingMap).map(([name, value]) => `
        [data-viks*="${name}"] {
          transition-timing-function: ${value};
        }
      `).join('\n')}
    `;

    document.head.appendChild(styleEl);
  },

  setupEventListeners() {
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;
        this.elements.forEach(element => {
          this.updateElementPosition(element);
        });
      }, this.config.debounceDelay);
    });

    // Scroll performance optimization
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      lastScroll = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.elements.forEach(element => {
            this.updateElementOnScroll(element, lastScroll);
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.elements.forEach(element => {
          this.updateElementPosition(element);
        });
      }
    });
  },

  initObserver() {
    const options = {
      root: null,
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: `${this.config.offset}px`
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        
        // Check element-specific animation controls
        const animateTop = element.getAttribute('data-viks-animation-top') !== 'off' && this.config.animateTop;
        const animateBottom = element.getAttribute('data-viks-animation-bottom') !== 'off' && this.config.animateBottom;
        const once = element.getAttribute('data-viks-once') || this.config.once;

        if (entry.isIntersecting) {
          if (!this.initializedElements.has(element) || !once) {
            this.applyAnimation(element);
            if (once) this.initializedElements.add(element);
          }
        } else {
          const boundingRect = element.getBoundingClientRect();
          const scrollingUp = boundingRect.top > this.windowHeight;

          // Apply animation based on scroll direction and configuration
          if ((scrollingUp && animateTop) || (!scrollingUp && animateBottom)) {
            if (!once || !this.initializedElements.has(element)) {
              this.removeAnimation(element);
            }
          }
        }
      });
    }, options);

    this.elements.forEach(element => {
      this.observer.observe(element);
      element.classList.add(this.config.initClassName);
    });
  },
  
  // Method to update animation settings
  updateAnimationSettings(settings = {}) {
    this.config = {
      ...this.config,
      ...settings
    };
    
    // Refresh all elements with new settings
    this.refreshAll();
  },

  initMutationObserver() {
    if (this.config.disableMutationObserver) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1 && node.getAttribute('data-viks')) {
            this.observer.observe(node);
            node.classList.add(this.config.initClassName);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  },

  initResizeObserver() {
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        if (entry.target.hasAttribute('data-viks')) {
          this.updateElementPosition(entry.target);
        }
      });
    });

    this.elements.forEach(element => {
      resizeObserver.observe(element);
    });
  },

  applyAnimation(element) {
    const delay = this.getDelay(element);
    const duration = this.getDuration(element);
    const easing = this.getEasing(element);

    // Apply transition properties
    element.style.transitionDuration = `${duration}ms`;
    element.style.transitionDelay = `${delay}ms`;
    element.style.transitionTimingFunction = easing;

    // Get easing from data attribute or config
    const easingAttr = element.getAttribute('data-viks');
    const easingMatch = Object.keys(this.easingMap).find(key => easingAttr?.includes(key));
    const easingValue = this.easingMap[easingMatch] || this.easingMap[easing] || easing;

    element.style.transitionTimingFunction = easingValue;

    // Rest of the applyAnimation logic...
    requestAnimationFrame(() => {
      element.classList.add(this.config.animatedClassName);
    });

    element.dispatchEvent(new CustomEvent('viksAnimated', {
      bubbles: true,
      detail: { animation: element.getAttribute('data-viks') }
    }));


    // Handle custom animations
    const customAnimation = element.getAttribute('data-viks-custom');
    if (customAnimation) {
      this.applyCustomAnimation(element, customAnimation);
    }

    // Add animation class
    requestAnimationFrame(() => {
      element.classList.add(this.config.animatedClassName);
    });

    // Dispatch custom event
    element.dispatchEvent(new CustomEvent('viksAnimated', {
      bubbles: true,
      detail: { animation: element.getAttribute('data-viks') }
    }));
  },

  applyCustomAnimation(element, animation) {
    const customAnimations = {
      'bounce': () => {
        element.style.animation = 'viksNoBounce 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      },
      'pulse': () => {
        element.style.animation = 'viksPulse 1s cubic-bezier(0.4, 0, 0.6, 1)';
      }
      // Add more custom animations here
    };

    if (customAnimations[animation]) {
      customAnimations[animation]();
    }
  },

  removeAnimation(element) {
    element.classList.remove(this.config.animatedClassName);
    element.dispatchEvent(new CustomEvent('viksHidden', {
      bubbles: true,
      detail: { animation: element.getAttribute('data-viks') }
    }));
  },

  updateElementPosition(element) {
    const rect = element.getBoundingClientRect();
    element.setAttribute('data-viks-position', JSON.stringify({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }));
  },

  updateElementOnScroll(element, scrollY) {
    const position = JSON.parse(element.getAttribute('data-viks-position') || '{}');
    const offset = this.config.offset;

    if (position.top - scrollY <= this.windowHeight - offset) {
      this.applyAnimation(element);
    } else if (this.config.mirror) {
      this.removeAnimation(element);
    }
  },

  getDelay(element) {
    return parseInt(element.getAttribute('data-viks-delay')) || 
           this.getAttributeFromString(element.getAttribute('data-viks'), 'delay-') || 
           this.config.delay;
  },

  getDuration(element) {
    return parseInt(element.getAttribute('data-viks-duration')) || 
           this.getAttributeFromString(element.getAttribute('data-viks'), 'duration-') || 
           this.config.duration;
  },

  getEasing(element) {
    return element.getAttribute('data-viks-easing') || 
           this.getAttributeFromString(element.getAttribute('data-viks'), 'easing-') || 
           this.config.easing;
  },

  getAttributeFromString(str, prefix) {
    if (!str) return null;
    const match = str.match(new RegExp(`${prefix}(\\d+)`));
    return match ? parseInt(match[1]) : null;
  },

  // Utility method to check if element should animate
  shouldAnimate(element) {
    if (this.config.disable) return false;
    if (element.getAttribute('data-viks-disabled') === 'true') return false;

    const viewportWidth = window.innerWidth;
    const minWidth = parseInt(element.getAttribute('data-viks-min-width')) || 0;
    const maxWidth = parseInt(element.getAttribute('data-viks-max-width')) || Infinity;

    return viewportWidth >= minWidth && viewportWidth <= maxWidth;
  },

  // Method to manually refresh specific element
  refresh(element) {
    if (element && element.hasAttribute('data-viks')) {
      this.updateElementPosition(element);
      this.observer.unobserve(element);
      this.observer.observe(element);
    }
  },

  // Method to refresh all elements
  refreshAll() {
    this.elements.forEach(element => {
      this.refresh(element);
    });
  },

  // Method to manually trigger animation
  animate(element) {
    if (element && this.shouldAnimate(element)) {
      this.applyAnimation(element);
    }
  },

  // Method to manually hide element
  hide(element) {
    if (element) {
      this.removeAnimation(element);
    }
  },

  // Method to destroy instance
  destroy() {
    this.elements.forEach(element => {
      element.classList.remove(this.config.initClassName);
      element.classList.remove(this.config.animatedClassName);
      element.removeAttribute('data-viks-position');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-delay');
      element.style.removeProperty('transition-timing-function');
      element.style.removeProperty('animation');
      this.observer.unobserve(element);
    });

    window.removeEventListener('resize', this.setupEventListeners);
    window.removeEventListener('scroll', this.setupEventListeners);
    document.removeEventListener('visibilitychange', this.setupEventListeners);
  }
};

// viks-number.js
const VIKSNumber = {
  init() {
    // Get all elements with data-viks containing "type-text"
    this.elements = document.querySelectorAll('[data-viks*="type-nbr"]');
    this.setupAnimations();
    this.initializeObserver();
  },

  setupAnimations() {
    this.elements.forEach(element => {
      // Store the original number
      const finalNumber = parseFloat(element.textContent);
      element.setAttribute('data-final-number', finalNumber);
      element.textContent = '0';

      // Add necessary styles
      element.style.visibility = 'visible';
      element.style.opacity = '1';
    });
  },

  parseAttributes(element) {
    const viksAttr = element.getAttribute('data-viks');
    return {
      duration: this.getAttributeValue(viksAttr, 'duration-', 2000),
      fps: this.getAttributeValue(viksAttr, 'fps-', 60),
      bottomOff: viksAttr.includes('bottom-off'),
      bottomOn: viksAttr.includes('bottom-on'),
      topOff: viksAttr.includes('top-off'),
      topOn: viksAttr.includes('top-on')
    };
  },

  getAttributeValue(str, prefix, defaultValue) {
    const match = str.match(new RegExp(`${prefix}(\\d+)`));
    return match ? parseInt(match[1]) : defaultValue;
  },

  initializeObserver() {
    const options = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        const config = this.parseAttributes(element);

        // Determine animation direction based on attributes
        const animateTop = config.topOn || (!config.topOff && !config.bottomOn);
        const animateBottom = config.bottomOn || (!config.bottomOff && !config.topOn);

        if (entry.isIntersecting) {
          // Check scroll direction
          const scrollingDown = entry.boundingClientRect.top < entry.rootBounds.top;

          if ((scrollingDown && animateBottom) || (!scrollingDown && animateTop)) {
            this.animateNumber(element, config);
          }
        } else {
          // Reset number when out of view based on configuration
          if ((entry.boundingClientRect.top > 0 && animateTop) || 
              (entry.boundingClientRect.top < 0 && animateBottom)) {
            element.textContent = '0';
          }
        }
      });
    }, options);

    this.elements.forEach(element => observer.observe(element));
  },

  animateNumber(element, config) {
    const finalNumber = parseFloat(element.getAttribute('data-final-number'));
    const frameDuration = 1000 / config.fps; // Convert FPS to frame duration
    const totalFrames = config.duration / frameDuration;
    let frame = 0;

    const easeOutQuad = t => t * (2 - t);

    const animate = () => {
      frame++;
      const progress = easeOutQuad(frame / totalFrames);
      const currentNumber = Math.round(finalNumber * progress);

      element.textContent = this.formatNumber(currentNumber);

      if (frame < totalFrames) {
        setTimeout(() => requestAnimationFrame(animate), frameDuration);
      }
    };

    requestAnimationFrame(animate);
  },

  formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  }
};

// 3D Animation Library
class Viks3D {
  constructor() {
    this.elements = [];
    this.init();
  }

  init() {
    // Mencari semua elemen dengan atribut data-viks="3D"
    this.elements = Array.from(document.querySelectorAll('[data-viks="3D"]'));
  this.setupAnimations();
    this.setupAnimations();

    // Menambahkan event listener untuk interaksi mouse
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  setupAnimations() {
    this.elements.forEach(element => {
      // Menambahkan CSS dasar
      element.style.transition = 'transform 0.3s ease-out';
      element.style.transformStyle = 'preserve-3d';
      element.style.perspective = '1000px';

      // Menambahkan event listeners
      element.addEventListener('mouseenter', () => this.handleHover(element, true));
      element.addEventListener('mouseleave', () => this.handleHover(element, false));
    });
  }

  handleMouseMove(event) {
    this.elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Menghitung posisi relatif mouse
      const mouseX = event.clientX - centerX;
      const mouseY = event.clientY - centerY;

      // Menghitung rotasi berdasarkan posisi mouse
      const rotateX = (mouseY / rect.height) * 20;
      const rotateY = (mouseX / rect.width) * 20;

      // Terapkan transformasi
      element.style.transform = `
        rotateX(${-rotateX}deg) 
        rotateY(${rotateY}deg)
        scale3d(1.05, 1.05, 1.05)
      `;
    });
  }

  handleHover(element, isHovering) {
    if (!isHovering) {
      element.style.transform = 'rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
  }

  // Metode untuk menambahkan efek bayangan
  addShadow() {
    this.elements.forEach(element => {
      element.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    });
  }

  // Metode untuk menambahkan efek parallax
  addParallax(depth = 30) {
    this.elements.forEach(element => {
      const children = element.children;
      Array.from(children).forEach((child, index) => {
        child.style.transform = `translateZ(${depth * (index + 1)}px)`;
      });
    });
  }
}

// CSS For  Animation 3D
const style = document.createElement('style');
style.textContent = `
  [data-viks="3D"] {
    cursor: pointer;
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
    transform-style: preserve-3d;
    perspective: 1000px;
    will-change: transform;
  }

  [data-viks="3D"]:hover {
    box-shadow: 0 15px 30px rgba(0,0,0,0.2);
  }

  [data-viks="3D"] * {
    pointer-events: none;
  }
`;
document.head.appendChild(style);

// Export as modules if supported
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VIKS, VIKSNumber, Viks3D };
} else if (typeof define === 'function' && define.amd) {
  define([], function() {
    return { VIKS, VIKSNumber, Viks3D };
  });
} else {
  window.VIKS = VIKS;
  window.VIKSNumber = VIKSNumber;
  window.Viks3D = Viks3D;
}