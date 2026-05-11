/**
 * Main JavaScript File
 * This file contains the primary JavaScript functionality for the website
 * Author: Performance Test Website
 * Date: 2026-03-30
 * Version: 1.0.0
 * 
 * This file is intentionally verbose and unminified to demonstrate
 * performance issues with large, unoptimized JavaScript files.
 * 
 * NOTE: This script is render-blocking and loaded in the <head> without
 * async or defer attributes, which is a major performance anti-pattern.
 */

// Immediately Invoked Function Expression to avoid global namespace pollution
(function() {
    'use strict';
    
    // ========================================================================
    // GLOBAL VARIABLES AND CONSTANTS
    // ========================================================================
    
    const ANIMATION_DURATION = 300;
    const SCROLL_THRESHOLD = 100;
    const MOBILE_BREAKPOINT = 768;
    
    let isScrolling = false;
    let scrollTimeout = null;
    let currentScrollPosition = 0;
    let previousScrollPosition = 0;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    
    // ========================================================================
    // DOM READY EVENT HANDLER
    // ========================================================================
    
    /**
     * Initialize all functionality when the DOM is fully loaded
     * This provides verbose logging for debugging purposes
     */
    function initializeApplication() {
        console.log('Application initializing...');
        console.log('Window width:', windowWidth);
        console.log('Window height:', windowHeight);
        
        // Initialize various components
        initializeNavigationMenu();
        initializeScrollEffects();
        initializeFormValidation();
        initializeSmoothScrolling();
        initializeBackToTopButton();
        initializeAnimationsOnScroll();
        initializeImageLazyLoading(); // This won't work since loading="eager"!
        initializePerformanceMonitoring();
        
        console.log('Application initialized successfully!');
    }
    
    // ========================================================================
    // NAVIGATION MENU FUNCTIONALITY
    // ========================================================================
    
    /**
     * Initialize the mobile navigation menu toggle functionality
     */
    function initializeNavigationMenu() {
        console.log('Initializing navigation menu...');
        
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mainNavigation = document.querySelector('.main-navigation');
        
        if (mobileMenuToggle && mainNavigation) {
            mobileMenuToggle.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                console.log('Mobile menu toggle clicked');
                
                // Toggle active class on button
                mobileMenuToggle.classList.toggle('active');
                
                // Toggle active class on navigation
                mainNavigation.classList.toggle('active');
                
                // Toggle body scroll lock
                if (mainNavigation.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                    console.log('Mobile menu opened');
                } else {
                    document.body.style.overflow = '';
                    console.log('Mobile menu closed');
                }
            });
            
            // Close menu when clicking on a link
            const navLinks = mainNavigation.querySelectorAll('.nav-menu-link');
            navLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    if (windowWidth <= MOBILE_BREAKPOINT) {
                        mobileMenuToggle.classList.remove('active');
                        mainNavigation.classList.remove('active');
                        document.body.style.overflow = '';
                        console.log('Mobile menu closed after link click');
                    }
                });
            });
        }
        
        console.log('Navigation menu initialized');
    }
    
    // ========================================================================
    // SCROLL EFFECTS
    // ========================================================================
    
    /**
     * Initialize scroll-based effects like header styling changes
     */
    function initializeScrollEffects() {
        console.log('Initializing scroll effects...');
        
        window.addEventListener('scroll', function() {
            currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            
            // Update header styling based on scroll position
            updateHeaderOnScroll();
            
            // Update back to top button visibility
            updateBackToTopButton();
            
            // Log scroll position occasionally (every 100px)
            if (Math.floor(currentScrollPosition / 100) !== Math.floor(previousScrollPosition / 100)) {
                console.log('Scroll position:', currentScrollPosition);
            }
            
            previousScrollPosition = currentScrollPosition;
        });
        
        console.log('Scroll effects initialized');
    }
    
    /**
     * Update header styling based on scroll position
     */
    function updateHeaderOnScroll() {
        const header = document.querySelector('.site-header');
        
        if (header) {
            if (currentScrollPosition > SCROLL_THRESHOLD) {
                if (!header.classList.contains('scrolled')) {
                    header.classList.add('scrolled');
                    console.log('Header scrolled state activated');
                }
            } else {
                if (header.classList.contains('scrolled')) {
                    header.classList.remove('scrolled');
                    console.log('Header scrolled state deactivated');
                }
            }
        }
    }
    
    // ========================================================================
    // FORM VALIDATION
    // ========================================================================
    
    /**
     * Initialize form validation for the contact form
     */
    function initializeFormValidation() {
        console.log('Initializing form validation...');
        
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                console.log('Form submission intercepted for validation');
                
                let isFormValid = true;
                const formData = new FormData(contactForm);
                
                // Validate each field
                for (let [fieldName, fieldValue] of formData.entries()) {
                    console.log('Validating field:', fieldName, 'Value:', fieldValue);
                    
                    if (!fieldValue || fieldValue.trim() === '') {
                        isFormValid = false;
                        console.error('Validation failed for field:', fieldName);
                        alert('Please fill in the ' + fieldName + ' field');
                        break;
                    }
                }
                
                if (isFormValid) {
                    console.log('Form validation passed!');
                    alert('Form submitted successfully! (This is a demo - no actual submission)');
                    contactForm.reset();
                } else {
                    console.error('Form validation failed');
                }
            });
        }
        
        console.log('Form validation initialized');
    }
    
    // ========================================================================
    // SMOOTH SCROLLING
    // ========================================================================
    
    /**
     * Initialize smooth scrolling for anchor links
     */
    function initializeSmoothScrolling() {
        console.log('Initializing smooth scrolling...');
        
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                const href = link.getAttribute('href');
                
                // Ignore empty hash or just "#"
                if (href === '#' || href === '') {
                    return;
                }
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    event.preventDefault();
                    console.log('Smooth scrolling to:', href);
                    
                    const targetPosition = targetElement.offsetTop - 80; // Account for fixed header
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        console.log('Smooth scrolling initialized');
    }
    
    // ========================================================================
    // BACK TO TOP BUTTON
    // ========================================================================
    
    /**
     * Initialize the back to top button functionality
     */
    function initializeBackToTopButton() {
        console.log('Initializing back to top button...');
        
        const backToTopButton = document.querySelector('.back-to-top');
        
        if (backToTopButton) {
            backToTopButton.addEventListener('click', function(event) {
                event.preventDefault();
                console.log('Back to top button clicked');
                
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        console.log('Back to top button initialized');
    }
    
    /**
     * Update back to top button visibility based on scroll position
     */
    function updateBackToTopButton() {
        const backToTopButton = document.querySelector('.back-to-top');
        
        if (backToTopButton) {
            if (currentScrollPosition > 500) {
                if (!backToTopButton.classList.contains('visible')) {
                    backToTopButton.classList.add('visible');
                }
            } else {
                if (backToTopButton.classList.contains('visible')) {
                    backToTopButton.classList.remove('visible');
                }
            }
        }
    }
    
    // ========================================================================
    // ANIMATIONS ON SCROLL
    // ========================================================================
    
    /**
     * Initialize animations that trigger when elements come into view
     */
    function initializeAnimationsOnScroll() {
        console.log('Initializing scroll animations...');
        
        const animatedElements = document.querySelectorAll('.animated');
        
        if (animatedElements.length > 0) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        console.log('Element entered viewport:', entry.target);
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animatedElements.forEach(function(element) {
                observer.observe(element);
            });
        }
        
        console.log('Scroll animations initialized');
    }
    
    // ========================================================================
    // LAZY LOADING (Won't work with loading="eager"!)
    // ========================================================================
    
    /**
     * Initialize lazy loading for images
     * NOTE: This won't actually work because all images have loading="eager"
     * This is intentionally ineffective code to demonstrate wasted resources
     */
    function initializeImageLazyLoading() {
        console.log('Initializing image lazy loading...');
        console.warn('WARNING: Images have loading="eager" - this lazy loading code is useless!');
        
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        console.log('Found', images.length, 'lazy-loading images (should be 0!)');
        
        if (images.length > 0) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        const imageSrc = image.getAttribute('data-src');
                        
                        if (imageSrc) {
                            image.src = imageSrc;
                            image.removeAttribute('data-src');
                            imageObserver.unobserve(image);
                            console.log('Lazy loaded image:', imageSrc);
                        }
                    }
                });
            });
            
            images.forEach(function(image) {
                imageObserver.observe(image);
            });
        }
        
        console.log('Image lazy loading initialized (but ineffective!)');
    }
    
    // ========================================================================
    // PERFORMANCE MONITORING
    // ========================================================================
    
    /**
     * Monitor and log performance metrics
     * This adds additional overhead but provides visibility into the poor performance
     */
    function initializePerformanceMonitoring() {
        console.log('Initializing performance monitoring...');
        
        // Log performance timing information
        window.addEventListener('load', function() {
            setTimeout(function() {
                if (window.performance && window.performance.timing) {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
                    const connectTime = perfData.responseEnd - perfData.requestStart;
                    
                    console.log('=== Performance Metrics ===');
                    console.log('Page Load Time:', pageLoadTime, 'ms');
                    console.log('DOM Ready Time:', domReadyTime, 'ms');
                    console.log('Connect Time:', connectTime, 'ms');
                    console.log('===========================');
                    
                    // Log resource timing
                    if (window.performance.getEntriesByType) {
                        const resources = window.performance.getEntriesByType('resource');
                        console.log('Total Resources Loaded:', resources.length);
                        
                        let totalSize = 0;
                        resources.forEach(function(resource) {
                            if (resource.transferSize) {
                                totalSize += resource.transferSize;
                            }
                            console.log('Resource:', resource.name, 'Duration:', resource.duration.toFixed(2), 'ms');
                        });
                        
                        console.log('Total Transfer Size:', (totalSize / 1024 / 1024).toFixed(2), 'MB');
                    }
                }
            }, 1000);
        });
        
        console.log('Performance monitoring initialized');
    }
    
    // ========================================================================
    // WINDOW RESIZE HANDLER
    // ========================================================================
    
    /**
     * Handle window resize events
     */
    window.addEventListener('resize', function() {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        
        console.log('Window resized to:', windowWidth, 'x', windowHeight);
        
        // Close mobile menu if window is resized above mobile breakpoint
        if (windowWidth > MOBILE_BREAKPOINT) {
            const mainNavigation = document.querySelector('.main-navigation');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            
            if (mainNavigation && mainNavigation.classList.contains('active')) {
                mainNavigation.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
                document.body.style.overflow = '';
                console.log('Mobile menu closed due to window resize');
            }
        }
    });
    
    // ========================================================================
    // INITIALIZATION
    // ========================================================================
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApplication);
    } else {
        // DOM is already ready
        initializeApplication();
    }
    
    // Also log when everything (including images) is fully loaded
    window.addEventListener('load', function() {
        console.log('All resources (including images) fully loaded!');
        console.log('This message appears late because of all the render-blocking resources!');
    });
    
})();


