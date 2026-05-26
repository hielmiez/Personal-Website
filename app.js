document.addEventListener('DOMContentLoaded', () => {
    
    // --- Theme Toggle Logic ---
    const html = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
    const mobileThemeIcon = document.getElementById('mobile-theme-icon');

    // Check for saved theme preference or use dark by default as requested
    const savedTheme = localStorage.getItem('theme');
    
    // Function to apply theme
    const applyTheme = (isDark) => {
        if (isDark) {
            html.classList.add('dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            mobileThemeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            mobileThemeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    };

    // Initialize Theme (Default to Dark if no preference saved)
    if (savedTheme === 'light') {
        applyTheme(false);
    } else {
        // Dark by default
        applyTheme(true);
    }

    // Desktop Toggle
    themeToggleBtn.addEventListener('click', () => {
        const isDark = html.classList.contains('dark');
        applyTheme(!isDark);
    });

    // Mobile Toggle
    mobileThemeToggleBtn.addEventListener('click', () => {
        const isDark = html.classList.contains('dark');
        applyTheme(!isDark);
    });

    // --- Mobile Menu Logic ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // --- Scroll Animations ---
    // Apply the fade-in-section class to all sections except hero
    const sections = document.querySelectorAll('section:not(#hero)');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
});
