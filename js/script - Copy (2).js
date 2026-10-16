
/* =========================================================
   SOLAR STORY ANIMATION
   CSS plays the story on page load by itself.
   JS only (a) replays it when the hero scrolls back into view
   and (b) adds the small sun parallax.
========================================================= */
(function(){

    var hero = document.querySelector('#solarshop-hero');
    if(!hero) return;

    var wasOut = false;

    function replay(){
        hero.classList.add('solar-reset');
        void hero.offsetWidth;                 /* force reflow */
        requestAnimationFrame(function(){
            hero.classList.remove('solar-reset');
        });
    }

    if('IntersectionObserver' in window){
        new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    if(wasOut){ wasOut = false; replay(); }
                }else if(entry.intersectionRatio === 0){
                    wasOut = true;
                }
            });
        },{ threshold:[0,.25] }).observe(hero);
    }

    /* subtle sun parallax (desktop only) */
    var sun = hero.querySelector('.sun');

    if(sun && window.matchMedia('(min-width:851px) and (hover:hover)').matches){

        hero.addEventListener('mousemove', function(e){
            var r = hero.getBoundingClientRect();
            var x = (e.clientX - r.left) / r.width  - .5;
            var y = (e.clientY - r.top)  / r.height - .5;
            sun.style.translate = (x * 5) + 'px ' + (y * 4) + 'px';
        });

        hero.addEventListener('mouseleave', function(){
            sun.style.translate = '0 0';
        });
    }

})();



/* =========================================================
   NEW MODULE JS: OUR SOLAR SOLUTIONS SCROLL
========================================================= */
document.addEventListener('DOMContentLoaded', function() {
    const scrollContainer = document.getElementById('ss-cards-scroll');
    
    if (scrollContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;

        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            scrollContainer.style.cursor = 'grabbing';
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });

        scrollContainer.addEventListener('mouseleave', () => {
            isDown = false;
            scrollContainer.style.cursor = 'grab';
        });

        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
            scrollContainer.style.cursor = 'grab';
        });

        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast multiplier
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
    }
});



/* =========================================================
   FEATURED PRODUCTS SLIDER JS
========================================================= */
document.addEventListener('DOMContentLoaded', function() {
    
    const fprodTrack = document.querySelector('.fprod-track');
    const fprodPrev = document.querySelector('.fprod-arrow.prev-arrow');
    const fprodNext = document.querySelector('.fprod-arrow.next-arrow');
    const fprodDots = document.querySelectorAll('.fprod-dots .fprod-dot');

    if (fprodTrack && fprodPrev && fprodNext) {
        
   
        fprodNext.addEventListener('click', function() {
            const cardWidth = fprodTrack.querySelector('.fprod-card').offsetWidth;
            fprodTrack.scrollBy({ left: cardWidth + 20, behavior: 'smooth' });
            updateFprodDots(1);
        });

   
        fprodPrev.addEventListener('click', function() {
            const cardWidth = fprodTrack.querySelector('.fprod-card').offsetWidth;
            fprodTrack.scrollBy({ left: -(cardWidth + 20), behavior: 'smooth' });
            updateFprodDots(-1);
        });

  
        let currentDot = 0;
        function updateFprodDots(direction) {
            if (!fprodDots.length) return;
            fprodDots[currentDot].classList.remove('active');
            
            currentDot += direction;
            if (currentDot >= fprodDots.length) currentDot = 0;
            if (currentDot < 0) currentDot = fprodDots.length - 1;
            
            fprodDots[currentDot].classList.add('active');
        }

       
        fprodDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                fprodDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                
                const cardWidth = fprodTrack.querySelector('.fprod-card').offsetWidth;
                const scrollPos = index * (cardWidth + 20);
                fprodTrack.scrollTo({ left: scrollPos, behavior: 'smooth' });
                currentDot = index;
            });
        });
    }
});



/* =========================================================
   NEW SECTION JS: STATS COUNTER ANIMATION
========================================================= */
document.addEventListener('DOMContentLoaded', function() {
    
    const counters = document.querySelectorAll('.wcs-counter');
    const speed = 200;

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    
                   
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                       
                        counter.innerText = target.toLocaleString();
                    }
                };

                updateCount();
           
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5 
    });

    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

});

