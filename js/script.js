/* =========================================================
   PHARMACY WEBSITE
   HEADER JAVASCRIPT
   HAMBURGER + DROPDOWN + DARK MODE + RTL
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const hamburgerBtn = document.getElementById("hamburgerBtn");
const mainNav = document.getElementById("mainNav");

const rtlToggle = document.getElementById("rtlToggle");
const themeToggle = document.getElementById("themeToggle");

const mobileRtlToggle = document.getElementById("mobileRtlToggle");
const mobileThemeToggle = document.getElementById("mobileThemeToggle");

const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdown = document.querySelector(".dropdown");


/* =========================================================
   HAMBURGER MENU
========================================================= */

if (hamburgerBtn && mainNav) {

    hamburgerBtn.addEventListener("click", function () {

        mainNav.classList.toggle("active");

        hamburgerBtn.classList.toggle("active");

        const isOpen = mainNav.classList.contains("active");

        hamburgerBtn.setAttribute(
            "aria-expanded",
            isOpen
        );

    });

}


/* =========================================================
   CLOSE MOBILE MENU
   WHEN NORMAL LINK IS CLICKED
========================================================= */

document.querySelectorAll(
    ".main-nav .nav-link:not(.dropdown-toggle)"
).forEach(function (link) {

    link.addEventListener("click", function () {

        if (window.innerWidth <= 900) {

            mainNav.classList.remove("active");

            hamburgerBtn.classList.remove("active");

            hamburgerBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});


/* =========================================================
   HOME DROPDOWN - TABLET + MOBILE
========================================================= */

if (dropdownToggle && dropdown) {

    dropdownToggle.addEventListener("click", function (event) {

        if (window.innerWidth <= 1100) {

            event.preventDefault();

            dropdown.classList.toggle("open");

        }

    });

}


/* =========================================================
   DARK MODE
========================================================= */

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    const isDark =
        document.body.classList.contains("dark-mode");

    updateThemeIcons(isDark);

    localStorage.setItem(
        "pharmacy-dark-mode",
        isDark ? "enabled" : "disabled"
    );
}


/* =========================================================
   UPDATE DARK MODE ICONS
========================================================= */

function updateThemeIcons(isDark) {

    const icons = document.querySelectorAll(
        ".theme-toggle i"
    );

    icons.forEach(function (icon) {

        if (isDark) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

        }

    });

}


/* Desktop dark mode button */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        toggleDarkMode
    );

}


/* Mobile dark mode button */

if (mobileThemeToggle) {

    mobileThemeToggle.addEventListener(
        "click",
        toggleDarkMode
    );

}


/* =========================================================
   LOAD SAVED DARK MODE
========================================================= */

const savedTheme =
    localStorage.getItem("pharmacy-dark-mode");

if (savedTheme === "enabled") {

    document.body.classList.add("dark-mode");

    updateThemeIcons(true);

}


/* =========================================================
   RTL MODE
========================================================= */

function toggleRTL() {

    const html = document.documentElement;

    const isRTL =
        html.getAttribute("dir") === "rtl";

    if (isRTL) {

        html.setAttribute("dir", "ltr");

        localStorage.setItem(
            "pharmacy-direction",
            "ltr"
        );

    } else {

        html.setAttribute("dir", "rtl");

        localStorage.setItem(
            "pharmacy-direction",
            "rtl"
        );

    }

}


/* Desktop RTL button */

if (rtlToggle) {

    rtlToggle.addEventListener(
        "click",
        toggleRTL
    );

}


/* Mobile RTL button */

if (mobileRtlToggle) {

    mobileRtlToggle.addEventListener(
        "click",
        toggleRTL
    );

}


/* =========================================================
   LOAD SAVED RTL
========================================================= */

const savedDirection =
    localStorage.getItem("pharmacy-direction");

if (savedDirection) {

    document.documentElement.setAttribute(
        "dir",
        savedDirection
    );

}


/* =========================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", function (event) {

    if (
        mainNav &&
        hamburgerBtn &&
        mainNav.classList.contains("active")
    ) {

        const clickedInsideNav =
            mainNav.contains(event.target);

        const clickedHamburger =
            hamburgerBtn.contains(event.target);

        if (
            !clickedInsideNav &&
            !clickedHamburger
        ) {

            mainNav.classList.remove("active");

            hamburgerBtn.classList.remove("active");

            hamburgerBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }

});


/* =========================================================
   RESET MOBILE MENU WHEN RESIZING TO DESKTOP
========================================================= */

