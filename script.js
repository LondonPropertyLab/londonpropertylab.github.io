document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.getElementById("navbar");
    const logo = document.querySelector("#logo");
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const footer = document.querySelector('.footer');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const header = document.querySelector('header');
    const subscribeButtons = document.querySelectorAll('.subscribe-btn, .newsletter');
    let lastScrollTop = 0;
    let isMenuOpen = false;

    function toggleFooterVisibility() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (isMenuOpen || scrollTop > 100) {
            footer.classList.add('show');
        } else {
            footer.classList.remove('show');
        }
    }

    function closeMenu() {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
        isMenuOpen = false;
        toggleFooterVisibility();
    }

    // Hamburger menu functionality
    hamburger.addEventListener("click", function() {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
        isMenuOpen = !isMenuOpen;
        toggleFooterVisibility();
    });

    // Close menu when a nav link is clicked
    navLinks.addEventListener("click", function(event) {
        if (event.target.tagName === 'A') {
            closeMenu();
        }
    });

    // Scroll event listener for navbar, logo, menu behavior, and footer
    window.addEventListener("scroll", function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 50) {
            header.classList.add("scrolled");
            logo.src = "images/post-scroll-final.svg"; // Use correct path
            if (isMenuOpen) {
                closeMenu();
            }
        } else {
            header.classList.remove("scrolled");
            logo.src = "images/pre-scroll-final.svg"; // Use correct path
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        toggleFooterVisibility();
    });

    // Scroll indicator functionality
    if (scrollIndicator) {
        scrollIndicator.addEventListener("click", function() {
            const approachSection = document.getElementById("approach");
            if (approachSection) {
                const navbarHeight = navbar.offsetHeight;
                const sectionTop = approachSection.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: sectionTop - navbarHeight,
                    behavior: "smooth"
                });
            }
        });
    }

    // Resize event listener to handle menu visibility
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            isMenuOpen = false;
            toggleFooterVisibility();
        }
    });

    // FAQ toggle functionality
    document.querySelectorAll(".faq-question").forEach(button => {
        button.addEventListener("click", function() {
            const faqItem = this.parentNode;
            faqItem.classList.toggle("active");
            const faqAnswer = faqItem.querySelector(".faq-answer");
            if (faqItem.classList.contains("active")) {
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
            } else {
                faqAnswer.style.maxHeight = null;
            }
        });
    });

    // Handle all internal navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('header').offsetHeight;
                const scrollPosition = targetElement.offsetTop - navbarHeight;
    
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
    
                if (isMenuOpen) closeMenu();
            }
        });
    });

    // External links (e.g., Substack) should open in a new tab
    subscribeButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            if (!this.getAttribute('href').startsWith('#')) {
                return true;
            }
            e.preventDefault();
            window.open(this.getAttribute('href'), "_blank");
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const h2Elements = document.querySelectorAll('.approach-header h2');
    let isAnimating = false;
    
    // Split text into words for both h2s
    h2Elements.forEach(h2 => {
        const text = h2.textContent;
        const words = text.split(' ');
        h2.innerHTML = words.map(word => 
            `<span class="word">${word}</span>`
        ).join(' ');
    });

    function animateH2(h2, delay = 0) {
        const words = h2.querySelectorAll('.word');
        const wordDelay = 100; // ms between words
        const totalDuration = words.length * wordDelay + 500; // Add buffer
    
        words.forEach((word, index) => {
            setTimeout(() => {
                word.classList.add('animate');
            }, delay + (index * wordDelay));
        });
    
        return totalDuration; // Return total duration with buffer
    }

    function resetAnimations() {
        isAnimating = false;
        h2Elements.forEach(h2 => {
            h2.querySelectorAll('.word').forEach(word => {
                word.classList.remove('animate');
            });
        });
    }

    function handleScroll() {
        const firstH2 = h2Elements[0];
        const secondH2 = h2Elements[1];
        const firstH2Position = firstH2.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
    
        if (firstH2Position < screenPosition && !isAnimating) {
            isAnimating = true;
            
            const firstDuration = animateH2(firstH2);
            
            // Add fixed delay before starting second h2
            setTimeout(() => {
                animateH2(secondH2);
            }, firstDuration + 175); // Add extra buffer between h2s
        } else if (firstH2Position >= screenPosition) {
            resetAnimations();
        }
    }

    window.addEventListener('scroll', handleScroll);
});


document.addEventListener("DOMContentLoaded", function() {
    const cookiePopup = document.getElementById("cookie-popup");
    const acceptButton = document.getElementById("accept-cookies");
    const declineButton = document.getElementById("decline-cookies");

    // Check if the user has already made a choice
    if (document.cookie.split(';').some(item => item.trim().startsWith('cookiesAccepted=')) ||
        document.cookie.split(';').some(item => item.trim().startsWith('cookiesDeclined='))) {
        cookiePopup.style.display = "none";
    }

    // Accept Cookies
    acceptButton.addEventListener("click", function() {
        document.cookie = "cookiesAccepted=true; path=/; max-age=" + 60*60*24*30; // 30 days expiration
        cookiePopup.style.display = "none";
    });

    // Decline Cookies
    declineButton.addEventListener("click", function() {
        document.cookie = "cookiesDeclined=true; path=/; max-age=" + 60*60*24*30; // 30 days expiration
        cookiePopup.style.display = "none";
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const footer = document.getElementById('footer');

    hamburger.addEventListener('click', function() {
        footer.classList.toggle('show');
    });
});


