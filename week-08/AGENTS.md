# Project Context for AI Agents

## Project Overview

This is a responsive web design **educational assignment** for teaching students three complementary image techniques:
1. HTML `<picture>` element with media queries
2. CSS `background-size: contain` vs `cover`
3. CSS `image-set()` for high-DPI displays

**Key Constraint**: All exercises must remain on a single HTML page (`index.html`).

## Design System

### Tailwind CSS Integration
Both `index.html` and `solution.html` use Tailwind CSS v3.x for modern styling:

**Implementation**:
- Delivered via CDN: `https://cdn.tailwindcss.com`
- Custom configuration with theme colors:
  - `primary`: #698b9c (teal-gray for main branding)
  - `secondary`: #9B59B6 (purple for Exercise 3 accent)

**Layout Structure**:
- Gradient background: `bg-gradient-to-b from-cyan-50 to-blue-50`
- Centered container: `max-w-7xl mx-auto` with responsive padding
- Card-based design: White `rounded-xl shadow-lg` cards for each section

**Key Design Patterns**:
1. **Exercise Sections**: Numbered circular badges (1, 2, 3) with corresponding colors (blue, green, purple)
2. **Rubric Cards**: Responsive grid `md:grid-cols-2` with gradient backgrounds matching exercise colors
3. **Picture Placeholder**: Visual helper with SVG icon, dashed border (`border-dashed`), and centered flex layout
4. **Demo Containers**: Tailwind grid for background demos `grid md:grid-cols-2 gap-6`
5. **Hint Boxes**: Border-left accent with gradient backgrounds for visual emphasis

**Critical CSS Classes** (preserved for test compatibility):
- `.picture-placeholder` - Container for Exercise 1 picture element
- `.bg-contain-demo` - Exercise 2 contain demonstration
- `.bg-cover-demo` - Exercise 2 cover demonstration
- `.image-set-demo` - Exercise 3 image-set container
- `.demo-label` - Absolute positioned labels on demo containers

**Custom CSS** (`css/main.css`):
- Tailwind handles all typography, spacing, colors, and layout
- Custom CSS retained only for:
  - Demo container borders and minimum heights
  - Background properties (student work area)
  - Demo label positioning (absolute within containers)

**Why Tailwind**:
- Modern, professional appearance
- Responsive design utilities out-of-box
- Consistent spacing/sizing system
- Easy to customize while maintaining visual coherence
- Reduces custom CSS needed for layout/styling

**Important**: When modifying HTML structure, preserve the semantic class names (`.bg-contain-demo`, etc.) as tests depend on these selectors.

## Project Structure

### Student Files (Distributed to Students)
- `index.html` - Assignment page with rubric, instructions, and exercise sections
- `css/main.css` - CSS scaffolding with TODO comments for student work
- `images/` - 9 JPG images (3 for each exercise)
- `tests/picture-element.spec.js` - 13 Playwright tests for verification

### Instructor Files (Not for Students)
- `solution.html` - Complete HTML with picture element implemented
- `css/solution.css` - Complete CSS with all exercises solved
- `generate-images.js` - Node.js script to regenerate placeholder images
- `INSTRUCTOR-NOTES.md` - Quick reference guide for grading and common issues

### Documentation
- `README.md` - Current state documentation
- `AGENTS.md` - This file

## Exercise Details

### Exercise 1: Picture Element
- **Location**: `<aside class="picture-placeholder">` element in `index.html`
- **Student Task**: Add `<picture>` element with two `<source>` elements and fallback `<img>`
- **Visual Helper**: Placeholder box with SVG image icon, dashed border, and clear instructions text
- **Breakpoints**: 945px (large), 1100px (extra large)
- **Images**: `art-medium.jpg`, `art-large.jpg`, `art-extra-large.jpg`
- **Tests**: 3 tests verify correct image at viewports 700px, 1000px, 1200px
- **Note**: Placeholder is styled with Tailwind and custom CSS for min-height, flex centering

### Exercise 2: Background-Size
- **Location**: `css/main.css`
- **Student Task**: Style `.bg-contain-demo` and `.bg-cover-demo` classes
- **Required Properties**: 
  - `background-size: contain` or `cover`
  - `background-position: center`
  - `background-repeat: no-repeat`
  - `background-image` switching at 700px, 1000px breakpoints