//analytics

window.WebsiteAnalytics = (function() {
    'use strict';
    
    // ========================================================================
    // ANALYTICS CONFIGURATION
    // ========================================================================
    
    const TRACKING_ID = 'UA-FAKE-123456';
    const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
    const BATCH_SIZE = 10;
    const SEND_INTERVAL = 5000; // 5 seconds
    
    let sessionId = null;
    let userId = null;
    let eventsQueue = [];
    let sendTimer = null;
    let pageLoadTime = null;
    let sessionStartTime = null;
    
    // ========================================================================
    // INITIALIZATION
    // ========================================================================
    
    /**
     * Initialize analytics tracking
     */
    function init() {
        console.log('Analytics: Initializing tracking system');
        console.log('Analytics: Tracking ID:', TRACKING_ID);
        
        // Generate or retrieve session ID
        sessionId = getSessionId();
        userId = getUserId();
        sessionStartTime = new Date().getTime();
        
        console.log('Analytics: Session ID:', sessionId);
        console.log('Analytics: User ID:', userId);
        
        // Track page load
        trackPageLoad();
        
        // Set up event listeners for automatic tracking
        setupEventListeners();
        
        // Start periodic sending of queued events
        startBatchSending();
        
        console.log('Analytics: Initialization complete');
    }
    
    /**
     * Get or create session ID
     * @returns {string} Session ID
     */
    function getSessionId() {
        let id = sessionStorage.getItem('analytics_session_id');
        
        if (!id) {
            id = generateUniqueId();
            sessionStorage.setItem('analytics_session_id', id);
            console.log('Analytics: Created new session ID:', id);
        } else {
            console.log('Analytics: Retrieved existing session ID:', id);
        }
        
        return id;
    }
    
    /**
     * Get or create user ID
     * @returns {string} User ID
     */
    function getUserId() {
        let id = localStorage.getItem('analytics_user_id');
        
        if (!id) {
            id = generateUniqueId();
            localStorage.setItem('analytics_user_id', id);
            console.log('Analytics: Created new user ID:', id);
        } else {
            console.log('Analytics: Retrieved existing user ID:', id);
        }
        
        return id;
    }
    
    /**
     * Generate a unique ID
     * @returns {string} Unique identifier
     */
    function generateUniqueId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    // ========================================================================
    // PAGE TRACKING
    // ========================================================================
    
    /**
     * Track page load event
     */
    function trackPageLoad() {
        const eventData = {
            eventType: 'pageview',
            page: window.location.pathname,
            title: document.title,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            screenResolution: window.screen.width + 'x' + window.screen.height,
            viewportSize: window.innerWidth + 'x' + window.innerHeight,
            language: navigator.language
        };
        
        console.log('Analytics: Tracking page view', eventData);
        queueEvent(eventData);
        
        // Also track performance metrics when available
        window.addEventListener('load', function() {
            setTimeout(trackPerformanceMetrics, 1000);
        });
    }
    
    /**
     * Track performance metrics
     */
    function trackPerformanceMetrics() {
        if (!window.performance || !window.performance.timing) {
            console.warn('Analytics: Performance API not available');
            return;
        }
        
        const perfData = window.performance.timing;
        pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        const performanceData = {
            eventType: 'performance',
            pageLoadTime: pageLoadTime,
            domReadyTime: perfData.domContentLoadedEventEnd - perfData.navigationStart,
            domInteractive: perfData.domInteractive - perfData.navigationStart,
            connectTime: perfData.responseEnd - perfData.requestStart,
            renderTime: perfData.domComplete - perfData.domLoading,
            timestamp: new Date().toISOString()
        };
        
        console.log('Analytics: Tracking performance metrics', performanceData);
        queueEvent(performanceData);
        
        // Track resource timings
        if (window.performance.getEntriesByType) {
            const resources = window.performance.getEntriesByType('resource');
            const resourceSummary = {
                eventType: 'resources',
                totalResources: resources.length,
                totalDuration: resources.reduce(function(sum, r) { return sum + r.duration; }, 0),
                timestamp: new Date().toISOString()
            };
            
            console.log('Analytics: Tracking resource metrics', resourceSummary);
            queueEvent(resourceSummary);
        }
    }
    
    // ========================================================================
    // EVENT TRACKING
    // ========================================================================
    
    /**
     * Track a custom event
     * @param {string} category - Event category
     * @param {string} action - Event action
     * @param {string} label - Event label (optional)
     * @param {number} value - Event value (optional)
     */
    function trackEvent(category, action, label, value) {
        const eventData = {
            eventType: 'event',
            category: category,
            action: action,
            label: label || '',
            value: value || 0,
            timestamp: new Date().toISOString()
        };
        
        console.log('Analytics: Tracking event', eventData);
        queueEvent(eventData);
    }
    
    /**
     * Track a click event
     * @param {HTMLElement} element - Clicked element
     */
    function trackClick(element) {
        const eventData = {
            eventType: 'click',
            elementType: element.tagName.toLowerCase(),
            elementId: element.id || '',
            elementClass: element.className || '',
            elementText: element.textContent ? element.textContent.substring(0, 100) : '',
            timestamp: new Date().toISOString()
        };
        
        console.log('Analytics: Tracking click', eventData);
        queueEvent(eventData);
    }
    
    /**
     * Track form submission
     * @param {HTMLFormElement} form - Submitted form
     */
    function trackFormSubmit(form) {
        const eventData = {
            eventType: 'form_submit',
            formId: form.id || '',
            formClass: form.className || '',
            formAction: form.action || '',
            timestamp: new Date().toISOString()
        };
        
        console.log('Analytics: Tracking form submission', eventData);
        queueEvent(eventData);
    }
    
    /**
     * Track scroll depth
     * @param {number} depth - Scroll depth percentage
     */
    function trackScrollDepth(depth) {
        const eventData = {
            eventType: 'scroll',
            depth: depth,
            timestamp: new Date().toISOString()
        };
        
        console.log('Analytics: Tracking scroll depth', depth + '%');
        queueEvent(eventData);
    }
    
    // ========================================================================
    // AUTOMATIC EVENT TRACKING
    // ========================================================================
    
    /**
     * Set up automatic event listeners
     */
    function setupEventListeners() {
        console.log('Analytics: Setting up automatic event tracking');
        
        // Track all clicks
        document.addEventListener('click', function(event) {
            if (event.target) {
                trackClick(event.target);
            }
        }, true);
        
        // Track form submissions
        document.addEventListener('submit', function(event) {
            if (event.target && event.target.tagName === 'FORM') {
                trackFormSubmit(event.target);
            }
        }, true);
        
        // Track scroll depth
        let maxScrollDepth = 0;
        const scrollMilestones = [25, 50, 75, 100];
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.round((scrollTop / docHeight) * 100);
            
            if (scrollPercent > maxScrollDepth) {
                maxScrollDepth = scrollPercent;
                
                scrollMilestones.forEach(function(milestone) {
                    if (scrollPercent >= milestone && maxScrollDepth < milestone + 1) {
                        trackScrollDepth(milestone);
                    }
                });
            }
        });
        
        // Track page visibility changes
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                trackEvent('engagement', 'page_hidden', '', 0);
            } else {
                trackEvent('engagement', 'page_visible', '', 0);
            }
        });
        
        // Track session end on page unload
        window.addEventListener('beforeunload', function() {
            const sessionDuration = new Date().getTime() - sessionStartTime;
            trackEvent('session', 'end', '', Math.round(sessionDuration / 1000));
            sendQueuedEvents(); // Try to send remaining events
        });
        
        console.log('Analytics: Automatic event tracking configured');
    }
    
    // ========================================================================
    // QUEUE MANAGEMENT
    // ========================================================================
    
    /**
     * Add event to queue
     * @param {Object} eventData - Event data
     */
    function queueEvent(eventData) {
        // Add common fields
        eventData.sessionId = sessionId;
        eventData.userId = userId;
        
        eventsQueue.push(eventData);
        console.log('Analytics: Event queued. Queue size:', eventsQueue.length);
        
        // Send immediately if queue is full
        if (eventsQueue.length >= BATCH_SIZE) {
            console.log('Analytics: Queue full, sending batch');
            sendQueuedEvents();
        }
    }
    
    /**
     * Send queued events to server
     */
    function sendQueuedEvents() {
        if (eventsQueue.length === 0) {
            return;
        }
        
        console.log('Analytics: Sending', eventsQueue.length, 'queued events');
        
        // In a real implementation, this would send to an analytics server
        // For this demo, we just log them
        console.log('Analytics: Events batch:', JSON.stringify(eventsQueue, null, 2));
        
        // Simulate network request
        console.log('Analytics: (Simulated network request - not actually sending)');
        
        // Clear queue
        eventsQueue = [];
    }
    
    /**
     * Start periodic batch sending
     */
    function startBatchSending() {
        sendTimer = setInterval(function() {
            if (eventsQueue.length > 0) {
                sendQueuedEvents();
            }
        }, SEND_INTERVAL);
        
        console.log('Analytics: Started batch sending with interval:', SEND_INTERVAL, 'ms');
    }
    
    // ========================================================================
    // PUBLIC API
    // ========================================================================
    
    return {
        init: init,
        trackEvent: trackEvent,
        trackPageView: trackPageLoad,
        track: trackEvent
    };
    
})();

