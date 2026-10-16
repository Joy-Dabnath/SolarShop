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

/* How It Work Start*/

(function () {
  var root = document.querySelector('[data-proc]'); if (!root) return;
  var list = root.querySelector('[data-proc-steps]');
  var items = [].slice.call(root.querySelectorAll('.proc-item'));
  var heads = items.map(function (i) { return i.querySelector('.proc-item-head'); });
  var scenes = root.querySelectorAll('.proc-scene'), pips = root.querySelectorAll('.proc-pip');
  var stage = root.querySelector('.proc-stage'), capEl = root.querySelector('[data-proc-cap]'), cntEl = root.querySelector('[data-proc-count]');
  var kw = root.querySelector('[data-proc-kw]');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var current = 0, raf;

  function tween(el, to, ms) {            /* live kW counter */
    if (!el) return; cancelAnimationFrame(raf);
    if (reduce) { el.textContent = to.toFixed(1) + ' kW'; return; }
    var t0 = performance.now();
    (function f(t) {
      var p = Math.min((t - t0) / ms, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (to * e).toFixed(1) + ' kW';
      if (p < 1) raf = requestAnimationFrame(f);
    })(t0);
  }

  function go(i, focus) {
    current = i;
    items.forEach(function (item, idx) {
      var on = idx === i;
      item.classList.toggle('is-active', on);
      item.classList.toggle('is-done', idx < i);
      heads[idx].setAttribute('aria-expanded', on ? 'true' : 'false');
    });
    [].forEach.call(scenes, function (s, idx) { s.classList.toggle('is-active', idx === i); });
    [].forEach.call(pips, function (p, idx) { p.classList.toggle('is-on', idx === i); });
    if (stage) stage.setAttribute('data-step', i);
    if (capEl) capEl.textContent = items[i].querySelector('.proc-item-title').textContent;
    if (cntEl) cntEl.textContent = 'Step ' + (i + 1) + ' of ' + items.length;
    if (i === 3) tween(kw, 4.2, 1800);
    var nx = scenes[(i + 1) % scenes.length].querySelectorAll('img');   /* warm next images */
    [].forEach.call(nx, function (im) { new Image().src = im.currentSrc || im.src; });
    if (focus) heads[i].focus();
  }

  heads.forEach(function (h, idx) {
    h.addEventListener('click', function () { if (idx !== current) go(idx); });
    h.addEventListener('keydown', function (e) {   /* keyboard nav */
      var k = e.key, n = null;
      if (k === 'ArrowDown' || k === 'ArrowRight') n = (idx + 1) % items.length;
      else if (k === 'ArrowUp' || k === 'ArrowLeft') n = (idx - 1 + items.length) % items.length;
      else if (k === 'Home') n = 0; else if (k === 'End') n = items.length - 1;
      if (n !== null) { e.preventDefault(); go(n, true); }
    });
  });

  if (!reduce) {
    root.classList.add('is-auto', 'is-paused');
    list.addEventListener('animationend', function (e) {
      if (e.target.classList && e.target.classList.contains('proc-timer')) go((current + 1) % items.length);
    });
    var inView = false, hovering = false;
    function sync() { root.classList.toggle('is-paused', !inView || hovering); }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { inView = en[0].isIntersecting; sync(); }, { threshold: 0.35 }).observe(root);
    } else { inView = true; sync(); }
    [list, stage].forEach(function (el) {
      if (!el) return;
      el.addEventListener('mouseenter', function () { hovering = true; sync(); });
      el.addEventListener('mouseleave', function () { hovering = false; sync(); });
    });
    list.addEventListener('focusin', function () { hovering = true; sync(); });
    list.addEventListener('focusout', function () { hovering = false; sync(); });
  }
})();

