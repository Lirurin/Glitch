const Swiper = require('swiper')
const objectFitImages = require('object-fit-images')
const throttle = require('lodash.throttle')

document.addEventListener('DOMContentLoaded', () => {
    const swiperImg = document.querySelectorAll('img.showcase__image'),
          collectionImg = document.querySelectorAll('.collection__image'),
          handPicked = document.querySelectorAll('.hand-picked img');

    objectFitImages(swiperImg);
    objectFitImages(collectionImg);
    objectFitImages(handPicked);

    let showcaseSlider = new Swiper('.showcase__slider', {
        loop: true,
        pagination: {
            el: '.showcase__pagination',
        },
        pagination: {
            el: '.showcase__pagination',
            type: 'bullets',
            clickable: true,
            bulletClass: 'showcase__bullet',
            bulletActiveClass: 'showcase__bullet--current'
        },
    })

    const botbar = document.querySelector(".header__bottom"),
        logo = document.querySelector(".Logo"),
        headerArrow = document.querySelector('.header__arrow-hidden'),
        navMenu = document.querySelector('.header__hidden'),
        showcase = document.querySelector('.showcase');
    
    function stretchMenu(prefix) {
        botbar.classList.add(`sticky-bot${prefix}`);
        logo.classList.add(`sticky-Logo${prefix}`);
        showcase.classList.add(`showcase-full${prefix}`);
    }

    function shrinkMenu(el, transition, ...removeCls) {
        for (let i = 0; i < removeCls.length; i++) {
            el.classList.remove(removeCls[i])
        }
        el.style.transition = transition
    }

    const menuMove = setTimeout(() => {
        if (window.pageYOffset === 0) {
            shrinkMenu(botbar, '', ...['sticky-bot--load', 'sticky-bot']);
            shrinkMenu(logo, '', ...['sticky-Logo--load', 'sticky-Logo']);
            shrinkMenu(showcase, '', ...['showcase-full--load', 'showcase-full']);
        }
        clearTimeout(menuMove)
    }, 0)

    window.onscroll = throttle(() => {
        let newOffset = window.pageYOffset;
        if (newOffset === 0) {
            shrinkMenu(botbar, 'height 0.2s ease-in', ...['sticky-bot--load', 'sticky-bot'])
            shrinkMenu(logo, 'all 0.3s ease', ...['sticky-Logo--load', 'sticky-Logo'])
            shrinkMenu(showcase, '0.55s padding ease', ...['showcase-full--load', 'showcase-full'])
        } else {
            stretchMenu('')
        }
    }, 150);

    headerArrow.onclick = function () {
        navMenu.classList.toggle('menu-close')
        document.body.classList.toggle('no-scroll')
    };

})