/* =========================================================
   PROJECTS SLIDER JS
========================================================= */
document.addEventListener('DOMContentLoaded', function() {
    
    const projTrack = document.querySelector('.proj-track');
    const projPrev = document.querySelector('.proj-arrow.prev-arrow');
    const projNext = document.querySelector('.proj-arrow.next-arrow');

    if (projTrack && projPrev && projNext) {
        
        // ডান দিকের অ্যারোতে ক্লিক
        projNext.addEventListener('click', function() {
            // একটি কার্ডের উইডথ এবং গ্যাপ (20px) যোগ করে স্ক্রল করা
            const cardWidth = projTrack.querySelector('.proj-card').offsetWidth;
            projTrack.scrollBy({ left: cardWidth + 20, behavior: 'smooth' });
        });

        // বাম দিকের অ্যারোতে ক্লিক
        projPrev.addEventListener('click', function() {
            const cardWidth = projTrack.querySelector('.proj-card').offsetWidth;
            projTrack.scrollBy({ left: -(cardWidth + 20), behavior: 'smooth' });
        });

        // ঐচ্ছিক: মাউস দিয়ে টেনে (Drag) স্ক্রল করার অপশন
        let isDown = false;
        let startX;
        let scrollLeft;

        projTrack.addEventListener('mousedown', (e) => {
            isDown = true;
            projTrack.style.cursor = 'grabbing';
            startX = e.pageX - projTrack.offsetLeft;
            scrollLeft = projTrack.scrollLeft;
        });

        projTrack.addEventListener('mouseleave', () => {
            isDown = false;
            projTrack.style.cursor = 'grab';
        });

        projTrack.addEventListener('mouseup', () => {
            isDown = false;
            projTrack.style.cursor = 'grab';
        });

        projTrack.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - projTrack.offsetLeft;
            const walk = (x - startX) * 2; 
            projTrack.scrollLeft = scrollLeft - walk;
        });
    }
});

/* =========================================================
   SCC (Solar Calc Contact) MODULE JS
========================================================= */
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Toggle Buttons Logic ---
    const toggleBoxes = document.querySelectorAll('.scc-toggle-box');
    
    toggleBoxes.forEach(box => {
        const btns = box.querySelectorAll('.scc-toggle-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                // Remove active class from all buttons in this box
                btns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
            });
        });
    });

    // --- 2. Testimonial Slider Logic (Dummy animation) ---
    const testiPrev = document.querySelector('.scc-slider-arrow.prev');
    const testiNext = document.querySelector('.scc-slider-arrow.next');
    const testiDots = document.querySelectorAll('.scc-dots .scc-dot');
    const testiCard = document.querySelector('.scc-testi-card');
    
    if (testiPrev && testiNext && testiCard) {
        let currentTestiDot = 0;
        
        function updateTestiUI(direction) {
            if (!testiDots.length) return;
            
            // Add a quick fade effect
            testiCard.style.opacity = '0';
            
            setTimeout(() => {
                testiDots[currentTestiDot].classList.remove('active');
                currentTestiDot += direction;
                
                if (currentTestiDot >= testiDots.length) currentTestiDot = 0;
                if (currentTestiDot < 0) currentTestiDot = testiDots.length - 1;
                
                testiDots[currentTestiDot].classList.add('active');
                testiCard.style.opacity = '1';
                
            }, 300); // fade duration
        }

        testiNext.addEventListener('click', () => updateTestiUI(1));
        testiPrev.addEventListener('click', () => updateTestiUI(-1));

        testiDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                testiCard.style.opacity = '0';
                setTimeout(() => {
                    testiDots.forEach(d => d.classList.remove('active'));
                    dot.classList.add('active');
                    currentTestiDot = index;
                    testiCard.style.opacity = '1';
                }, 300);
            });
        });
        
        // Add CSS transition for smooth fade
        testiCard.style.transition = 'opacity 0.3s ease';
    }
});

/* =========================================================
   FOOTER & FLOATING CONTACT WIDGET JS
========================================================= */
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Floating Contact Widget (Folder Toggle) ---
    const fcwToggleBtn = document.getElementById('fcw-toggle');
    const fcwContainer = document.querySelector('.fcw-container');
    const fcwMenu = document.getElementById('fcw-menu');

    if (fcwToggleBtn && fcwMenu) {
        fcwToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Toggle active state for container (animates icons)
            fcwContainer.classList.toggle('active');
            // Toggle open state for menu (shows/hides buttons)
            fcwMenu.classList.toggle('open');
        });

        // Close menu if clicked outside
        document.addEventListener('click', function(event) {
            if (!fcwContainer.contains(event.target)) {
                fcwContainer.classList.remove('active');
                fcwMenu.classList.remove('open');
            }
        });
    }

    // --- 2. Scroll to Top Functionality ---
    const scrollTopBtn = document.getElementById('ssf-scroll-top');
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});