/* image fallback, particles, parallax */
(function () {
  var root = document.querySelector('[data-proc]'); if (!root) return;
  var stage = root.querySelector('.proc-stage'); if (!stage) return;
  [].forEach.call(stage.querySelectorAll('img'), function (im) {
    im.addEventListener('error', function () { im.style.display = 'none'; });   /* stage gradient shows if a file is missing */
  });
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var cap = stage.querySelector('.proc-stage-cap');
  for (var i = 0; i < 14; i++) {
    var m = document.createElement('span'); m.className = 'proc-mote';
    m.style.left = (6 + Math.random() * 88) + '%';
    m.style.setProperty('--d', (6 + Math.random() * 7).toFixed(1) + 's');
    m.style.setProperty('--dl', (-Math.random() * 10).toFixed(1) + 's');
    m.style.setProperty('--x', (Math.random() * 60 - 30).toFixed(0) + 'px');
    stage.insertBefore(m, cap);
  }
  if (window.matchMedia('(pointer:fine)').matches) {
    stage.addEventListener('mousemove', function (e) {
      var r = stage.getBoundingClientRect();
      stage.style.setProperty('--px', (((e.clientX - r.left) / r.width - .5) * -18).toFixed(1) + 'px');
      stage.style.setProperty('--py', (((e.clientY - r.top) / r.height - .5) * -12).toFixed(1) + 'px');
    });
    stage.addEventListener('mouseleave', function () { stage.style.setProperty('--px', '0px'); stage.style.setProperty('--py', '0px'); });
  }
})();


/* How It Work End*/


