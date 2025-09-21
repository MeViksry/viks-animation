<div align="center">

# VIKS ANIMATION

<p>
<img src="https://img.shields.io/badge/JavaScript-Library-aqua?style=for-the-badge&logoColor=black" alt="JavaScript Library Badge"/>
</p>

<p>
<img src="https://img.shields.io/badge/Chrome-Latest-aqua?style=flat-square&logo=google-chrome&logoColor=white"/>
<img src="https://img.shields.io/badge/Firefox-Latest-aqua?style=flat-square&logo=firefox&logoColor=white"/>
<img src="https://img.shields.io/badge/Safari-Latest-aqua?style=flat-square&logo=safari&logoColor=white"/>
<img src="https://img.shields.io/badge/Edge-Latest-aqua?style=flat-square&logo=microsoft-edge&logoColor=white"/>
<img src="https://img.shields.io/badge/Opera-Latest-aqua?style=flat-square&logo=opera&logoColor=white"/>
</p>

<p>
<a href="https://github.com/Vixsry/viks-animation/blob/main/LICENSE" target="_blank">
<img src="https://img.shields.io/badge/LICENSE-MIT-black?style=flat-square" alt="License Badge">
</a>
<a href="https://www.npmjs.com/package/viks-a" target="_blank">
<img src="https://img.shields.io/badge/DOWNLOAD-1K%2FMONTH-aqua?style=flat-square" alt="Downloads Badge">
</a>
</p>

### ✨ Lightweight JavaScript library for smooth and engaging scroll animations ✨

</div>

---

## 🌟 What is VIKS Animation?

VIKS Animation is a modern animation library designed to make websites and applications more dynamic with minimal effort. It is beginner-friendly and suitable for professionals, offering both basic and advanced configuration options to cater to diverse animation needs.

<div align="center">

| 🎯 Core Features | 🛠️ Technical Highlights | 🎨 Animation Types |
|:---:|:---:|:---:|
| • Smooth Scroll Animation<br>• Number Animation<br>• 3D Transformations<br>• Multiple Easing Functions<br>• Cross-Browser Support | • Zero Dependencies<br>• Lightweight (~12KB gzipped)<br>• High Performance<br>• Mobile-First Design<br>• Easy to Use | • Fade Effects<br>• Slide Animations<br>• Scale Transformations<br>• 3D Rotations<br>• Custom Animations |

</div>

<div align="center">

<a href="mailto:kingvikvik25@gmail.com">
<img src="https://img.shields.io/badge/Email-aqua?style=for-the-badge&logo=gmail&logoColor=black" alt="Email">
</a>
<a href="https://www.linkedin.com/in/MeViksry">
<img src="https://img.shields.io/badge/LinkedIn-black?style=for-the-badge&logo=linkedin&logoColor=aqua" alt="LinkedIn">
</a>
<a href="https://www.instagram.com/meviksry">
<img src="https://img.shields.io/badge/Instagram-aqua?style=for-the-badge&logo=instagram&logoColor=black" alt="Instagram">
</a>
<a href="https://www.tiktok.com/@viksry">
<img src="https://img.shields.io/badge/TikTok-black?style=for-the-badge&logo=tiktok&logoColor=aqua" alt="TikTok">
</a>
<a href="https://www.threads.net/@meviksry">
<img src="https://img.shields.io/badge/Threads-aqua?style=for-the-badge&logo=threads&logoColor=black" alt="Threads">
</a>
<a href="https://www.facebook.com/share/19aKzAtBeZ/">
<img src="https://img.shields.io/badge/Facebook-black?style=for-the-badge&logo=facebook&logoColor=aqua" alt="Facebook">
</a>

</div>

---

## 💫 AVAILABLE ANIMATIONS

<div align="center">

<a href="#fade-animations">
<img src="https://img.shields.io/badge/Fade-Animations-aqua?style=flat-square&logoColor=black" alt="Fade">
</a>
<a href="#flip-animations">
<img src="https://img.shields.io/badge/Flip-Animations-black?style=flat-square&logoColor=aqua" alt="Flip">
</a>
<a href="#slide-animations">
<img src="https://img.shields.io/badge/Slide-Animations-aqua?style=flat-square&logoColor=black" alt="Slide">
</a>
<a href="#zoom-animations">
<img src="https://img.shields.io/badge/Zoom-Animations-black?style=flat-square&logoColor=aqua" alt="Zoom">
</a>
<a href="#shake-animation">
<img src="https://img.shields.io/badge/Shake-Animations-aqua?style=flat-square&logoColor=black" alt="Shake">
</a>
<a href="#spin-animation">
<img src="https://img.shields.io/badge/Spin-Animations-black?style=flat-square&logoColor=aqua" alt="Spin">
</a>
<a href="#bounce-animation">
<img src="https://img.shields.io/badge/Bounce-Animations-aqua?style=flat-square&logoColor=black" alt="Bounce">
</a>

