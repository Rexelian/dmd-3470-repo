# Responsive Images & Backgrounds Exercise

A comprehensive responsive web design assignment covering three essential image techniques: the `<picture>` element, CSS `background-size` (contain vs. cover), and `image-set()` for high-DPI displays.

## Overview

This assignment teaches three complementary responsive image techniques:

1. **Exercise 1**: `<picture>` element for art-directed responsive images
2. **Exercise 2**: CSS `background-size` (contain vs. cover) with responsive backgrounds
3. **Exercise 3**: `image-set()` for resolution-aware background images

Students complete all three exercises in a single HTML page with accompanying CSS, verified by automated tests.

## File Structure

```
picture-element/
├── index.html                    # Student assignment file
├── solution.html                 # Complete solution (instructor reference)
├── generate-images.js           # Script to regenerate placeholder images
├── css/
│   ├── main.css                 # Student CSS file with TODO markers
│   └── solution.css             # Complete CSS solution
├── images/
│   ├── art-medium.jpg           # Exercise 1: Picture element
│   ├── art-large.jpg            # Exercise 1: Picture element
│   ├── art-extra-large.jpg      # Exercise 1: Picture element
│   ├── bg-small.jpg             # Exercise 2: Background demos
│   ├── bg-medium.jpg            # Exercise 2: Background demos
│   ├── bg-large.jpg             # Exercise 2: Background demos
│   ├── pattern-1x.jpg           # Exercise 3: Image-set demo
│   ├── pattern-2x.jpg           # Exercise 3: Image-set demo
│   └── pattern-3x.jpg           # Exercise 3: Image-set demo
└── tests/
    └── picture-element.spec.js  # Automated Playwright tests
```

## Running the Assignment

### For Students

1. **Review the rubric** in `index.html` to understand grading criteria
2. **Complete Exercise 1**: Add picture element to the `<aside>` in HTML
3. **Complete Exercise 2**: Add background CSS for contain/cover demos
4. **Complete Exercise 3**: Add image-set() CSS for high-DPI demo
5. **Test your work**: Run `npm test` to verify all tests pass
6. **Submit**: Publish and submit the link to HuskyCT

### For Instructors

#### Grading

Automated tests verify:
- ✅ Picture element loads correct images at breakpoints (945px, 1100px)
- ✅ Background-size properties (contain/cover)
- ✅ Background images change at responsive breakpoints
- ✅ Image-set() implementation with multiple resolutions

#### Solution Files

Complete solutions are provided in `solution.html` and `css/solution.css` for instructor reference. All tests pass with the solution implementation.

#### Testing Options

The test suite can verify either the student starter file or the solution file:

```bash
# Test student starter file (default - expects failures)
npm test
npm run test:student

# Test solution file (expects all 13 tests to pass)
npm run test:solution
```

The `TEST_FILE` environment variable controls which HTML file is tested:
- Default: `index.html` (student starter)
- Set to `solution`: tests `solution.html` (complete implementation)

This allows instructors to:
- Verify the solution is correct: `npm run test:solution`
- See what students see with starter files: `npm test`
- Test custom implementations without file swapping

## Technical Details

### Exercise 1: Picture Element

**Files modified**: `index.html`

Students implement a `<picture>` element with:
- `<source>` for 1100px+ → `art-extra-large.jpg`
- `<source>` for 945px+ → `art-large.jpg`
- `<img>` fallback → `art-medium.jpg`

### Exercise 2: Background-Size

**Files modified**: `css/main.css`

Students add CSS for two demo containers:
- `.bg-contain-demo` with `background-size: contain`
- `.bg-cover-demo` with `background-size: cover`
- Both with `background-position: center` and `background-repeat: no-repeat`
- Media queries switching backgrounds at 700px and 1000px

### Exercise 3: Image-Set

**Files modified**: `css/main.css`

Students implement `image-set()` on `.image-set-demo`:
```css
background-image: image-set(
  url('../images/pattern-1x.jpg') 1x,
  url('../images/pattern-2x.jpg') 2x,
  url('../images/pattern-3x.jpg') 3x
);
```

## Development

### Setup

```bash
npm install
npx playwright install chromium
```

Dependencies:
- `@playwright/test` - Automated testing
- `express` - Local server for tests
- `canvas` - Placeholder image generation (optional)

### Running Tests

```bash
npm test
```

### Regenerating Placeholder Images

To replace placeholder images with custom versions:

1. Modify `generate-images.js` (change colors, dimensions, labels)
2. Run: `node generate-images.js`

### Customization

To customize for your course:

1. **Replace placeholder images**: Update images in `images/` folder or modify `generate-images.js`
2. **Adjust rubric**: Edit the rubric section in `index.html`
3. **Modify breakpoints**: Update media query values in CSS and tests
4. **Add/remove exercises**: Update HTML structure and test suites

## Learning Outcomes

After completing this assignment, students will be able to:

- ✅ Choose the appropriate responsive image technique for different use cases
- ✅ Implement the `<picture>` element for art-directed responsive images
- ✅ Distinguish between `background-size: contain` and `cover`
- ✅ Apply responsive background images using media queries
- ✅ Implement `image-set()` for high-DPI display optimization
- ✅ Test responsive image implementations across different viewport sizes

## Notes for Instructors

### Exploratory Learning Approach

Instructions provide **learning objectives and hints** rather than step-by-step guidance. This encourages:
- Independent research and problem-solving
- Deeper understanding of concepts
- Practice with technical documentation (MDN, etc.)

### Automated Testing

Tests provide **immediate feedback** to students:
- Run tests locally before submission
- Iterate quickly based on test results
- Verify technical correctness independently

### Placeholder Images

Placeholder images are **solid-color JPGs with text labels**:
- Easy to identify which image is loading
- Small file sizes
- Can be replaced with subject-appropriate images

To maintain test compatibility, replacement images should keep the same filenames.

## Browser Compatibility

This assignment targets **modern browsers** (2020+):
- No vendor prefixes required for `image-set()`
- Picture element widely supported
- CSS3 media queries supported

## License

ISC
