# Contributing to VIKS Animation Library

<div align="center">

[![Code Style](https://img.shields.io/badge/Code_Style-Prettier-00FFFF?style=for-the-badge&logoColor=black)](#code-style)
[![Commit Style](https://img.shields.io/badge/Commits-Conventional-40E0D0?style=for-the-badge&logoColor=black)](#commit-guidelines)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-00FFFF?style=for-the-badge&logoColor=black)](#submitting-pull-requests)

</div>

## 🌟 Welcome!

First of all, thank you for considering contributing to VIKS Animation Library! People like you make VIKS a great tool. This document provides guidelines and steps for contributing.

## 📜 Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Use friendly and inclusive language
- Respect different viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

## 🔄 Pull Request Process

1. **Branch Naming Convention**
   - Feature: `feature/description`
   - Bug Fix: `fix/description`
   - Documentation: `docs/description`
   - Performance: `perf/description`
   - Animation: `animation/new-animation-name`

2. **Before Submitting PR**
   - Update README.md with details of changes (if needed)
   - Update documentation
   - Add or update tests
   - Ensure all tests pass
   - Update version numbers following [SemVer](http://semver.org/)
   - Test on multiple browsers (Chrome, Firefox, Safari, Edge)
   - Verify responsive behavior on different screen sizes

3. **PR Template**
   ```markdown
   ## Description
   [Describe your changes]

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] New animation
   - [ ] Breaking change
   - [ ] Documentation update
   - [ ] Performance improvement

   ## Checklist
   - [ ] My code follows the style guidelines
   - [ ] I have performed a self-review
   - [ ] I have commented my code
   - [ ] I have updated the documentation
   - [ ] I have added tests
   - [ ] All tests pass
   - [ ] I have tested on multiple browsers
   - [ ] Responsive behavior works correctly
   ```

## 📝 Coding Standards

### JavaScript Style Guide

- Use ES6+ features
- Follow Prettier configuration
- Maximum line length: 100 characters
- Use meaningful variable names
- Document complex logic with JSDoc comments
- Avoid using `localStorage` or `sessionStorage`
- Use `const` for immutable values, `let` for mutable values

```javascript
// ✅ Good
const calculateOffset = (element, options) => {
  const { offset = 0 } = options;
  return element.getBoundingClientRect().top + offset;
};

/**
 * Gets animation delay from element
 * @param {HTMLElement} element - Target element
 * @returns {number} Delay value in milliseconds
 */
getDelay(element) {
  return parseInt(element.getAttribute('data-viks-delay')) || 
         this.getAttributeFromString(element.getAttribute('data-viks'), 'delay-') || 
         this.config.delay;
}

// ❌ Bad
const calc = (e, o) => {
  return e.getBoundingClientRect().top + (o.offset || 0);
};
```

### CSS Style Guide

```css
/* ✅ Good */
.viks-animation {
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.3s ease;
}

[data-viks*="fade-up"] {
  transform: translate3d(0, 100%, 0);
}

/* ❌ Bad */
.anim {
  transform:translateY(20px);opacity:0;
  transition: all .3s ease
}
```

### Animation Guidelines

When creating new animations:

1. **Naming Convention**: Use descriptive names (e.g., `fade-up`, `zoom-in-left`)
2. **Performance**: Use `transform` and `opacity` for better performance
3. **Use `translate3d`**: Enables hardware acceleration
4. **Add `will-change`**: For properties that will animate
5. **Include Responsive Variants**: Add desktop, tablet, and mobile versions if needed
6. **Test Thoroughly**: Verify on different browsers and devices

```css
/* Example new animation */
[data-viks*="rotate-in"] {
  opacity: 0;
  transform: rotate(-180deg) scale(0.5);
}

[data-viks*="rotate-in"].viks-animate {
  opacity: 1;
  transform: rotate(0) scale(1);
}
```

## 📊 Commit Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature or animation
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Code style (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Scopes:**
- `core`: Core VIKS functionality
- `animations`: Animation-related changes
- `3d`: Viks3D-related changes
- `number`: VIKSNumber-related changes
- `events`: Event system changes
- `observer`: Intersection/Mutation Observer changes

**Examples:**
```
feat(animations): add rotate-bounce animation

- Added new animation combining rotation and bounce
- Updated documentation with usage examples
- Added tests for new animation

Closes #123
```

```
fix(observer): correct threshold calculation for mobile devices

- Fixed intersection observer threshold on mobile
- Improved scroll detection accuracy
- Added unit tests

Fixes #456
```

## 📚 Documentation

### JSDoc Requirements

All public methods must have JSDoc comments:

```javascript
/**
 * Initializes animation for an element
 * @param {HTMLElement} element - Target element
 * @param {Object} options - Animation options
 * @param {number} [options.duration=1000] - Animation duration in ms
 * @param {string} [options.easing='ease'] - Animation timing function
 * @param {boolean} [options.once=false] - Animate only once
 * @returns {void}
 * @fires VIKS#beforeInit
 * @fires VIKS#afterInit
 */
```

### Documentation Updates

When adding new features:

1. Update README.md with usage examples
2. Add animation to the animation catalog
3. Update API documentation
4. Include code examples
5. Add screenshots or GIFs if applicable

## 🧪 Testing Guidelines

### Test Structure

Tests are organized into main categories:

1. **Initialization Tests**
```javascript
describe('VIKS Animation', () => {
  it('should initialize with default options', () => {
    const element = document.createElement('div');
    const viks = VIKS.init();
    expect(viks.config).toHaveProperty('duration', 400);
    expect(viks.config).toHaveProperty('easing', 'ease');
  });
});
```

2. **Animation Parameter Tests**
```javascript
describe('Animation Parameters', () => {
  it('should get correct delay value', () => {
    const element = document.createElement('div');
    element.setAttribute('data-viks', 'fade-up delay-500');
    document.body.appendChild(element);
    
    const viks = VIKS.init();
    const delay = viks.getDelay(element);
    expect(delay).toBe(500);
  });
});
```

3. **Responsive Animation Tests**
```javascript
describe('Responsive Animations', () => {
  it('should apply desktop animation on large screens', () => {
    global.innerWidth = 1200;
    const element = document.createElement('div');
    element.setAttribute('data-viks-desktop', 'fade-up');
    
    const animation = VIKS.getActiveAnimation(element);
    expect(animation).toBe('fade-up');
  });
});
```

4. **Event System Tests**
```javascript
describe('Event System', () => {
  it('should trigger afterAnimate event', (done) => {
    const element = document.createElement('div');
    element.setAttribute('data-viks', 'fade-up');
    
    VIKS.on('afterAnimate', (event) => {
      expect(event.element).toBe(element);
      done();
    });
    
    VIKS.applyAnimation(element);
  });
});
```

### Testing Requirements

- **Minimum 80% coverage** for new code
- All animation types must have tests
- Test browser compatibility features
- Include tests for:
  - Animation parameters (delay, duration, easing)
  - Element detection and initialization
  - Scroll behavior and triggers
  - Animation application/removal
  - Window events (resize, scroll)
  - Intersection Observer functionality
  - Event system (on, off, _fire)
  - Responsive breakpoints (desktop, tablet, mobile)
  - VIKSNumber animations
  - Viks3D interactions

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- viks.test.js

# Run tests in watch mode
npm test -- --watch

# Run tests for specific component
npm test -- number.test.js
npm test -- 3d.test.js
```

## 🎨 Adding New Animations

To add a new animation to VIKS:

1. **Add CSS in viks.css**:
```css
[data-viks*="your-animation"] {
  opacity: 0;
  transform: /* your initial transform */;
}

[data-viks*="your-animation"].viks-animate {
  opacity: 1;
  transform: /* your final transform */;
}
```

2. **Add Responsive Variants** (if needed):
```css
@media (min-width: 1024px) {
  [data-viks-desktop*="your-animation"] { /* desktop styles */ }
}

@media (min-width: 768px) and (max-width: 1023px) {
  [data-viks-tablet*="your-animation"] { /* tablet styles */ }
}

@media (max-width: 767px) {
  [data-viks-mobile*="your-animation"] { /* mobile styles */ }
}
```

3. **Add Tests**:
```javascript
describe('Your Animation', () => {
  it('should apply your-animation correctly', () => {
    // test implementation
  });
});
```

4. **Update Documentation**:
   - Add to animation catalog in README.md
   - Include usage example
   - Add to migration guide if it's a breaking change

## 🏗️ Project Structure

```
viks-animation/
├── src/
│   ├── viks.js          # Core animation library
│   └── viks.css         # Animation styles
├── tests/
│   ├── viks.test.js     # Core tests
│   ├── number.test.js   # VIKSNumber tests
│   └── 3d.test.js       # Viks3D tests
├── docs/
│   └── api.md           # API documentation
├── examples/
│   └── index.html       # Usage examples
├── CONTRIBUTING.md
├── README.md
└── package.json
```

## 👥 Community

### Getting Help

- **GitHub Issues**: Bug reports and feature requests
- **Discord Community**: Real-time discussions
- **Stack Overflow**: Tag your questions with `viks-animation`
- **Email**: support@viksanimation.my.id

### Regular Contributors

Active contributors get:
- Access to development meetings
- Mentioned in README.md
- Early access to new features
- Voting rights on major decisions

## 🏆 Recognition

All contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation
- Added to the contributors page on the website

## 📋 Issue Templates

### Bug Report Template

```markdown
**Description:**
A clear description of the bug

**Steps to Reproduce:**
1. Initialize VIKS with config...
2. Add element with data-viks="..."
3. Scroll to element
4. Observe behavior

**Expected Behavior:**
Element should animate smoothly

**Actual Behavior:**
Element flickers or doesn't animate

**Environment:**
- Browser: Chrome 120
- OS: Windows 11
- VIKS Version: 1.0.7
- Screen Size: 1920x1080

**Code Sample:**
```html
<div data-viks="fade-up" data-viks-duration="1000">
  Content
</div>
```

**Additional Context:**
Add any other context about the problem here.
```

### Feature Request Template

```markdown
**Feature Description:**
Add zoom-rotate-3d animation

**Use Case:**
I need a combined zoom and rotate animation for product showcases that works on mobile and desktop differently.

**Proposed Solution:**
```css
[data-viks*="zoom-rotate-3d"] {
  transform: scale(0.5) rotateY(-180deg);
}
```

**Alternatives Considered:**
- Using separate zoom and rotate animations
- Creating custom animation with keyframes

**Additional Context:**
This would be useful for e-commerce sites showcasing 3D products.
```

### Animation Request Template

```markdown
**Animation Name:**
bounce-rotate

**Animation Type:**
- [ ] Fade
- [ ] Slide
- [ ] Zoom
- [x] Bounce
- [x] Rotate
- [ ] Flip
- [ ] Custom

**Description:**
An animation that combines bouncing motion with rotation

**Visual Reference:**
[Link to video/GIF showing desired effect]

**Use Case:**
Attention-grabbing animation for call-to-action buttons

**Initial Transform:**
```css
transform: scale(0.5) rotate(-45deg);
```

**Final Transform:**
```css
transform: scale(1) rotate(0);
```
```

## 🚀 Development Workflow

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/viks-animation.git
   cd viks-animation
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**
   - Write code
   - Add tests
   - Update documentation

5. **Test your changes**
   ```bash
   npm test
   npm run lint
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat(animations): add bounce-rotate animation"
   ```

7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template
   - Submit for review

## 📌 Code Review Process

1. **Automated Checks**: CI/CD will run tests and linting
2. **Maintainer Review**: Core team reviews code quality and design
3. **Community Feedback**: Other contributors may provide input
4. **Approval**: At least one maintainer approval required
5. **Merge**: Maintainer will merge after approval

## 🔒 Security

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email security concerns to: security@viksanimation.my.id
3. Include detailed information about the vulnerability
4. Allow time for the team to address the issue

## 📄 License

By contributing to VIKS Animation Library, you agree that your contributions will be licensed under the MIT License.

---

<div align="center">

[![Questions](https://img.shields.io/badge/Have_Questions%3F-Ask_Away!-00FFFF?style=for-the-badge&logoColor=black)](https://github.com/Vixsry/viks-animation/issues)

**Thank you for contributing to VIKS Animation Library! 🎉**

Made with ❤️ by the VIKS community

</div>