window.addEventListener("resize", function () {

    if (window.innerWidth > 900) {

        if (mainNav) {
            mainNav.classList.remove("active");
        }

        if (hamburgerBtn) {

            hamburgerBtn.classList.remove("active");

            hamburgerBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }

        if (dropdown) {
            dropdown.classList.remove("open");
        }

    }

});






/* =========================================================
   HERO SLIDER
========================================================= */

const heroSlides =
    document.querySelectorAll(".hero-slide");

const heroDots =
    document.querySelectorAll(".hero-dot");

let currentHeroSlide = 0;

let heroInterval;


/* =========================================================
   SHOW SLIDE
========================================================= */

function showHeroSlide(index) {

    heroSlides.forEach(function (slide) {

        slide.classList.remove("active");

    });


    heroDots.forEach(function (dot) {

        dot.classList.remove("active");

    });


    heroSlides[index].classList.add("active");

    heroDots[index].classList.add("active");

    currentHeroSlide = index;
}


/* =========================================================
   NEXT SLIDE
========================================================= */

function nextHeroSlide() {

    let nextSlide =
        currentHeroSlide + 1;

    if (nextSlide >= heroSlides.length) {

        nextSlide = 0;
    }

    showHeroSlide(nextSlide);
}


/* =========================================================
   AUTO SLIDE
========================================================= */

function startHeroSlider() {

    heroInterval = setInterval(
        nextHeroSlide,
        5000
    );
}


startHeroSlider();


/* =========================================================
   DOT CLICK
========================================================= */

heroDots.forEach(function (dot, index) {

    dot.addEventListener("click", function () {

        clearInterval(heroInterval);

        showHeroSlide(index);

        startHeroSlider();

    });

});





/* =========================================================
   HOME 2 - TRUST & STATISTICS
   COUNTER ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const counters = document.querySelectorAll(
        ".home2-trust-number"
    );

    if (!counters.length) return;


    /* =====================================================
       FORMAT NUMBER
    ===================================================== */

    function formatNumber(number) {

        return number.toLocaleString("en-IN");

    }


    /* =====================================================
       ANIMATE COUNTER
    ===================================================== */

    function animateCounter(counter) {

        const target = Number(
            counter.getAttribute("data-target")
        );

        const suffix =
            counter.getAttribute("data-suffix") || "";

        let current = 0;

        const duration = 1800;

        const startTime = performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);


            /*
             * Ease-out effect
             * Starts fast and slows down smoothly
             */

            const easeOut =
                1 - Math.pow(1 - progress, 3);


            current =
                Math.floor(target * easeOut);


            counter.textContent =
                formatNumber(current) + suffix;


            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent =
                    formatNumber(target) + suffix;

            }

        }


        requestAnimationFrame(updateCounter);

    }


    /* =====================================================
       INTERSECTION OBSERVER
       COUNTER STARTS WHEN SECTION IS VISIBLE
    ===================================================== */

    const observer =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        const sectionCounters =
                            entry.target.querySelectorAll(
                                ".home2-trust-number"
                            );


                        sectionCounters.forEach(
                            function (counter) {

                                if (
                                    counter.dataset.counted === "true"
                                ) {
                                    return;
                                }


                                counter.dataset.counted =
                                    "true";


                                animateCounter(counter);

                            }
                        );


                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.3
            }
        );


    /* =====================================================
       OBSERVE TRUST SECTION
    ===================================================== */

    const trustSection =
        document.querySelector(
            ".home2-trust-section"
        );


    if (trustSection) {

        observer.observe(trustSection);

    }

});







/* =========================================================
   HOME 2 - FAQ
   PART 4 - JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(
        ".home2-faq-item"
    );

    faqItems.forEach(function (item) {

        const question = item.querySelector(
            ".home2-faq-question"
        );

        const answer = item.querySelector(
            ".home2-faq-answer"
        );

        if (!question || !answer) return;


        question.addEventListener("click", function () {

            const isActive =
                item.classList.contains("active");


            /* =============================================
               CLOSE ALL OTHER FAQ ITEMS
            ============================================= */

            faqItems.forEach(function (otherItem) {

                if (otherItem !== item) {

                    otherItem.classList.remove("active");

                    const otherAnswer =
                        otherItem.querySelector(
                            ".home2-faq-answer"
                        );

                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = null;
                    }

                }

            });


            /* =============================================
               OPEN / CLOSE CURRENT FAQ
            ============================================= */

            if (!isActive) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            } else {

                item.classList.remove("active");

                answer.style.maxHeight = null;

            }

        });

    });

});