</div>

---

## ⚡ INSTALLATION

You can add VIKS Animation to your project in several ways.

### Using a CDN (Recommended for beginners)

Simply add the following lines to your HTML file:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/viks-a@latest/dist/viks.min.css">
<script src="https://cdn.jsdelivr.net/npm/viks-a@latest/dist/viks.min.js"></script>
```

Then, initialize the library in a `<script>` tag before the closing `</body>`:

```html
<script>
  VIKS.init();
</script>
```

### Using a Package Manager (NPM/Yarn)

Install the package using your preferred manager:

```bash
# NPM
npm install viks-a

# YARN
yarn add viks-a
```

Then, import it into your project's main JavaScript file and initialize it:

```javascript
// Import the CSS
import 'viks-a/dist/viks.min.css';

// Import the JavaScript modules
import { VIKS, VIKSNumber, Viks3D } from 'viks-a';

// Initialize the library
VIKS.init();
VIKSNumber.init();
const viks3D = new Viks3D();
```

### Manual Installation

1. Download the JavaScript and CSS files:
   - viks.css
   - viks.js

2. Add them to your HTML as shown below:

```html
<link rel="stylesheet" href="path/to/viks.css">
<script src="path/to/viks.js"></script>
```

---

## 🚀 INITIALIZATION

```javascript
// VIKS SCROLL ANIMATION
VIKS.init();

// VIKS NUMBER ANIMATION
VIKSNumber.init();

// VIKS 3D ANIMATION
const viks3D = new Viks3D(); 
viks3D.addShadow();
viks3D.addParallax(20);
```

<details>
<summary><b>🔧 Advanced Configuration Options</b></summary>

```javascript
VIKS.init({
  thresholdTop: 0.2,         // Set threshold when element appears at the top of the viewport
  thresholdBottom: 0.2,      // Set threshold when element appears at the bottom of the viewport
  disable: false,            // Disable animation if set to true
  startEvent: 'load',        // Wait until the page is fully loaded
  animatedClassName: 'viks-animate', // Add animation class to animated elements
  initClassName: 'viks-init', // Class added to initialized elements
  useClassNames: false,      // Enable or disable the use of CSS classes
  throttleDelay: 100,        // Set delay time for throttle on scroll
  debounceDelay: 50,         // Set delay time for debounce on resize
  offset: 120,               // Add offset distance from the viewport
  delay: 0,                  // Delay animation after element appears
  duration: 800,             // Animation duration
  easing: 'ease-in-out',     // Default easing function
  once: false,               // Animation runs only once
  mirror: true,              // Display animation in both directions (mirroring)
  animateTop: false,         // Turn off all scroll-up animations
  animateBottom: true        // Enable scroll-down animations
});
```

</details>

---

## 📝 USAGE

### 🔄 ON SCROLL ANIMATION

| Basic Usage | Animation Based on Screen Size |
|:---|:---|
| ```html<br><div data-viks="fade-up"><br>  VIKS CONTENT<br></div><br>``` | ```html<br><div data-viks="fade-up"<br>     data-viks-desktop="zoom-in"<br>     data-viks-tablet="fade-left"<br>     data-viks-mobile="fade-down"><br>  VIKS CONTENT<br></div><br>``` |

| Control Delay | Control Duration |
|:---|:---|
| ```html<br><div data-viks="fade-up" data-viks-delay="1000"><br>  VIKS CONTENT<br></div><br><br><div data-viks="fade-up delay-1000"><br>  VIKS CONTENT<br></div><br>``` | ```html<br><div data-viks="fade-up" data-viks-duration="2000"><br>  2 seconds duration<br></div><br><br><div data-viks="fade-up duration-2000"><br>  2 seconds duration<br></div><br>``` |

| Disable Scroll Animations | Combine Attributes |
|:---|:---|
| ```html<br><div data-viks="fade-up" data-viks-animation-top="off"><br>  No animation on upscroll<br></div><br><br><div data-viks="fade-up" data-viks-animation-bottom="off"><br>  No animation on downscroll<br></div><br>``` | ```html<br><div data-viks="fade-up delay-1000 duration-2000"><br>  Multiple attributes combination<br></div><br>``` |

#### Custom Easing

```html
<div data-viks="fade-up" data-viks-easing="ease-out">
  Ease-out easing
