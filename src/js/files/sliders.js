import {Splide} from '@splidejs/splide';
// Default theme
// import '@splidejs/splide/css';

// or only core styles
import '@splidejs/splide/css/core';
import { debounce, isMobile } from './functions';



function initSliders() {
  if (document.querySelector('.evidence__slider')) {
    let splide = new Splide('.evidence__slider', {
      type: 'slide',
      pagination: false,
      gap: 20,
      arrows: false,
      perMove: 1,
      perPage: 1,
      autoWidth: true,
    })

    let bar = splide.root.querySelector('.evidence__progress i');

    if (bar) {
      splide.on( 'mounted move', function () {
        let end  = splide.Components.Controller.getEnd() + 1;
        let rate = Math.min( ( splide.index + 1 ) / end, 1 );
        let width = 100 / end;
        let translate = splide.Components.Controller.getIndex() * 100;
        bar.style.width = String( width ) + '%';
        bar.style.translate =`${translate}% 0%`;
      } );
    }

    if (navigator.userAgent.match(/Mac OS/i)) {
      splide.root.addEventListener('mousewheel', (e)=>{
        onWheel(e, splide);
      })
    }

    splide.mount();
  }
  if (document.querySelector('.assort__slider')) {
    let splide = new Splide('.assort__slider', {
      type: 'slide',
      pagination: false,
      gap: 20,
      arrows: false,
      perMove: 1,
      perPage: 1,
      autoWidth: true,
      dragMinThreshold: {
        touch: navigator.userAgent.match(/Mac OS/i)||isMobile.iOS() ? 160 : 60
      },
      speed: 1000,
    })

    let bar = splide.root.querySelector('.assort__progress i');

    if (bar) {
      splide.on( 'mounted move', function () {
        var end  = splide.Components.Controller.getEnd() + 1;
        var rate = Math.min( ( splide.index + 1 ) / end, 1 );
        bar.style.width = String( 100 * rate ) + '%';
      } );
    }

    splide.mount();
  }
}

function onWheel(e, splide) {
  if (Math.abs(e.deltaX) > 1) {
    e.preventDefault();
    console.log(e.deltaX);
    let coef = e.deltaX > 0 ? 1 : -1;
    let dest = splide.Components.Controller.getIndex() + coef;
    const end = splide.Components.Controller.getEnd();

    if (dest >= 0 && dest <= end) {
      splide.Components.Controller.go(dest)
    }
  }
}

window.addEventListener("load", function (e) {
	initSliders();
});