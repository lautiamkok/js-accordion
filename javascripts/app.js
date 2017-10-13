'use strict'

// Import 'babel-polyfill' at the top so you can write async-await.
import 'babel-polyfill'

// Import essential dependent node modules.
import DocReady from 'es6-docready'
import $ from 'jquery'
import 'jquery-ui-bundle'
import Foundation from 'foundation-sites'
import Vue from 'vue/dist/vue.js'
import AOS from 'aos'
import axios from 'axios'

// Must wait until DOM is ready before initiating the modules.
DocReady(async () => {
  console.log("DOM is ready. Let's party")

  // Render template with Vue.
  // Get json of catering menu.
  var element = document.getElementById('food-catering')
  if (element !== null) {
    var getData = await axios.get('./food-catering.json')
    var cateringMenu = new Vue({
      el: '#food-catering',
      data: {
        items: getData.data
      }
    })
  }

  // Render template with Vue.
  // Get json of catering menu.
  var element = document.getElementById('food-lunch')
  if (element !== null) {
    var getData = await axios.get('./food-lunch.json')
    var cateringFood = new Vue({
      el: '#food-lunch',
      data: {
        items: getData.data
      }
    })
  }

  // Create the accordion menu with jQuery.
  // Make sure to hide it on medium screen and up.
  $('.accordion').accordion({
    heightStyle: 'content',
    collapsible: true
  })

  // Initiate foundation.
  // Must do it after Vue has rendered the view.
  $(document).foundation()

  // Get Z Foundation media query screen size.
  // http://foundation.zurb.com/sites/docs/javascript-utilities.html#mediaquery
  function getZFcurrentMediaQuery () {
    return Foundation.MediaQuery.current
  }

  window.addEventListener('resize', () => {
    var current = getZFcurrentMediaQuery()
    console.log('Screen size: ' + current)
  })

  // https://stackoverflow.com/questions/10328665/how-to-detect-browser-minimize-and-maximize-state-in-javascript
  document.addEventListener('visibilitychange', () => {
    console.log(document.hidden, document.visibilityState)
  }, false)

  // AOS scroll reveal.
  // http://michalsnik.github.io/aos/
  // https://css-tricks.com/aos-css-driven-scroll-animation-library/
  AOS.init({
    duration: 1200
  })
})
