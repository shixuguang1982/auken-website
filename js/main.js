/* ================================
   AUKEN MACHINERY — Interactions
   ================================ */

(function () {
    'use strict';

    /* ---- Header scroll effect ---- */
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');

    function onScroll() {
        const scrolled = window.scrollY > 50;
        header.classList.toggle('scrolled', scrolled);
        backToTop.classList.toggle('show', window.scrollY > 400);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---- Mobile menu ---- */
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('open');
    });

    // Close menu on nav link click
    nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            nav.classList.remove('open');
        });
    });

    /* ---- Back to top ---- */
    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ---- Reveal on scroll ---- */
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: show all
        revealElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    /* ---- Counter animation ---- */
    const counters = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function animateCounters() {
        if (countersStarted) return;
        countersStarted = true;

        counters.forEach(function (counter) {
            const target = parseInt(counter.getAttribute('data-count'), 10);
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2000;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);

                // Format large numbers
                if (target >= 1000) {
                    counter.textContent = current.toLocaleString() + suffix;
                } else {
                    counter.textContent = current + suffix;
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target.toLocaleString() + suffix;
                }
            }

            requestAnimationFrame(update);
        });
    }

    if ('IntersectionObserver' in window) {
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            const statsObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounters();
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            statsObserver.observe(statsSection);
        }
    } else {
        animateCounters();
    }

    /* ---- Form validation ---- */
    const form = document.getElementById('inquiryForm');
    const formSuccess = document.getElementById('formSuccess');

    function showError(field, message) {
        const errorEl = document.getElementById('error-' + field);
        const inputEl = document.getElementById(field);
        if (errorEl) errorEl.textContent = message;
        if (inputEl) inputEl.classList.add('error');
    }

    function clearError(field) {
        const errorEl = document.getElementById('error-' + field);
        const inputEl = document.getElementById(field);
        if (errorEl) errorEl.textContent = '';
        if (inputEl) inputEl.classList.remove('error');
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (form) {
        // Clear errors on input
        ['name', 'email', 'country', 'message'].forEach(function (field) {
            const el = document.getElementById(field);
            if (el) {
                el.addEventListener('input', function () {
                    clearError(field);
                });
            }
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var valid = true;

            var name = document.getElementById('name').value.trim();
            var email = document.getElementById('email').value.trim();
            var country = document.getElementById('country').value.trim();
            var message = document.getElementById('message').value.trim();

            if (!name) {
                showError('name', 'Please enter your name');
                valid = false;
            } else if (name.length < 2) {
                showError('name', 'Name is too short');
                valid = false;
            }

            if (!email) {
                showError('email', 'Please enter your email');
                valid = false;
            } else if (!validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
                valid = false;
            }

            if (!country) {
                showError('country', 'Please enter your country');
                valid = false;
            }

            if (!message) {
                showError('message', 'Please tell us your requirements');
                valid = false;
            } else if (message.length < 10) {
                showError('message', 'Please provide more details (at least 10 characters)');
                valid = false;
            }

            if (valid) {
                // Collect form data
                var formData = {
                    name: name,
                    email: email,
                    phone: document.getElementById('phone').value.trim(),
                    country: country,
                    product: document.getElementById('product').value,
                    message: message,
                    timestamp: new Date().toISOString()
                };

                // Log for demo — in production, send to backend API
                console.log('Inquiry submitted:', formData);

                // Show success message
                form.style.display = 'none';
                formSuccess.classList.add('show');

                // Optional: trigger WhatsApp/email pre-fill
                // window.location.href = 'mailto:sales@aukenmachinery.com?subject=Inquiry from ' + name;
            }
        });
    }

    /* ---- Active nav link on scroll ---- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        var scrollPos = window.scrollY + 100;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    /* ---- Smooth scroll for anchor links ---- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;

            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var offset = header.offsetHeight;
                var targetPos = target.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

})();

/* ---- Reset form (global for inline onclick) ---- */
function resetForm() {
    var form = document.getElementById('inquiryForm');
    var success = document.getElementById('formSuccess');

    form.reset();
    form.style.display = 'block';
    success.classList.remove('show');

    // Clear any errors
    ['name', 'email', 'country', 'message'].forEach(function (field) {
        var errorEl = document.getElementById('error-' + field);
        var inputEl = document.getElementById(field);
        if (errorEl) errorEl.textContent = '';
        if (inputEl) inputEl.classList.remove('error');
    });
}
