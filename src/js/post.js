import $ from 'jquery'
import mediumZoom from 'medium-zoom'
import fitvids from 'fitvids'
import shave from 'shave'
import Glide, {
  Controls,
  Swipe,
  Breakpoints
} from '@glidejs/glide/dist/glide.modular.esm'
import {
  isRTL,
  isMobile,
  adjustImageGallery,
  managePostImages,
  makeImagesZoomable
} from './helpers'

let $aosWrapper = null
let $progressCircle = null
let lastScrollingY = window.pageYOffset
let lastWindowHeight = 0
let lastDocumentHeight = 0
let circumference = 0
let isTicking = false

const onScrolling = () => {
  lastScrollingY = window.pageYOffset
  requestTicking()
}

const adjustShare = (timeout) => {
  if (!isMobile('1023px')) {
    $('body').removeClass('share-menu-displayed')
  } else {
    $('body').addClass('share-menu-displayed')
    setTimeout(() => {
      $aosWrapper.removeAttr('data-aos')
    }, timeout)
  }
}

const onResizing = () => {
  setHeights()
  adjustShare(100)

  setTimeout(() => {
    setCircleStyles()
    requestTicking()
  }, 200)
}

const requestTicking = () => {
  if (!isTicking) {
    requestAnimationFrame(updating)
  }

  isTicking = true
}

const updating = () => {
  const progressMax = lastDocumentHeight - lastWindowHeight
  const percent = Math.ceil((lastScrollingY / progressMax) * 100)

  if (percent <= 100) {
    setProgress(percent)
  }

  isTicking = false
}

const setHeights = () => {
  lastWindowHeight = window.innerHeight
  lastDocumentHeight = $(document).height()
}

const setCircleStyles = () => {
  const svgWidth = $progressCircle.parent().width();
  const radiusCircle = svgWidth / 2
  const borderWidth = isMobile() ? 2 : 3

  $progressCircle.parent().attr('viewBox', `0 0 ${svgWidth} ${svgWidth}`)
  $progressCircle.attr('stroke-width', borderWidth)
  $progressCircle.attr('r', radiusCircle - (borderWidth - 1))
  $progressCircle.attr('cx', radiusCircle)
  $progressCircle.attr('cy', radiusCircle)

  circumference = radiusCircle * 2 * Math.PI

  $progressCircle[0].style.strokeDasharray = `${circumference} ${circumference}`
  $progressCircle[0].style.strokeDashoffset = circumference
}

const setProgress = (percent) => {
  if (percent <= 100) {
    const offset = circumference - percent / 100 * circumference
    $progressCircle[0].style.strokeDashoffset = offset
  }
}

const prepareProgressCircle = () => {
  $progressCircle = $('.js-progress')

  setHeights()
  setCircleStyles()
  updating()

  setTimeout(() => {
    $progressCircle.parent().css('opacity', 1)
  }, 300)
}

const hideHardCodedFollowUs = () => {
  $("p").filter(function () {
    const text = $(this).text();
    return text.includes("Follow us on our official channels") || text.includes("Follow the IOTA Foundation on our official channels");
  }).hide().next('p').hide();
}

$(() => {

  hideHardCodedFollowUs() 

  // --> post deprecation
    if ($('.disclamer-deprecated-post').length > 0) {
      addNoIndexMetaTag()
  } else {
    const postPublishedDate = new Date($('.js-date-published')[0].innerText).getTime()
    const today = new Date().getTime()
    // if a post is older than two years, add a disclaimer
    if (today - postPublishedDate > 2 * 365 * 24 * 60 * 60 * 1000) {
      $('#header').append(
        '<div class="disclamer-deprecated-post">Disclaimer: This blog post has been marked as deprecated, therefore some of the content might be out of date.</div>'
      )
      addNoIndexMetaTag()
    }
  }
  function addNoIndexMetaTag() {
    let metaElement = document.createElement('meta')
    metaElement.setAttribute('name', 'robots')
    metaElement.setAttribute('content', 'noindex, nofollow')
    document.getElementsByTagName('head')[0].prepend(metaElement)
  }
  // <-- end of post deprecation
  
  $aosWrapper = $('.js-aos-wrapper')
  const $scrollButton = $('.js-scrolltop')
  const $recommendedSlider = $('.js-recommended-slider')

  fitvids('.js-post-content')

  adjustImageGallery()
  adjustShare(1000)

  if ($recommendedSlider.length > 0) {
    const recommendedSlider = new Glide('.js-recommended-slider', {
      type: 'slider',
      rewind: false,
      perView: 3,
      swipeThreshold: false,
      dragThreshold: false,
      gap: 0,
      direction: isRTL() ? 'rtl' : 'ltr',
      breakpoints: {
        1023: {
          type: 'carousel',
          perView: 2,
          swipeThreshold: 80,
          dragThreshold: 120
        },
        720: {
          type: 'carousel',
          perView: 2,
          swipeThreshold: 80,
          dragThreshold: 120
        },
        568: {
          type: 'carousel',
          perView: 1,
          swipeThreshold: 80,
          dragThreshold: 120
        }
      }
    })

    const Length = (Glide, Components, Events) => {
      return {
        mount() {
          Events.emit('length.change', Components.Sizes.length)
        }
      }
    }

    recommendedSlider.on('mount.after', () => {
      shave('.js-article-card-title', 100)
      shave('.js-article-card-title-no-image', 250)
    })

    recommendedSlider.on('length.change', (length) => {
      if (length === 1) {
        recommendedSlider.update({ type: 'slider' })
        $recommendedSlider.find('.js-controls').remove()
      }
    })

    recommendedSlider.mount({ Controls, Swipe, Breakpoints, Length })
  }

  shave('.js-article-card-title', 100)
  shave('.js-article-card-title-no-image', 250)

  $scrollButton.on('click', () => {
    $('html, body').animate({
      scrollTop: 0
    }, 500)
  })

  managePostImages($)
  makeImagesZoomable($, mediumZoom)

  window.addEventListener('scroll', onScrolling, { passive: true })
  window.addEventListener('resize', onResizing, { passive: true })
})

const openExternalLinksInDifferentTab = () => {
  let links = $('a')
  $.each(links, function(index, value) {
      if (!value.href.includes(window.location.hostname)) {
          value.target = '_blank'
      }
  })
}

$(window).on('load', () => {
  prepareProgressCircle()
  openExternalLinksInDifferentTab()
})