/* =========================================================
   SOLAR SAVINGS CALCULATOR (New Zealand)
   Used by both the main calculator and the quick-estimate box.
   All numbers below are planning assumptions - edit freely.
========================================================= */
document.addEventListener('DOMContentLoaded', function () {

    var CFG = {
        residential: { tariff: 0.32, fixed: 65,  self: 0.55, exportRate: 0.12, costPerKw: 2100,
                       sizes: [3, 4, 5, 6.6, 8, 10, 13] },
        commercial:  { tariff: 0.24, fixed: 120, self: 0.80, exportRate: 0.10, costPerKw: 1600,
                       sizes: [20, 30, 50, 75, 100] }
    };
    var CO2_PER_KWH = 0.11;   /* kg CO2e per kWh - NZ grid is mostly renewable */
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function nzd(n) { return 'NZ$' + Math.round(n).toLocaleString('en-NZ'); }

    function estimate(mode, bill, yieldKwh, sizeValue) {
        var c = CFG[mode];
        var kwh = Math.max(bill - c.fixed, bill * 0.4) * 12 / c.tariff;      /* yearly use */
        var size;
        if (sizeValue === 'auto') {
            var raw = kwh * 0.8 / yieldKwh, best = c.sizes[0];
            c.sizes.forEach(function (s) { if (Math.abs(s - raw) < Math.abs(best - raw)) best = s; });
            size = best;
        } else { size = parseFloat(sizeValue); }
        var gen  = size * yieldKwh;
        var used = Math.min(gen * c.self, kwh);
        var sold = gen - used;
        var save = used * c.tariff + sold * c.exportRate;
        var pay  = (size * c.costPerKw) / save;
        var payText;
        if (pay > 20) { payText = '20+ years'; }
        else {
            var lo = Math.max(1, Math.floor(pay * 0.9)), hi = Math.ceil(pay * 1.1);
            if (hi <= lo) hi = lo + 1;
            payText = lo + '-' + hi + ' years';
        }
        return { size: size, save: save, payText: payText, co2: gen * CO2_PER_KWH / 1000 };
    }

    function countUp(el, to) {
        if (reduceMotion) { el.textContent = nzd(to); return; }
        var from = parseFloat(el.getAttribute('data-val')) || 0, t0 = null, dur = 750;
        el.setAttribute('data-val', to);
        function frame(t) {
            if (t0 === null) t0 = t;
            var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
            el.textContent = nzd(from + (to - from) * e);
            if (p < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    function setError(group, msg) {
        var field = group.querySelector('input,select');
        var err = group.querySelector('.scc-field-error');
        group.classList.toggle('has-error', !!msg);
        if (err) err.textContent = msg || '';
        if (field) field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    }

    function initCalc(box, outRoot) {
        var bill   = box.querySelector('[data-calc-bill]');
        var region = box.querySelector('[data-calc-region]');
        var size   = box.querySelector('[data-calc-size]');
        var btn    = box.querySelector('[data-calc-btn]');
        var modeBtns = box.querySelectorAll('.scc-toggle-btn');
        var mode = 'residential', calculated = false;
        var card = outRoot.querySelector('.scc-result-card');
        function out(name) { return outRoot.querySelector('[data-out="' + name + '"]'); }

        function fillSizes() {
            var keep = size.value;
            size.innerHTML = '<option value="auto">Recommend the best size for me</option>' +
                CFG[mode].sizes.map(function (s) { return '<option value="' + s + '">' + s + ' kW</option>'; }).join('');
            size.value = Array.prototype.some.call(size.options, function (o) { return o.value === keep; }) ? keep : 'auto';
        }

        function validate(show) {
            var ok = true, b = parseFloat(bill.value);
            var bg = bill.closest('.scc-input-group'), rg = region.closest('.scc-input-group');
            if (isNaN(b) || b < 30) { ok = false; if (show) setError(bg, 'Enter your monthly bill (NZ$30 or more).'); }
            else setError(bg, '');
            if (!region.value) { ok = false; if (show) setError(rg, 'Choose your region.'); }
            else setError(rg, '');
            return ok;
        }

        function run(show) {
            if (!validate(show)) return;
            var opt = region.options[region.selectedIndex];
            var r = estimate(mode, parseFloat(bill.value), parseFloat(opt.getAttribute('data-yield')), size.value);
            var note = 'Estimate for a ' + r.size + ' kW ' + mode + ' system in ' + region.value +
                       '. Based on typical NZ power prices and regional sunshine. Your quote will be more exact.';
            calculated = true;

            if (out('amount')) countUp(out('amount'), r.save);
            if (out('monthly')) out('monthly').textContent = 'About ' + nzd(r.save / 12) + ' a month';
            if (out('size')) out('size').textContent = r.size + ' kW';
            if (out('payback')) out('payback').textContent = r.payText;
            if (out('co2')) out('co2').textContent = (r.co2 < 10 ? r.co2.toFixed(1) : Math.round(r.co2)) + ' tonnes';
            if (out('note')) out('note').textContent = note;
            if (card) {
                card.classList.add('is-live');
                if (show && window.innerWidth <= 1200) {
                    card.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
                }
            }
        }

        btn.addEventListener('click', function () { run(true); });
        [bill, region, size].forEach(function (el) {
            el.addEventListener('input', function () { if (calculated) run(false); else if (el !== size) validate(false); });
            el.addEventListener('change', function () { if (calculated) run(false); });
        });
        bill.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); run(true); } });

        modeBtns.forEach(function (b) {
            b.addEventListener('click', function () {
                mode = b.getAttribute('data-mode');
                modeBtns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
                fillSizes();
                if (calculated) run(false);
            });
        });
    }

    var main = document.querySelector('[data-calc="main"]');
    if (main) initCalc(main, document.querySelector('.scc-calc-wrapper'));
});


