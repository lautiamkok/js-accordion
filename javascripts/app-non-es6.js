'use strict'

// Must wait until DOM is ready before initiating the modules.
$(document).ready(function() {
  console.log("DOM is ready. Let's party")
  $(document).foundation()

  // Initialize Swiper: slide
  var swiperSlide = new Swiper('.slide-swiper-block .swiper-container', {
    pagination: '.slide-swiper-block .swiper-pagination',
    slidesPerView: 'auto',
    centeredSlides: true,
    paginationClickable: true,
    spaceBetween: 30,
    loop: true,
    grabCursor: true,
    freeMode: true,
    keyboardControl: true,
  })

  // Affix
  var affix = $('.affix')
  affix.find('.affix-nav').animate({
    height: 'toggle'
  },
   600,
  'easeOutExpo',
  function () {
      // do something or nothing.
  })

  // Show/ hide menu main.
  var buttonShowMenu = $('.button-show-menu')
  var buttonHideMenu = $('.button-hide-menu')
  buttonShowMenu.on('click', function () {

    $(this).addClass('hide')
    buttonHideMenu.removeClass('hide')

    affix.find('.affix-nav').animate({
      height: 'toggle'
    },
     600,
    'easeOutExpo',
    function () {
        // do something or nothing.
    })
    return false
  })

  buttonHideMenu.on('click', function () {

    $(this).addClass('hide')
    buttonShowMenu.removeClass('hide')

    affix.find('.affix-nav').animate({
      height: 'toggle'
    },
     600,
    'easeOutExpo',
    function () {
        // do something or nothing.
    })
    return false
  })

  // Get Z Foundation media query screen size.
  // http://foundation.zurb.com/sites/docs/javascript-utilities.html#mediaquery
  function getZFcurrentMediaQuery () {
    return Foundation.MediaQuery.current
  };

  window.addEventListener('resize', () => {
    var current = getZFcurrentMediaQuery()
    console.log('Screen size: ' + current)
  })

  // https://stackoverflow.com/questions/10328665/how-to-detect-browser-minimize-and-maximize-state-in-javascript
  document.addEventListener('visibilitychange', () => {
    console.log(document.hidden, document.visibilityState)
  }, false)
})