</div>
```

<details>
<summary><b>Available Easing Functions</b></summary>

- linear
- ease
- ease-in
- ease-out
- ease-in-out
- ease-in-back
- ease-out-back
- ease-in-out-back
- ease-in-sine
- ease-out-sine
- ease-in-out-sine
- ease-in-quad
- ease-out-quad
- ease-in-out-quad
- ease-in-cubic
- ease-out-cubic
- ease-in-out-cubic
- ease-in-quart
- ease-out-quart
- ease-in-out-quart
- ease-elastic
- ease-bounce
- ease-in-expo
- ease-out-expo
- ease-in-out-expo
- ease-in-circ
- ease-out-circ
- ease-in-out-circ

</details>

### 🔄 3D ANIMATION

```html
<div data-viks="3D">
    <h2>Examples</h2>
    <p>Examples</p>
</div>
```

### 🔄 NUMBER ANIMATION

```html
<span data-viks="type-nbr duration-1000 fps-120">1000</span>
<span data-viks="type-nbr">1000</span>
<span data-viks="type-nbr duration-2000 fps-60 bottom-off">2000</span>
```

### 📢 EVENT CALLBACK

```javascript
// 1. Initialize the library first
VIKS.init();

// 2. Then, register event listeners on the VIKS object
VIKS.on('beforeInit', (event) => {
  console.log('Before initialization:', event.timestamp);
});

VIKS.on('afterAnimate', (event) => {
  console.log('Element animated:', event.element);
});

// Example of removing a specific callback
const scrollHandler = (event) => {
  console.log('Scroll position:', event.scrollY);
};

VIKS.on('onScroll', scrollHandler);
// Later...
VIKS.off('onScroll', scrollHandler);
```

---

## 🎭 ANIMATION TYPES

<div class="animations-container">

### <span id="bounce-animation">Bounce Animation</span>
- `bounce`
- `bounce-up`
- `bounce-down`
- `bounce-left`
- `bounce-right`

### <span id="fade-animations">Fade Animations</span>
- `fade`
- `fade-up`
- `fade-down`
- `fade-left`
- `fade-right`
- `fade-up-right`
- `fade-up-left`
- `fade-down-right`
- `fade-down-left`

### <span id="flip-animations">Flip Animations</span>
- `flip-up`
- `flip-down`
- `flip-left`
- `flip-right`

### <span id="slide-animations">Slide Animations</span>
- `slide-up`
- `slide-down`
- `slide-left`
- `slide-right`

### <span id="shake-animation">Shake Animation</span>
- `shake`
- `shake-horizontal`
- `shake-vertical`

### <span id="spin-animation">Spin Animation</span>
- `spin`
- `spin-bounce`
- `spin-slow`
- `spin-fast`
- `spin-reverse`

### <span id="zoom-animations">Zoom Animations</span>
- `zoom-in`
- `zoom-in-up`
- `zoom-in-down`
- `zoom-in-left`
- `zoom-in-right`
- `zoom-out`
- `zoom-out-up`
- `zoom-out-down`
- `zoom-out-left`
- `zoom-out-right`

</div>

---

<div align="center">

## ☕ SUPPORT MY WORK

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Buy%20Me%20A%20Coffee&fontSize=60&fontAlignY=35&animation=twinkling&fontColor=gradient" />

<a href="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=white&color=aqua&width=435&lines=Support+my+work;Buy+Me+Golda+Coffee!+☕">
<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=white&color=aqua&width=435&lines=Support+my+work;Buy+Me+Golda+Coffee!+☕" alt="Typing SVG">
</a>

**Say Thank You by Buying Someone a Coffee!**

<a href="https://ko-fi.com/viksry">
<img src="https://storage.ko-fi.com/cdn/kofi2.png?v=3" width="200">
</a>

*Your support helps me to continue creating and maintaining projects! ✨*

</div>

---

## 🌐 DEMO

<p align="center">See the full demo on the <a href="https://viksanimation.my.id">official website</a>.</p>

---

## 📄 LICENSE

<p align="center">This project is <a href="./LICENSE">MIT</a> licensed.</p>

---

## 🤝 CONTRIBUTING

<p align="center">Contributions, issues, and feature requests are welcome! See <a href="./CONTRIBUTING.md">CONTRIBUTING.md</a></p>

<div align="center">

*Made with ❤️ by [VIKRI AHPAD TANTOWI](https://github.com/MeViksry)*

</div>