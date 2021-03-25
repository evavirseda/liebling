const LANGCODE = window.location.pathname.split('/')[1]
let currentPostDate = document.getElementById("post-date").innerHTML
let relatedPostsDates = document.getElementsByClassName("related-post-date")
let translatedPostDate = ''

function translate(element, langcode){
    switch(langcode){
        case 'chi':
            moment.locale('zh-cn')
            translatedPostDate= moment(currentPostDate).format('LL')
            break;
        case 'ko':
            moment.locale('ko')
            translatedPostDate= moment(currentPostDate).format('LL')
            break;
        case 'ja':
            moment.locale('ja')
            translatedPostDate= moment(currentPostDate).format('LL')
            break;
    }
    element.innerHTML = translatedPostDate;
}

if(LANGCODE != 'en'){
    //translate current post date
    translate(document.getElementById("post-date"), LANGCODE) 
    //translate related posts date
    Array.from(relatedPostsDates).forEach((relatedPostDate) => { translate(relatedPostDate, LANGCODE) });
}