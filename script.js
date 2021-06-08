'use strict';

///////////////////////////////////////
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

// Add and Remove cookie box

const message = document.createElement('div')
const header = document.querySelector('.header')
message.classList.add('cookie-message')
message.innerHTML =  'We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>'
message.style.backgroundColor = '#37383d'
// message.style.width = '105%'
// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'

message.style.height = getComputedStyle(message).height + '80px'

header.append(message)

document.querySelector('.btn--close--cookie').addEventListener('click', function() {
    message.remove()
})

// Smooth scrolling buttons

const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

btnScrollTo.addEventListener('click', function (e) {
    section1.scrollIntoView({ behavior: 'smooth' });
  });