'use strict'

import DocReady from 'es6-docready'
import $ from 'jquery'
import 'jquery-ui-bundle'
import 'foundation-sites'
import Swiper from 'swiper'

// Must wait until DOM is ready before initiating the modules.
// <script> tag doc readcy.
// https://www.npmjs.com/package/docready
// https://stackoverflow.com/questions/45501939/es6-docready-uncaught-typeerror-0-docready2-default-is-not-a-function
// ES6 doc ready.
// https://www.npmjs.com/package/es6-docready
DocReady(() => {
  console.log("DOM is ready. Let's party")
  $(document).foundation()

    // Initialize Swiper: banner
  var swiperBanner = new Swiper('.banner-swiper-block .swiper-container', {
    pagination: '.banner-swiper-block .swiper-pagination',
    slidesPerView: 1,
    paginationClickable: true,
    centeredSlides: true,
    spaceBetween: 0,
    loop: true,
    keyboardControl: true,
    nextButton: '.banner-swiper-block .swiper-button-next',
    prevButton: '.banner-swiper-block .swiper-button-prev'
  })

    // Initialize Swiper: container
  var swiperColumns4 = new Swiper('.columns-swiper-block.columns-4 .swiper-container', {
    pagination: '.columns-swiper-block.columns-4 .swiper-pagination',
    slidesPerView: 4,
    paginationClickable: true,
    spaceBetween: 30,
    freeMode: true,
    keyboardControl: false,
    grabCursor: true,
        // loop: true,
    keyboardControl: true,
    nextButton: '.columns-swiper-block.columns-4 .swiper-button-next',
    prevButton: '.columns-swiper-block.columns-4 .swiper-button-prev',

        // Responsive breakpoints
    breakpoints: {
      320: {
        slidesPerView: 1
              // spaceBetween: 10
      },
            // when window width is <= 480px - small
      480: {
        slidesPerView: 2
              // spaceBetween: 10
      },
            // when window width is <= 640px - medium
      640: {
        slidesPerView: 2
              // spaceBetween: 20
      },
            // when window width is <= 1024px - large
      1024: {
        slidesPerView: 2
              // spaceBetween: 20
      }
    }
  })

    // Fade in the swiper arrow buttons.
  $('.banner-swiper-block').hover(function () {
    var selector = $('.swiper-arrow')
    $(selector).fadeIn('fast')
  }, function () {
    var selector = $('.swiper-arrow')
    $(selector).fadeOut('fast', function () {
    })
  })

    // Fade in the overlay when hover on the navbar.
    // https://stackoverflow.com/questions/45284520/css-change-the-style-of-another-element-when-a-link-is-hovered
  $('.navbar-items[data-opacity-target]').hover(function () {
    var selector = $(this).data('opacity-target')
    $(selector).fadeIn('fast')
  }, function () {
    var selector = $(this).data('opacity-target')
    $(selector).fadeOut(500, function () {
    })
  })

    // Adjust the margin of each dropdown menu so it is centred.
  var adjustDropDown = () => {
    var fixed = 200
    $('.navbar-items > li > a').not('.language').each(function (index) {
      var thisWidth = $(this).outerWidth(true)
      var calc = (fixed - thisWidth) / 2
      $(this).siblings('ul').css('margin-left', -calc)
    })
  }
  adjustDropDown()

    // Create affix and clone target.
  var target = $('.navbar')
  target.after('<div class="affix" id="affix"></div>')

  var affix = $('.affix')
  affix.append(target.clone(true))
  affix.find('.menu-mobile-only').removeClass('hide-for-medium hide-for-large')
  affix.find('.menu-main').animate({height: 'toggle'}, 600, 'easeOutExpo', function () {})

    // Show affix on scroll.
    // http://stackoverflow.com/questions/14389687/window-scroll-in-vanilla-javascript
    // http://stackoverflow.com/questions/17441065/how-to-detect-scroll-position-of-page-using-jquery
    // http://stackoverflow.com/questions/5686629/jquery-window-scroll-event-does-not-fire-up
  var element = document.getElementById('affix')
  if (element !== null) {
    var position = target.position()
    window.addEventListener('scroll', function () {
      var height = $(window).scrollTop()
      if (height > position.top) {
        target.css('visibility', 'hidden')
        affix.fadeIn()
      } else {
        affix.hide()
        target.css('visibility', 'visible')
      }
    })
  }

    // Show/ hide menu main.
  var buttonShowMenu = $('.button-show-menu-main')
  var buttonHideMenu = $('.button-hide-menu-main')

  buttonShowMenu.on('click', function () {
        // $(".nav-items-affix").toggleClass("hide");
        // $('.nav-items-affix').toggle('slow');
        // $(".nav-items-affix").slideToggle();
        // $(".nav-items-affix").animate({ height: 'toggle' });

    $(this).addClass('hide')
    buttonHideMenu.removeClass('hide')

    affix.find('.menu-main').animate({
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

    affix.find('.menu-main').animate({
      height: 'toggle'
    },
         600,
        'easeOutExpo',
        function () {
            // do something or nothing.
        })
    return false
  })

    // Hack to fix issue when you start on a small screen.
  var startAtSmall = false
  var hackDone = false
  if (getZFcurrentMediaQuery() === 'small') {
    startAtSmall = true
  }

  window.addEventListener('resize', () => {
    var current = getZFcurrentMediaQuery()

    if (current === 'medium' || current === 'large' || current === 'xlarge' || current === 'xxlarge') {
      if (startAtSmall === true && hackDone === false) {
        adjustDropDown()

        affix.find('.menu-main').replaceWith(target.find('.menu-main').clone(true))
        affix.find('.menu-main').animate({height: 'toggle'}, 600, 'easeOutExpo', function () {})
        hackDone = true
      }
    }
  })

    // Show/ hide menu mobile.
  var buttonShowMenuMobile = $('.button-show-menu-mobile')
  var buttonHideMenuMobile = $('.button-hide-menu-mobile')
  var aside = $('.navbar-aside')

    // Do it from server side script which is easier.
    // clone.removeAttr("data-dropdown-menu");
    // clone.removeAttr("data-opacity-target");
    // clone.attr("data-accordion-menu");
    // clone.removeClass("align-center dropdown hide-for-small-only menu-main navbar-items");
    // clone.addClass("vertical menu-main-aside");
    // console.log(clone.wrap('<div></div>').parent().html());
    // target.replaceWith(clone);
    // target.append(clone);
    // console.log($(".menu-main-aside").wrap('<div></div>').parent().html());

  buttonShowMenuMobile.on('click', function () {
    buttonShowMenuMobile.addClass('hide')

    aside.fadeIn('fast', function () {
            // do something or nothing.
    })

    aside.find('.menu-block-aside').animate({
      width: 'toggle'
    },
         600,
        'easeOutExpo',
        function () {
            // do something or nothing.
        })

    return false
  })

  buttonHideMenuMobile.on('click', function () {
    buttonShowMenuMobile.removeClass('hide')

    aside.find('.menu-block-aside').animate({
      width: 'toggle'
    },
         600,
        'easeOutExpo',
        function () {
            // do something or nothing.
        })

    aside.fadeOut('fast', function () {
            // do something or nothing.
    })

    return false
  })

    // Scroll up.
  var position = $('main').position()
  var scrollUp = $('.button-arrow-up')
  window.addEventListener('scroll', function () {
    var height = $(window).scrollTop()
    if (height > position.top) {
      scrollUp.fadeIn('slow')
            // scrollUp.fadeTo("slow", 1);
    } else {
      scrollUp.fadeOut('slow')
            // scrollUp.fadeTo("slow", 0);
    }
  })
  scrollUp.click(function () {
        // Must add 'html' to the target for Firefox.
    $('body, html').animate({ scrollTop: 0 },
          600,
          'easeOutExpo',
        function () {
            //
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