- **Images**: `bg-small.jpg`, `bg-medium.jpg`, `bg-large.jpg`
- **Tests**: 7 tests verify properties and responsive switching

### Exercise 3: Image-Set
- **Location**: `css/main.css`
- **Student Task**: Add `image-set()` to `.image-set-demo` class
- **Required**: Resolution descriptors 1x, 2x, 3x
- **Images**: `pattern-1x.jpg`, `pattern-2x.jpg`, `pattern-3x.jpg`
- **Tests**: 3 tests verify image-set implementation

## Important Breakpoints

- **700px**: bg-medium.jpg switches in (Exercise 2)
- **945px**: art-large.jpg displays (Exercise 1)
- **1000px**: bg-large.jpg switches in (Exercise 2)
- **1100px**: art-extra-large.jpg displays (Exercise 1)

**Note**: These breakpoints are used in both instructions AND tests. Changing them requires updating both.

## Testing

### Test Setup
- Framework: Playwright
- Server: Express on port 3000 (serves specified HTML file based on `TEST_FILE` env var)
- Browser: Chromium headless
- Structure: 3 test suites (one per exercise)
- **Testing flexibility**: Can test either `index.html` (student) or `solution.html` (instructor) via environment variable

### Running Tests
```bash
# Install dependencies
npm install
npx playwright install chromium

# Test student starter file (default - expects failures)
npm test
npm run test:student

# Test solution file (expects all 13 tests to pass)
npm run test:solution

# Custom testing (advanced)
TEST_FILE=solution npm test
```

### Expected Results
- **Student starter files** (`npm test`): 0/13 tests pass (all exercises incomplete)
- **Complete solution** (`npm run test:solution`): 13/13 tests pass

### Test Implementation Details
- Tests use `TEST_FILE` environment variable (defaults to `index`)
- Express serves `${TEST_FILE}.html` when root path `/` is requested
- No file swapping needed - same test suite works for both files
- Output shows which file is being tested: `Testing solution.html` or `Testing index.html`

### Test File Location
`tests/picture-element.spec.js`

## Image Assets

### Generation
Placeholder images created by `generate-images.js` using the `canvas` package:
- Solid color backgrounds with diagonal stripes
- Text labels showing size and purpose
- JPEG format, ~30-50KB each

### Replacement
To use custom images:
1. Replace files in `images/` directory
2. **Keep exact filenames** (tests expect these names)
3. Recommended: Keep similar aspect ratios or update tests

