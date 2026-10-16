
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