let openBtn = document.querySelector('.toggle-open-btn');
let closeBtn = document.querySelector('.toggle-close-btn');
let target = document.querySelector('.nav-container');


openBtn.addEventListener('click', toggleNav);
closeBtn.addEventListener('click', toggleNav);

function toggleNav(){
    openBtn.classList.toggle('d-none');
    closeBtn.classList.toggle('d-none');
    target.classList.toggle('d-none');
}