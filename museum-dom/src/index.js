import Pagination from "./js/pagination.js";
import buyTickets from "./js/tickets.js";
import video from "./js/video.js";
import compare from "./js/explore-compare";




Pagination('#welcome-slider', 'welcome');
video();
buyTickets();
compare();

const menuItems = document.querySelectorAll('.menu-item');
const menuToggle = document.querySelector('#menu__toggle');

menuItems.forEach((menuItem) => {
  menuItem.addEventListener('click', () => {
    menuToggle.checked = false;
  })
});
