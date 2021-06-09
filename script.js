'use strict';

////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
    e.preventDefault()
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

////////////////////////////
// Add and Remove cookie box

const message = document.createElement('div')
const header = document.querySelector('.header')
message.classList.add('cookie-message')
message.innerHTML =  'We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>'
message.style.backgroundColor = '#37383d'
message.style.width = '105%'
// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'
message.style.height = getComputedStyle(message).height + '80px'

header.prepend(message)

document.querySelector('.btn--close--cookie').addEventListener('click', function() {
    message.remove()
})

///////////////////////////
// Smooth scrolling buttons

const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

btnScrollTo.addEventListener('click', function (e) {
    section1.scrollIntoView({ behavior: 'smooth' });
  });

  ////////////////////////////
  // Page navigation (old way)

//   document.querySelectorAll('.nav__link').forEach(function(el) {
//       el.addEventListener('click', function (e) {
//         e.preventDefault()  
//         const id = this.getAttribute('href')
//         document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//       })
//   })

// Better way:
//Event delegation: page navigation
//1. Add event listener to common parent element
//2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault() 
    // Matching stratey
    if(e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href')
        document.querySelector(id).scrollIntoView({behavior: 'smooth'})
    }
})

////////////////////
// Tabbed components

const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

tabsContainer.addEventListener('click', function(e) {
    const clicked = e.target.closest('.operations__tab')

    // Guard clause
    if(!clicked) return
    // Active tab
    tabs.forEach(t => t.classList.remove('operations__tab--active'))
    tabsContent.forEach(c => c.classList.remove('operations__content--active'))
    clicked.classList.add('operations__tab--active')
    // Activate content area
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})


//////////////////
// Menu fade animation
const nav = document.querySelector('.nav')

const handleHover = function(e) {
    if(e.target.classList.contains('nav__link')) {
        const link = e.target
        const siblings = link.closest('.nav').querySelectorAll('.nav__link')
        const logo = link.closest('.nav').querySelector('img')
    
        siblings.forEach(el => {
            if(el !== link) el.style.opacity = this
        })
        logo.style.opacity = this
    }
}

// Passing "argument" into handler using bind() and this:
nav.addEventListener('mouseover', handleHover.bind(0.5))

nav.addEventListener('mouseout', handleHover.bind(1))


//////////////////
// Sticky navigation

// // Poor performance on smartphones: 
// const initialcoords = section1.getBoundingClientRect()

// window.addEventListener('scroll', function() {
//     if(window.scrollY > initialcoords.top) nav.classList.add('sticky') 
//     else nav.classList.remove('sticky')
// })

//Intersection Observer API

const headerSection = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height

const stickyNav = function(entries) {
    const [entry] = entries

    if(!entry.isIntersecting) nav.classList.add('sticky')
    else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
})

headerObserver.observe(headerSection)


///////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section')

const revealSection = function(entries, observer) {
    const [entry] = entries

    if(!entry.isIntersecting) return

    entry.target.classList.remove('section--hidden')
    observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
})

allSections.forEach(function(section) {
    sectionObserver.observe(section)
    section.classList.add('section--hidden')
})