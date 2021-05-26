const LANGCODE = window.location.pathname.split('/')[1]
let currentPostDate = document.getElementById('post-date')
let relatedPostsDates = document.getElementsByClassName('related-post-date')
let recentPostsDates = document.getElementsByClassName('m-recent-article__date')
let translatedPostDate = ''

waitForMoment()

function waitForMoment() {
    if (typeof moment !== 'undefined') {
        if (LANGCODE == 'jp' || LANGCODE == 'kr' || LANGCODE == 'cn') {
            //translate current post date
            if (currentPostDate) translateDate(document.getElementById('post-date'), LANGCODE)
            //translate related posts date
            if (relatedPostsDates)
                Array.from(relatedPostsDates).forEach((relatedPostDate) => {
                    translateDate(relatedPostDate, LANGCODE)
                })
            if (recentPostsDates)
                Array.from(recentPostsDates).forEach((recentPostsDate) => {
                    translateDate(recentPostsDate, LANGCODE)
                })
        }
    } else {
        setTimeout(waitForMoment, 100)
    }
}

function translateDate(element, langcode) {
    switch (langcode) {
        case 'cn':
            moment.locale('zh-cn')
            translatedPostDate = moment(element.innerHTML).format('LL')
            break
        case 'kr':
            moment.locale('ko')
            translatedPostDate = moment(element.innerHTML).format('LL')
            break
        case 'jp':
            moment.locale('ja')
            translatedPostDate = moment(element.innerHTML).format('LL')
            break
    }
    element.innerHTML = translatedPostDate
}