### Current Images
| Filename | Size | Purpose | Color |
|----------|------|---------|-------|
| art-medium.jpg | 800x600 | Picture fallback | N/A (original) |
| art-large.jpg | 1200x800 | Picture @945px | N/A (original) |
| art-extra-large.jpg | 1600x1200 | Picture @1100px | N/A (original) |
| bg-small.jpg | 600x400 | Background mobile | Blue (#4A90E2) |
| bg-medium.jpg | 800x600 | Background tablet | Green (#50C878) |
| bg-large.jpg | 1200x800 | Background desktop | Red (#E94B3C) |
| pattern-1x.jpg | 400x400 | Image-set 1x | Purple (#9B59B6) |
| pattern-2x.jpg | 800x800 | Image-set 2x | Purple (#9B59B6) |
| pattern-3x.jpg | 1200x1200 | Image-set 3x | Purple (#9B59B6) |

## Design Decisions

### Exploratory Learning
- **Instructions provide**: Learning objectives + hints
- **Instructions don't provide**: Step-by-step code
- **Rationale**: Encourages research, problem-solving, technical documentation skills

### Single Page Constraint
- All exercises on `index.html`
- Students modify both HTML and CSS
- **Rationale**: Simplifies assignment management, mimics real-world multi-technique implementation

### Modern Browser Target
- No vendor prefixes for `image-set()`
- Assumes 2020+ browser support
- **Rationale**: Focuses on current standards, avoids legacy complexity

### Automated Testing
- Tests visible to students
- Provides immediate feedback
- **Rationale**: Learning opportunity, encourages iteration

## Common Modifications

### Modifying Rubric Criteria
1. Edit assessment criteria in `index.html` rubric section
2. Update `README.md` grading information
3. Update `solution.html` rubric section to match

### Adding New Breakpoints
1. Update instructions in `index.html`
2. Update media queries in `css/solution.css`
3. **Critical**: Update viewport sizes in `tests/picture-element.spec.js`

### Adding Exercise 4
1. Add new section in `index.html` after Exercise 3
2. Add CSS scaffolding in `css/main.css`
3. Add test suite in `tests/picture-element.spec.js`
4. Generate/add required images
5. Update rubric point distribution
6. Update README technical details section

### Replacing Placeholder Images
1. Option A: Modify `generate-images.js` and run `node generate-images.js`
2. Option B: Replace files directly in `images/` folder
3. **Must keep**: Same filenames for test compatibility

### Converting to TypeScript Tests
1. Rename `picture-element.spec.js` to `picture-element.spec.ts`
2. Update `package.json` test script
3. Add `@types/node` dev dependency
4. Update Playwright config if needed

## File Relationships

```
index.html (student work)
├── references: images/ (all 9 images)
├── references: css/main.css
└── tested by: tests/picture-element.spec.js

css/main.css (student work)
├── scaffold from: css/solution.css (instructor reference)
└── tested by: tests/picture-element.spec.js

solution.html (instructor reference)
├── mirrors: index.html structure
├── references: css/solution.css
└── verified by: tests/ (when files swapped)

generate-images.js
└── generates: images/bg-*.jpg, images/pattern-*.jpg
```

## Critical Dependencies

**Runtime**:
- `@playwright/test` - Testing framework
- `express` - Test server

**Build/Development**:
- `canvas` - Image generation (optional, only for regenerating placeholders)

**Not Needed**:
- No bundler (plain HTML/CSS)
- No transpiler
- No CSS preprocessor

## Grading Automation

Tests provide **partial automation**:
- ✅ Automated: Technical correctness (image loading, CSS properties, breakpoints)
- ⚠️ Manual: Code quality, organization, commenting, semantics, aesthetics

Suggested workflow:
1. Run `npm test` to verify technical requirements
2. Manually review code for quality/style
3. Check HTML semantics and accessibility
4. Verify visual presentation in browser

## Browser DevTools Testing

Students should test using:
- Responsive design mode (Cmd/Ctrl + Shift + M)
- Device emulation for different pixel densities
- Network throttling to see image loading
- Lighthouse for performance insights (optional)

## Accessibility Considerations

**Currently Required**:
- Alt text on fallback `<img>` in Exercise 1

**Not Currently Required but Recommended**:
- ARIA labels on demo containers
- Sufficient color contrast in CSS
- Keyboard navigation support

## Performance Notes

**Image Optimization**:
- Placeholder images are already optimized (~30-50KB)
- If using real photos, recommend 80-90% JPEG quality
- Consider WebP format for future enhancement

**Loading Strategy**:
- Currently: Eager loading (default)
- Future enhancement: Add `loading="lazy"` to picture element

## Future Enhancement Ideas

Documented for consideration:
- Add WebP format support in `image-set()`
- Add `srcset` with density descriptors to Exercise 1
- Add lazy loading demonstration
- Add art direction (different crops for mobile/desktop)
- Add Lighthouse performance scoring
- Add picture element with `type` attribute for format selection
- Add CSS aspect-ratio property demonstration

## Troubleshooting Common Issues

### Tests Fail on Fresh Clone
**Cause**: Playwright browsers not installed
**Fix**: Run `npx playwright install chromium`

### All Tests Fail with "Cannot find picture element"
**Cause**: Student hasn't added picture element yet
**Expected**: This is normal for starter files

### Background Tests Pass but Images Don't Show
**Cause**: CSS properties correct but image paths wrong
**Fix**: Check `background-image: url('../images/filename.jpg')` path

### Image-Set Not Working in Browser
**Cause**: Older browser or vendor prefix needed
**Fix**: Check browser version, consider adding `-webkit-` prefix for older Safari

## Modification Workflow

When making changes:
1. **Always test solution** after modifications
2. **Run full test suite** to verify nothing broke
3. **Update documentation** (README, INSTRUCTOR-NOTES) if behavior changes
4. **Maintain backwards compatibility** with student files unless intentional breaking change
5. **Preserve filenames** for images to maintain test compatibility

## Contact Context

Assignment created for: UConn responsive web design curriculum
Target audience: Undergraduate students learning responsive web design
Typical course week: Mid-semester (after basic HTML/CSS, before JavaScript)
Expected completion time: 2-4 hours