// Auto-initialize analytics
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        WebsiteAnalytics.init();
    });
} else {
    WebsiteAnalytics.init();
}

console.log('Analytics module loaded');
console.log('WARNING: This analytics script is render-blocking!');

//carousel

window.ImageCarousel = (function() {
    'use strict';
    
    // ========================================================================
    // CAROUSEL CONFIGURATION
    // ========================================================================
    
    const DEFAULT_CONFIG = {
        autoplay: true,
        autoplayDelay: 5000,
        transitionDuration: 500,
        loop: true,
        showIndicators: true,
        showNavigation: true,
        pauseOnHover: true,
        swipeEnabled: true
    };
    
    // ========================================================================
    // CAROUSEL CLASS
    // ========================================================================
    
    /**
     * ImageCarousel class constructor
     * @param {HTMLElement} container - The carousel container element
     * @param {Object} options - Configuration options
     */
    function ImageCarousel(container, options) {
        if (!container) {
            console.error('ImageCarousel: Container element is required');
            return;
        }
        
        this.container = container;
        this.config = Object.assign({}, DEFAULT_CONFIG, options || {});
        this.slides = [];
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.autoplayTimer = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        console.log('ImageCarousel: Initializing carousel', this.config);
        
        this.init();
    }
    
    /**
     * Initialize the carousel
     */
    ImageCarousel.prototype.init = function() {
        console.log('ImageCarousel: Initialization started');
        
        // Find all slides
        this.slides = Array.from(this.container.querySelectorAll('.carousel-slide'));
        
        if (this.slides.length === 0) {
            console.warn('ImageCarousel: No slides found');
            return;
        }
        
        console.log('ImageCarousel: Found', this.slides.length, 'slides');
        
        // Set up initial state
        this.setupSlides();
        
        // Create navigation
        if (this.config.showNavigation) {
            this.createNavigation();
        }
        
        // Create indicators
        if (this.config.showIndicators) {
            this.createIndicators();
        }
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Start autoplay
        if (this.config.autoplay) {
            this.startAutoplay();
        }
        
        console.log('ImageCarousel: Initialization complete');
    };
    
    /**
     * Set up the initial state of slides
     */
    ImageCarousel.prototype.setupSlides = function() {
        console.log('ImageCarousel: Setting up slides');
        
        this.slides.forEach(function(slide, index) {
            slide.style.position = 'absolute';
            slide.style.top = '0';
            slide.style.left = '0';
            slide.style.width = '100%';
            slide.style.opacity = index === 0 ? '1' : '0';
            slide.style.transition = 'opacity ' + this.config.transitionDuration + 'ms ease';
            slide.setAttribute('data-slide-index', index);
        }.bind(this));
        
        this.container.style.position = 'relative';
    };
    
    /**
     * Create navigation buttons
     */
    ImageCarousel.prototype.createNavigation = function() {
        console.log('ImageCarousel: Creating navigation buttons');
        
        const prevButton = document.createElement('button');
        prevButton.className = 'carousel-nav carousel-nav-prev';
        prevButton.innerHTML = '‹';
        prevButton.setAttribute('aria-label', 'Previous slide');
        
        const nextButton = document.createElement('button');
        nextButton.className = 'carousel-nav carousel-nav-next';
        nextButton.innerHTML = '›';
        nextButton.setAttribute('aria-label', 'Next slide');
        
        this.container.appendChild(prevButton);
        this.container.appendChild(nextButton);
        
        prevButton.addEventListener('click', this.previous.bind(this));
        nextButton.addEventListener('click', this.next.bind(this));
    };
    
    /**
     * Create indicator dots
     */
    ImageCarousel.prototype.createIndicators = function() {
        console.log('ImageCarousel: Creating indicators');
        
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'carousel-indicators';
        
        for (let i = 0; i < this.slides.length; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            indicator.setAttribute('data-slide-index', i);
            indicator.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            
            if (i === 0) {
                indicator.classList.add('active');
            }
            
            indicator.addEventListener('click', function() {
                this.goToSlide(i);
            }.bind(this));
            
            indicatorsContainer.appendChild(indicator);
        }
        
        this.container.appendChild(indicatorsContainer);
    };
    
    /**
     * Set up event listeners
     */
    ImageCarousel.prototype.setupEventListeners = function() {
        console.log('ImageCarousel: Setting up event listeners');
        
        // Pause on hover
        if (this.config.pauseOnHover) {
            this.container.addEventListener('mouseenter', this.pauseAutoplay.bind(this));
            this.container.addEventListener('mouseleave', this.resumeAutoplay.bind(this));
        }
        
        // Touch/swipe support
        if (this.config.swipeEnabled) {
            this.container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
            this.container.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
        }
    };
    
    /**
     * Go to specific slide
     * @param {number} index - Slide index
     */
    ImageCarousel.prototype.goToSlide = function(index) {
        if (this.isTransitioning) {
            console.log('ImageCarousel: Transition in progress, ignoring request');
            return;
        }
        
        if (index < 0 || index >= this.slides.length) {
            console.warn('ImageCarousel: Invalid slide index', index);
            return;
        }
        
        if (index === this.currentIndex) {
            console.log('ImageCarousel: Already on slide', index);
            return;
        }
        
        console.log('ImageCarousel: Transitioning from slide', this.currentIndex, 'to', index);
        
        this.isTransitioning = true;
        
        const currentSlide = this.slides[this.currentIndex];
        const nextSlide = this.slides[index];
        
        // Fade out current slide
        currentSlide.style.opacity = '0';
        
        // Fade in next slide
        nextSlide.style.opacity = '1';
        
        // Update current index
        this.currentIndex = index;
        
        // Update indicators
        this.updateIndicators();
        
        // Reset transitioning flag after animation
        setTimeout(function() {
            this.isTransitioning = false;
            console.log('ImageCarousel: Transition complete');
        }.bind(this), this.config.transitionDuration);
    };
    
    /**
     * Go to next slide
     */
    ImageCarousel.prototype.next = function() {
        console.log('ImageCarousel: Next slide requested');
        
        let nextIndex = this.currentIndex + 1;
        
        if (nextIndex >= this.slides.length) {
            if (this.config.loop) {
                nextIndex = 0;
            } else {
                console.log('ImageCarousel: At last slide, not looping');
                return;
            }
        }
        
        this.goToSlide(nextIndex);
    };
    
    /**
     * Go to previous slide
     */
    ImageCarousel.prototype.previous = function() {
        console.log('ImageCarousel: Previous slide requested');
        
        let prevIndex = this.currentIndex - 1;
        
        if (prevIndex < 0) {
            if (this.config.loop) {
                prevIndex = this.slides.length - 1;
            } else {
                console.log('ImageCarousel: At first slide, not looping');
                return;
            }
        }
        
        this.goToSlide(prevIndex);
    };
    
    /**
     * Update indicator states
     */
    ImageCarousel.prototype.updateIndicators = function() {
        const indicators = this.container.querySelectorAll('.carousel-indicator');
        
        indicators.forEach(function(indicator, index) {
            if (index === this.currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        }.bind(this));
    };
    
    /**
     * Start autoplay
     */
    ImageCarousel.prototype.startAutoplay = function() {
        if (!this.config.autoplay) {
            return;
        }
        
        console.log('ImageCarousel: Starting autoplay');
        
        this.autoplayTimer = setInterval(function() {
            this.next();
        }.bind(this), this.config.autoplayDelay);
    };
    
    /**
     * Pause autoplay
     */
    ImageCarousel.prototype.pauseAutoplay = function() {
        if (this.autoplayTimer) {
            console.log('ImageCarousel: Pausing autoplay');
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    };
    
    /**
     * Resume autoplay
     */
    ImageCarousel.prototype.resumeAutoplay = function() {
        if (this.config.autoplay && !this.autoplayTimer) {
            console.log('ImageCarousel: Resuming autoplay');
            this.startAutoplay();
        }
    };
    
    /**
     * Handle touch start
     * @param {TouchEvent} event - Touch event
     */
    ImageCarousel.prototype.handleTouchStart = function(event) {
        this.touchStartX = event.changedTouches[0].screenX;
        console.log('ImageCarousel: Touch start at', this.touchStartX);
    };
    
    /**
     * Handle touch end
     * @param {TouchEvent} event - Touch event
     */
    ImageCarousel.prototype.handleTouchEnd = function(event) {
        this.touchEndX = event.changedTouches[0].screenX;
        console.log('ImageCarousel: Touch end at', this.touchEndX);
        this.handleSwipe();
    };
    
    /**
     * Handle swipe gesture
     */
    ImageCarousel.prototype.handleSwipe = function() {
        const swipeThreshold = 50;
        const swipeDistance = this.touchEndX - this.touchStartX;
        
        if (Math.abs(swipeDistance) < swipeThreshold) {
            console.log('ImageCarousel: Swipe distance too small');
            return;
        }
        
        if (swipeDistance > 0) {
            console.log('ImageCarousel: Swipe right detected');
            this.previous();
        } else {
            console.log('ImageCarousel: Swipe left detected');
            this.next();
        }
    };
    
    /**
     * Destroy the carousel and clean up
     */
    ImageCarousel.prototype.destroy = function() {
        console.log('ImageCarousel: Destroying carousel');
        
        this.pauseAutoplay();
        
        // Remove created elements
        const navButtons = this.container.querySelectorAll('.carousel-nav');
        const indicators = this.container.querySelector('.carousel-indicators');
        
        navButtons.forEach(function(button) {
            button.remove();
        });
        
        if (indicators) {
            indicators.remove();
        }
        
        // Reset slide styles
        this.slides.forEach(function(slide) {
            slide.style.position = '';
            slide.style.top = '';
            slide.style.left = '';
            slide.style.width = '';
            slide.style.opacity = '';
            slide.style.transition = '';
            slide.removeAttribute('data-slide-index');
        });
        
        console.log('ImageCarousel: Destruction complete');
    };
    
    // ========================================================================
    // PUBLIC API
    // ========================================================================
    
    return ImageCarousel;
    
})();

// Log that carousel is loaded
console.log('Image Carousel module loaded successfully!');
console.warn('WARNING: This carousel code is loaded but not actually used on the page!');

//utils

window.WebsiteUtils = (function() {
    'use strict';
    
    // ========================================================================
    // STRING UTILITIES
    // ========================================================================
    
    /**
     * Capitalize the first letter of a string
     * @param {string} str - The input string
     * @returns {string} The capitalized string
     */
    function capitalizeFirstLetter(str) {
        if (!str || typeof str !== 'string') {
            console.warn('capitalizeFirstLetter: Invalid input');
            return '';
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    /**
     * Convert a string to title case
     * @param {string} str - The input string
     * @returns {string} The title cased string
     */
    function toTitleCase(str) {
        if (!str || typeof str !== 'string') {
            console.warn('toTitleCase: Invalid input');
            return '';
        }
        return str.toLowerCase().split(' ').map(function(word) {
            return capitalizeFirstLetter(word);
        }).join(' ');
    }
    
    /**
     * Truncate a string to a specified length
     * @param {string} str - The input string
     * @param {number} maxLength - Maximum length
     * @param {string} suffix - Suffix to add if truncated (default: '...')
     * @returns {string} The truncated string
     */
    function truncateString(str, maxLength, suffix) {
        suffix = suffix || '...';
        
        if (!str || typeof str !== 'string') {
            console.warn('truncateString: Invalid input');
            return '';
        }
        
        if (str.length <= maxLength) {
            return str;
        }
        
        return str.substring(0, maxLength - suffix.length) + suffix;
    }
    
    /**
     * Remove HTML tags from a string
     * @param {string} str - The input string
     * @returns {string} The string without HTML tags
     */
    function stripHtmlTags(str) {
        if (!str || typeof str !== 'string') {
            console.warn('stripHtmlTags: Invalid input');
            return '';
        }
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = str;
        return tempDiv.textContent || tempDiv.innerText || '';
    }
    
    // ========================================================================
    // ARRAY UTILITIES
    // ========================================================================
    
    /**
     * Shuffle an array randomly
     * @param {Array} array - The input array
     * @returns {Array} A new shuffled array
     */
    function shuffleArray(array) {
        if (!Array.isArray(array)) {
            console.warn('shuffleArray: Input is not an array');
            return [];
        }
        
        const shuffled = array.slice();
        
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
        }
        
        return shuffled;
    }
    
    /**
     * Get unique values from an array
     * @param {Array} array - The input array
     * @returns {Array} Array with unique values only
     */
    function getUniqueValues(array) {
        if (!Array.isArray(array)) {
            console.warn('getUniqueValues: Input is not an array');
            return [];
        }
        
        return array.filter(function(value, index, self) {
            return self.indexOf(value) === index;
        });
    }
    
    /**
     * Chunk an array into smaller arrays of specified size
     * @param {Array} array - The input array
     * @param {number} size - The chunk size
     * @returns {Array} Array of chunks
     */
    function chunkArray(array, size) {
        if (!Array.isArray(array)) {
            console.warn('chunkArray: Input is not an array');
            return [];
        }
        
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }
    
    // ========================================================================
    // NUMBER UTILITIES
    // ========================================================================
    
    /**
     * Format a number with thousands separators
     * @param {number} num - The input number
     * @returns {string} Formatted number string
     */
    function formatNumber(num) {
        if (typeof num !== 'number' && typeof num !== 'string') {
            console.warn('formatNumber: Invalid input');
            return '0';
        }
        
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    /**
     * Generate a random number between min and max
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random number
     */
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    /**
     * Round a number to specified decimal places
     * @param {number} num - The input number
     * @param {number} decimals - Number of decimal places
     * @returns {number} Rounded number
     */
    function roundToDecimals(num, decimals) {
        const multiplier = Math.pow(10, decimals);
        return Math.round(num * multiplier) / multiplier;
    }
    
    // ========================================================================
    // DATE UTILITIES
    // ========================================================================
    
    /**
     * Format a date object to a readable string
     * @param {Date} date - The input date
     * @param {string} format - Format string (default: 'YYYY-MM-DD')
     * @returns {string} Formatted date string
     */
    function formatDate(date, format) {
        if (!(date instanceof Date) || isNaN(date)) {
            console.warn('formatDate: Invalid date');
            return '';
        }
        
        format = format || 'YYYY-MM-DD';
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
    }
    
    /**
     * Get the difference between two dates in days
     * @param {Date} date1 - First date
     * @param {Date} date2 - Second date
     * @returns {number} Number of days difference
     */
    function getDaysDifference(date1, date2) {
        if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
            console.warn('getDaysDifference: Invalid dates');
            return 0;
        }
        
        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
        return Math.round(Math.abs((date1 - date2) / oneDay));
    }
    
    // ========================================================================
    // DOM UTILITIES
    // ========================================================================
    
    /**
     * Add a class to an element
     * @param {HTMLElement} element - The DOM element
     * @param {string} className - The class name to add
     */
    function addClass(element, className) {
        if (!element || !className) {
            console.warn('addClass: Invalid parameters');
            return;
        }
        
        if (element.classList) {
            element.classList.add(className);
        } else {
            element.className += ' ' + className;
        }
    }
    
    /**
     * Remove a class from an element
     * @param {HTMLElement} element - The DOM element
     * @param {string} className - The class name to remove
     */
    function removeClass(element, className) {
        if (!element || !className) {
            console.warn('removeClass: Invalid parameters');
            return;
        }
        
        if (element.classList) {
            element.classList.remove(className);
        } else {
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }
    
    /**
     * Toggle a class on an element
     * @param {HTMLElement} element - The DOM element
     * @param {string} className - The class name to toggle
     */
    function toggleClass(element, className) {
        if (!element || !className) {
            console.warn('toggleClass: Invalid parameters');
            return;
        }
        
        if (element.classList) {
            element.classList.toggle(className);
        } else {
            if (element.className.indexOf(className) >= 0) {
                removeClass(element, className);
            } else {
                addClass(element, className);
            }
        }
    }
    
    /**
     * Check if an element has a specific class
     * @param {HTMLElement} element - The DOM element
     * @param {string} className - The class name to check
     * @returns {boolean} True if element has the class
     */
    function hasClass(element, className) {
        if (!element || !className) {
            console.warn('hasClass: Invalid parameters');
            return false;
        }
        
        if (element.classList) {
            return element.classList.contains(className);
        } else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
    }
    
    // ========================================================================
    // LOCAL STORAGE UTILITIES
    // ========================================================================
    
    /**
     * Save data to localStorage
     * @param {string} key - The storage key
     * @param {*} value - The value to store
     */
    function saveToStorage(key, value) {
        if (!key) {
            console.warn('saveToStorage: Key is required');
            return;
        }
        
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(key, serialized);
            console.log('Saved to storage:', key);
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }
    
    /**
     * Retrieve data from localStorage
     * @param {string} key - The storage key
     * @returns {*} The stored value or null
     */
    function getFromStorage(key) {
        if (!key) {
            console.warn('getFromStorage: Key is required');
            return null;
        }
        
        try {
            const serialized = localStorage.getItem(key);
            if (serialized === null) {
                return null;
            }
            return JSON.parse(serialized);
        } catch (error) {
            console.error('Error reading from storage:', error);
            return null;
        }
    }
    
    /**
     * Remove data from localStorage
     * @param {string} key - The storage key
     */
    function removeFromStorage(key) {
        if (!key) {
            console.warn('removeFromStorage: Key is required');
            return;
        }
        
        try {
            localStorage.removeItem(key);
            console.log('Removed from storage:', key);
        } catch (error) {
            console.error('Error removing from storage:', error);
        }
    }
    
    // ========================================================================
    // VALIDATION UTILITIES
    // ========================================================================
    
    /**
     * Validate an email address
     * @param {string} email - The email address to validate
     * @returns {boolean} True if valid
     */
    function isValidEmail(email) {
        if (!email || typeof email !== 'string') {
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Validate a URL
     * @param {string} url - The URL to validate
     * @returns {boolean} True if valid
     */
    function isValidUrl(url) {
        if (!url || typeof url !== 'string') {
            return false;
        }
        
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }
    
    /**
     * Validate a phone number (basic validation)
     * @param {string} phone - The phone number to validate
     * @returns {boolean} True if valid
     */
    function isValidPhone(phone) {
        if (!phone || typeof phone !== 'string') {
            return false;
        }
        
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    // ========================================================================
    // PUBLIC API
    // ========================================================================
    
    return {
        // String utilities
        capitalizeFirstLetter: capitalizeFirstLetter,
        toTitleCase: toTitleCase,
        truncateString: truncateString,
        stripHtmlTags: stripHtmlTags,
        
        // Array utilities
        shuffleArray: shuffleArray,
        getUniqueValues: getUniqueValues,
        chunkArray: chunkArray,
        
        // Number utilities
        formatNumber: formatNumber,
        getRandomNumber: getRandomNumber,
        roundToDecimals: roundToDecimals,
        
        // Date utilities
        formatDate: formatDate,
        getDaysDifference: getDaysDifference,
        
        // DOM utilities
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        hasClass: hasClass,
        
        // Storage utilities
        saveToStorage: saveToStorage,
        getFromStorage: getFromStorage,
        removeFromStorage: removeFromStorage,
        
        // Validation utilities
        isValidEmail: isValidEmail,
        isValidUrl: isValidUrl,
        isValidPhone: isValidPhone
    };
    
})();

// Log that utilities are loaded
console.log('Website utilities loaded successfully!');
console.log('Available utilities:', Object.keys(window.WebsiteUtils));


//other

var ShoppingCart = {
    
    items: [],
    totalPrice: 0,
    
    /**
     * Add item to cart
     * @param {Object} productItem - Product to add
     */
    addItemToCart: function(productItem) {
        console.log('Adding item to cart:', productItem);
        
        var existingItemIndex = -1;
        
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === productItem.id) {
                existingItemIndex = i;
                break;
            }
        }
        
        if (existingItemIndex !== -1) {
            this.items[existingItemIndex].quantity += 1;
            console.log('Increased quantity of existing item');
        } else {
            this.items.push({
                id: productItem.id,
                name: productItem.name,
                price: productItem.price,
                quantity: 1
            });
            console.log('Added new item to cart');
        }
        
        this.calculateTotalPrice();
        this.updateCartDisplay();
    },
    
    /**
     * Remove item from cart
     * @param {string} productId - ID of product to remove
     */
    removeItemFromCart: function(productId) {
        console.log('Removing item from cart:', productId);
        
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === productId) {
                this.items.splice(i, 1);
                console.log('Item removed');
                break;
            }
        }
        
        this.calculateTotalPrice();
        this.updateCartDisplay();
    },
    
    /**
     * Calculate total price
     */
    calculateTotalPrice: function() {
        this.totalPrice = 0;
        
        for (var i = 0; i < this.items.length; i++) {
            this.totalPrice += this.items[i].price * this.items[i].quantity;
        }
        
        console.log('Total price calculated:', this.totalPrice);
    },
    
    /**
     * Update cart display
     */
    updateCartDisplay: function() {
        console.log('Updating cart display');
        // This would update the UI in a real implementation
    },
    
    /**
     * Clear cart
     */
    clearCart: function() {
        console.log('Clearing cart');
        this.items = [];
        this.totalPrice = 0;
        this.updateCartDisplay();
    }
};

/**
 * Video player functionality (not used - no videos on this site!)
 * @namespace
 */
var CustomVideoPlayer = {
    
    videoElement: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1.0,
    
    /**
     * Initialize video player
     * @param {string} videoSelector - CSS selector for video element
     */
    initialize: function(videoSelector) {
        console.log('Initializing video player for:', videoSelector);
        
        this.videoElement = document.querySelector(videoSelector);
        
        if (!this.videoElement) {
            console.error('Video element not found');
            return;
        }
        
        this.setupEventListeners();
        this.createCustomControls();
        
        console.log('Video player initialized');
    },
    
    /**
     * Setup event listeners
     */
    setupEventListeners: function() {
        var self = this;
        
        this.videoElement.addEventListener('play', function() {
            self.isPlaying = true;
            console.log('Video playing');
        });
        
        this.videoElement.addEventListener('pause', function() {
            self.isPlaying = false;
            console.log('Video paused');
        });
        
        this.videoElement.addEventListener('timeupdate', function() {
            self.currentTime = this.currentTime;
        });
        
        this.videoElement.addEventListener('loadedmetadata', function() {
            self.duration = this.duration;
            console.log('Video duration:', self.duration);
        });
    },
    
    /**
     * Create custom controls
     */
    createCustomControls: function() {
        console.log('Creating custom video controls');
        // This would create UI controls in a real implementation
    },
    
    /**
     * Play video
     */
    play: function() {
        console.log('Playing video');
        this.videoElement.play();
    },
    
    /**
     * Pause video
     */
    pause: function() {
        console.log('Pausing video');
        this.videoElement.pause();
    },
    
    /**
     * Toggle play/pause
     */
    togglePlayPause: function() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    },
    
    /**
     * Seek to time
     * @param {number} timeInSeconds - Time to seek to
     */
    seekTo: function(timeInSeconds) {
        console.log('Seeking to:', timeInSeconds);
        this.videoElement.currentTime = timeInSeconds;
    },
    
    /**
     * Set volume
     * @param {number} volumeLevel - Volume level (0-1)
     */
    setVolume: function(volumeLevel) {
        console.log('Setting volume to:', volumeLevel);
        this.volume = Math.max(0, Math.min(1, volumeLevel));
        this.videoElement.volume = this.volume;
    }
};

/**
 * Chat widget functionality (not used - no chat on this site!)
 * @namespace
 */
var ChatWidget = {
    
    isOpen: false,
    messages: [],
    
    /**
     * Initialize chat widget
     */
    initialize: function() {
        console.log('Initializing chat widget');
        this.createChatInterface();
        this.setupEventHandlers();
        console.log('Chat widget initialized');
    },
    
    /**
     * Create chat interface
     */
    createChatInterface: function() {
        console.log('Creating chat interface');
        // This would create the chat UI in a real implementation
    },
    
    /**
     * Setup event handlers
     */
    setupEventHandlers: function() {
        console.log('Setting up chat event handlers');
        // This would setup event listeners in a real implementation
    },
    
    /**
     * Open chat widget
     */
    open: function() {
        console.log('Opening chat widget');
        this.isOpen = true;
    },
    
    /**
     * Close chat widget
     */
    close: function() {
        console.log('Closing chat widget');
        this.isOpen = false;
    },
    
    /**
     * Send message
     * @param {string} messageText - Message to send
     */
    sendMessage: function(messageText) {
        console.log('Sending message:', messageText);
        
        this.messages.push({
            text: messageText,
            timestamp: new Date(),
            sender: 'user'
        });
        
        // Simulate bot response
        setTimeout(function() {
            ChatWidget.receiveMessage('Thank you for your message!');
        }, 1000);
    },
    
    /**
     * Receive message
     * @param {string} messageText - Message received
     */
    receiveMessage: function(messageText) {
        console.log('Receiving message:', messageText);
        
        this.messages.push({
            text: messageText,
            timestamp: new Date(),
            sender: 'bot'
        });
    }
};

/**
 * Data visualization functions (not used - no charts on this site!)
 * @namespace
 */
var DataVisualization = {
    
    /**
     * Create bar chart
     * @param {string} containerSelector - CSS selector for container
     * @param {Array} dataPoints - Data to visualize
     */
    createBarChart: function(containerSelector, dataPoints) {
        console.log('Creating bar chart in:', containerSelector);
        console.log('Data points:', dataPoints);
        
        // This would create a bar chart in a real implementation
        console.log('Bar chart created (simulated)');
    },
    
    /**
     * Create line chart
     * @param {string} containerSelector - CSS selector for container
     * @param {Array} dataPoints - Data to visualize
     */
    createLineChart: function(containerSelector, dataPoints) {
        console.log('Creating line chart in:', containerSelector);
        console.log('Data points:', dataPoints);
        
        // This would create a line chart in a real implementation
        console.log('Line chart created (simulated)');
    },
    
    /**
     * Create pie chart
     * @param {string} containerSelector - CSS selector for container
     * @param {Array} dataPoints - Data to visualize
     */
    createPieChart: function(containerSelector, dataPoints) {
        console.log('Creating pie chart in:', containerSelector);
        console.log('Data points:', dataPoints);
        
        // This would create a pie chart in a real implementation
        console.log('Pie chart created (simulated)');
    }
};

/**
 * Social media sharing functions (not used!)
 * @namespace
 */
var SocialMediaSharing = {
    
    /**
     * Share on Facebook
     * @param {string} urlToShare - URL to share
     */
    shareOnFacebook: function(urlToShare) {
        console.log('Sharing on Facebook:', urlToShare);
        var facebookShareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(urlToShare);
        window.open(facebookShareUrl, '_blank', 'width=600,height=400');
    },
    
    /**
     * Share on Twitter
     * @param {string} urlToShare - URL to share
     * @param {string} tweetText - Tweet text
     */
    shareOnTwitter: function(urlToShare, tweetText) {
        console.log('Sharing on Twitter:', urlToShare);
        var twitterShareUrl = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(urlToShare) + '&text=' + encodeURIComponent(tweetText);
        window.open(twitterShareUrl, '_blank', 'width=600,height=400');
    },
    
    /**
     * Share on LinkedIn
     * @param {string} urlToShare - URL to share
     */
    shareOnLinkedIn: function(urlToShare) {
        console.log('Sharing on LinkedIn:', urlToShare);
        var linkedInShareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(urlToShare);
        window.open(linkedInShareUrl, '_blank', 'width=600,height=400');
    }
};

// Log when unused script file has loaded
console.log('Unused-script.js file has loaded successfully');
console.log('This file contains code that is never used on the page - wasting bandwidth and parse time!');

// Page load complete
        console.log('Page fully loaded!');
        
        // Log performance metrics
        window.addEventListener('load', function() {
            setTimeout(function() {
                if (window.performance && window.performance.timing) {
                    var perfData = window.performance.timing;
                    var loadTime = perfData.loadEventEnd - perfData.navigationStart;
                    console.log('='.repeat(60));
                    console.log('PERFORMANCE METRICS');
                    console.log('='.repeat(60));
                    console.log('Total Page Load Time:', loadTime, 'ms');
                    console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.navigationStart, 'ms');
                    console.log('='.repeat(60));
                }
            }, 1000);
        });