const { test, expect } = require('@playwright/test');
const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// Allow testing of either index.html (student) or solution.html (instructor)
// Set TEST_FILE=solution to test the solution file
const testFile = process.env.TEST_FILE || 'index';

// Serve the specified HTML file as the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', `${testFile}.html`));
});

// Serve all other static files normally
app.use(express.static('./'))


test.describe('Exercise 1: Picture Element', () => {

    // Setup the server
    test.beforeAll(async () => {
        await app.listen(port)
        console.log(`Testing ${testFile}.html`);
    });

    // Loads correct medium image 
    test('Medium viewport loads art-medium.jpg', async ({ page }) => {
        await page.setViewportSize({
            width: 700,
            height: 900,
        });           
        await page.goto(`http://localhost:${port}/`);
        const img = page.locator('aside > picture > img');
        await expect(img).toHaveJSProperty('currentSrc', `http://localhost:${port}/images/art-medium.jpg`);
    });


    // Loads correct large image 
    test('Large viewport loads art-large.jpg', async ({ page }) => {
        await page.setViewportSize({
            width: 1000,
            height: 900,
        });        
        await page.goto(`http://localhost:${port}/`);
        const img = page.locator('aside > picture > img');
        await expect(img).toHaveJSProperty('currentSrc', `http://localhost:${port}/images/art-large.jpg`);
    });



    // Loads correct XL image 
    test('Extra Large viewport loads art-extra-large.jpg', async ({ page }) => {
        await page.setViewportSize({
            width: 1200,
            height: 900,
        });        
        await page.goto(`http://localhost:${port}/`);
        const img = page.locator('aside > picture > img');
        await expect(img).toHaveJSProperty('currentSrc', `http://localhost:${port}/images/art-extra-large.jpg`);
    });    
});


test.describe('Exercise 2: Background-Size (Contain vs Cover)', () => {

    test.beforeAll(async () => {
        // Server already started in previous test suite
    });

    test('Contain demo has background-size: contain', async ({ page }) => {
        await page.goto(`http://localhost:${port}/`);
        const containDemo = page.locator('.bg-contain-demo');
        
        const backgroundSize = await containDemo.evaluate(el => {
            return window.getComputedStyle(el).backgroundSize;
        });
        
        expect(backgroundSize).toBe('contain');
    });

    test('Cover demo has background-size: cover', async ({ page }) => {
        await page.goto(`http://localhost:${port}/`);
        const coverDemo = page.locator('.bg-cover-demo');
        
        const backgroundSize = await coverDemo.evaluate(el => {
            return window.getComputedStyle(el).backgroundSize;
        });
        
        expect(backgroundSize).toBe('cover');
    });

    test('Both demos have background-position: center', async ({ page }) => {
        await page.goto(`http://localhost:${port}/`);
        
        const containPosition = await page.locator('.bg-contain-demo').evaluate(el => {
            return window.getComputedStyle(el).backgroundPosition;
        });
        
        const coverPosition = await page.locator('.bg-cover-demo').evaluate(el => {
            return window.getComputedStyle(el).backgroundPosition;
        });
        
        expect(containPosition).toContain('50%');
        expect(coverPosition).toContain('50%');
    });

    test('Both demos have background-repeat: no-repeat', async ({ page }) => {
        await page.goto(`http://localhost:${port}/`);
        
        const containRepeat = await page.locator('.bg-contain-demo').evaluate(el => {
            return window.getComputedStyle(el).backgroundRepeat;
        });
        
        const coverRepeat = await page.locator('.bg-cover-demo').evaluate(el => {
            return window.getComputedStyle(el).backgroundRepeat;
        });
        
        expect(containRepeat).toBe('no-repeat');
        expect(coverRepeat).toBe('no-repeat');
    });

    test('Small viewport loads bg-small.jpg or bg-medium.jpg', async ({ page }) => {
        await page.setViewportSize({
            width: 600,
            height: 800,
        });
        await page.goto(`http://localhost:${port}/`);
        
        const bgImage = await page.locator('.bg-contain-demo').evaluate(el => {
            return window.getComputedStyle(el).backgroundImage;
        });
        
        const hasBgImage = bgImage.includes('bg-small.jpg') || bgImage.includes('bg-medium.jpg');
        expect(hasBgImage).toBeTruthy();
    });

    test('Medium viewport loads bg-medium.jpg', async ({ page }) => {
        await page.setViewportSize({
            width: 800,
            height: 900,
        });
        await page.goto(`http://localhost:${port}/`);
        
        const bgImage = await page.locator('.bg-contain-demo').evaluate(el => {
            return window.getComputedStyle(el).backgroundImage;
        });
        
        expect(bgImage).toContain('bg-medium.jpg');
    });

    test('Large viewport loads bg-large.jpg', async ({ page }) => {
        await page.setViewportSize({
            width: 1100,
            height: 900,
        });
        await page.goto(`http://localhost:${port}/`);
        
        const bgImage = await page.locator('.bg-contain-demo').evaluate(el => {
            return window.getComputedStyle(el).backgroundImage;
        });
        
        expect(bgImage).toContain('bg-large.jpg');
    });
});


test.describe('Exercise 3: Image-Set for High-DPI Displays', () => {

    test.beforeAll(async () => {
        // Server already started in first test suite
    });

    test('Image-set demo has background-image defined', async ({ page }) => {
        await page.goto(`http://localhost:${port}/`);
        const imageSetDemo = page.locator('.image-set-demo');
        
        const bgImage = await imageSetDemo.evaluate(el => {
            return window.getComputedStyle(el).backgroundImage;
        });
        
        expect(bgImage).not.toBe('none');
        expect(bgImage).toContain('url');
    });

    test('Image-set uses pattern images', async ({ page }) => {
        await page.goto(`http://localhost:${port}/`);
        const imageSetDemo = page.locator('.image-set-demo');
        
        const bgImage = await imageSetDemo.evaluate(el => {
            return window.getComputedStyle(el).backgroundImage;
        });
        
        const hasPatternImage = bgImage.includes('pattern-1x.jpg') || 
                                bgImage.includes('pattern-2x.jpg') || 
                                bgImage.includes('pattern-3x.jpg');
        
        expect(hasPatternImage).toBeTruthy();
    });

    test('Image-set demo is visible', async ({ page }) => {
        await page.goto(`http://localhost:${port}/`);
        const imageSetDemo = page.locator('.image-set-demo');
        
        await expect(imageSetDemo).toBeVisible();
    });
});

