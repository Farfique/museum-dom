import Pagination from "./js/pagination.js";
import video from "./js/video.js";



Pagination('#welcome-slider', 'welcome');
video();

const menuItems = document.querySelectorAll('.menu-item');
const menuToggle = document.querySelector('#menu__toggle');

menuItems.forEach((menuItem) => {
  menuItem.addEventListener('click', () => {
    menuToggle.checked = false;
  })
})