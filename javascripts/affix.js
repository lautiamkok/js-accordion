'use strict'

import $ from 'jquery'
import 'jquery-ui-bundle'

import { getZFcurrentMediaQuery } from './utils'
import adjustDropDown from './adjustDropDown'

// Create affix and clone target.
export default function Affix () {
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
}