/* =========================================================
   CONTACT FORM - validation + feedback
========================================================= */
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('scc-contact-form');
    if (!form) return;
    var status = form.querySelector('.scc-form-status');
    function setError(group, msg) {
        var field = group.querySelector('input,select,textarea');
        var err = group.querySelector('.scc-field-error');
        group.classList.toggle('has-error', !!msg);
        if (err) err.textContent = msg || '';
        if (field) field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    }
    var submitBtn = form.querySelector('button[type="submit"]');

    function check(field) {
        var v = (field.value || '').trim(), msg = '';
        if (field.required && !v) {
            msg = field.tagName === 'SELECT' ? 'Choose a service.' : 'This field is required.';
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
            msg = 'Enter a valid email address.';
        } else if (field.type === 'tel' && !/^[+()\d][\d\s()+-]{6,}$/.test(v)) {
            msg = 'Enter a valid phone number.';
        }
        setError(field.closest('.scc-input-group'), msg);
        return !msg;
    }

    form.querySelectorAll('[required]').forEach(function (f) {
        f.addEventListener('blur', function () { if (f.value || f.closest('.has-error')) check(f); });
        f.addEventListener('input', function () { if (f.closest('.has-error')) check(f); });
        f.addEventListener('change', function () { if (f.closest('.has-error')) check(f); });
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        status.className = 'scc-form-status';
        var firstBad = null;
        form.querySelectorAll('[required]').forEach(function (f) {
            if (!check(f) && !firstBad) firstBad = f;
        });
        if (firstBad) {
            status.textContent = 'Please fix the highlighted fields.';
            status.classList.add('is-error');
            firstBad.focus();
            return;
        }

        submitBtn.disabled = true;
        status.textContent = 'Sending...';

        /* TODO: send the form to your real endpoint here, e.g.
           fetch('/your-endpoint', { method: 'POST', body: new FormData(form) })
           For now this only simulates a successful send. */
        setTimeout(function () {
            form.reset();
            submitBtn.disabled = false;
            status.textContent = 'Thanks! One of our solar experts will contact you within 24 hours.';
        }, 700);
    });
});

/* =========================================================
   FAQ - accordion, search and topic filter
========================================================= */
document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('faq');
    if (!root) return;

    var items  = Array.prototype.slice.call(root.querySelectorAll('.faq-item'));
    var pills  = root.querySelectorAll('.faq-pill');
    var search = root.querySelector('#faq-search');
    var count  = root.querySelector('[data-faq-count]');
    var empty  = root.querySelector('[data-faq-empty]');
    var cat = 'all', term = '';

    function setOpen(item, open) {
        item.classList.toggle('is-open', open);
        item.querySelector('.faq-q').setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    items.forEach(function (item) {
        item.querySelector('.faq-q').addEventListener('click', function () {
            var willOpen = !item.classList.contains('is-open');
            items.forEach(function (it) { if (it !== item) setOpen(it, false); });
            setOpen(item, willOpen);
        });
    });

    function apply() {
        var shown = 0, anyOpen = false;
        items.forEach(function (it) {
            var okCat  = cat === 'all' || it.getAttribute('data-cat') === cat;
            var okTerm = !term || it.textContent.toLowerCase().indexOf(term) > -1;
            var show = okCat && okTerm;
            it.hidden = !show;
            if (show) { shown++; if (it.classList.contains('is-open')) anyOpen = true; }
            else setOpen(it, false);
        });
        /* keep one answer open so the list never looks empty */
        if (!anyOpen && shown) {
            var first = items.filter(function (it) { return !it.hidden; })[0];
            if (first && !term) setOpen(first, true);
        }
        count.textContent = shown + (shown === 1 ? ' question' : ' questions');
        empty.hidden = shown > 0;
    }

    pills.forEach(function (p) {
        p.addEventListener('click', function () {
            cat = p.getAttribute('data-cat');
            pills.forEach(function (x) {
                var on = x === p;
                x.classList.toggle('is-on', on);
                x.setAttribute('aria-pressed', on ? 'true' : 'false');
            });
            apply();
        });
    });

    search.addEventListener('input', function () {
        term = search.value.trim().toLowerCase();
        apply();
    });

    /* arrow keys move between questions */
    root.querySelector('.faq-list').addEventListener('keydown', function (e) {
        var keys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];
        if (keys.indexOf(e.key) === -1 || !e.target.classList.contains('faq-q')) return;
        var btns = items.filter(function (it) { return !it.hidden; })
                        .map(function (it) { return it.querySelector('.faq-q'); });
        var i = btns.indexOf(e.target);
        if (e.key === 'ArrowDown') i = (i + 1) % btns.length;
        if (e.key === 'ArrowUp')   i = (i - 1 + btns.length) % btns.length;
        if (e.key === 'Home') i = 0;
        if (e.key === 'End')  i = btns.length - 1;
        e.preventDefault();
        btns[i].focus();
    });
});

// Sticky navbar shadow on scroll
(function () {
    const nav = document.querySelector('.solar-nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
})();


