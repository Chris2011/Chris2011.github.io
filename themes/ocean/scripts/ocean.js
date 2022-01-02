(function () {
    'use strict';

    var burgerMenu = document.querySelector('#burger-menu'),
        links = document.querySelectorAll('header nav a'),
        body = document.querySelector('body'),
        addClass = function (elem, className) {
            if (elem.className.indexOf(className) === -1) {
                elem.className += ' ' + className;
            }
        },
        removeClass = function (elem, className) {
            var classes = elem.className.replace(' ' + className, '');
            elem.className = classes;
        },
        toggle = function (elem, expr) {
            if (expr) {
                addClass(elem, 'active');
            } else {
                removeClass(elem, 'active');
            }
        };

    [].slice.call(links).forEach(function (link) {
        link.addEventListener('click', function (e) {
            var endPos = document.querySelector(this.getAttribute('href')).offsetTop,
                startPos = window.scrollY;

            e.preventDefault();
            
            if (startPos < endPos) {
                animForward(startPos, endPos);
            } else {
                animBackward(startPos, endPos);
            }
        });
    });
    
    var animForward = function(startPos, endPos) {
        var animValue = .5,
            step = function() {
                animValue += 1.5;

                window.scrollTo(0, (startPos += (1 * animValue)));

                if (startPos < endPos) {
                    window.requestAnimationFrame(step);
                }
            };
        
        window.requestAnimationFrame(step);
    };
    
    var animBackward = function(startPos, endPos) {
        var animValue = .5,
            step = function() {
                animValue += 1.5;
                
                window.scrollTo(0, (startPos -= (1 * animValue)));
                
                if (startPos > endPos) {
                    window.requestAnimationFrame(step);
                }
            };
        
        window.requestAnimationFrame(step);
    };
    
    [].slice.call(document.querySelectorAll('.ripple-btn')).forEach(function(btn) {
       btn.addEventListener('click', function(event) {
          var ripple = btn.querySelector('.ripple');

          ripple.style.top = (event.layerY + 'px');
          ripple.style.left = (event.layerX + 'px');
          ripple.style.animation = 'ripple-anim 400ms 1';

          setTimeout(function() {
              ripple.style.animation = '';
          }, 400);
       }, true);
    });

    burgerMenu.addEventListener('click', function () {
        if (body.className.indexOf('active') === -1) {
            addClass(body, 'active');

//            body.addEventListener('click', function (e) {
//                if (!e.target.contains(burgerMenu)) {
//                    removeClass(body, 'active');
//                }
//            }, false);
        } else {
            removeClass(body, 'active');

            body.removeEventListener('click', this);
        }
    }, true);

    window.addEventListener('scroll', function () {
        toggle(document.querySelector('header'), document.body.scrollTop >= 350);
    });
}());