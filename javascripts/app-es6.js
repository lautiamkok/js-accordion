'use strict'

// Import node modules.
import DocReady from 'es6-docready'
import $ from 'jquery'
import 'foundation-sites'

// Import custom modules.
// You need to import modules with './' because they don't reside in node_modules.
import SwipeImage from './SwipeImage'
import { getZFcurrentMediaQuery } from './utils'
import scrollUp from './scrollUp'
import adjustDropDown from './adjustDropDown'
import affix from './affix'
import aside from './aside'
import search from './search'
import overlay from './overlay'
import scrollbarCustom from './scrollbarCustom'

// Must wait until DOM is ready before initiating the modules.
// <script> tag doc readcy.
// https://www.npmjs.com/package/docready
// https://stackoverflow.com/questions/45501939/es6-docready-uncaught-typeerror-0-docready2-default-is-not-a-function
// ES6 doc ready.
// https://www.npmjs.com/package/es6-docready
DocReady(() => {
  console.log("DOM is ready. Let's party")
  $(document).foundation()

  let swiper = new SwipeImage()

  adjustDropDown()
  scrollUp()
  affix()
  aside()
  search()
  overlay()
  scrollbarCustom()

  window.addEventListener('resize', () => {
    var current = getZFcurrentMediaQuery()
    console.log('Screen size: ' + current)
  })

  // https://stackoverflow.com/questions/10328665/how-to-detect-browser-minimize-and-maximize-state-in-javascript
  document.addEventListener('visibilitychange', () => {
    console.log(document.hidden, document.visibilityState)
  }, false)
})
