import Pagination from "./js/pagination.js";

const playerTimeRange = document.querySelector('.player-time-range');
  
playerTimeRange.addEventListener('input', function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #ffffff ${value}%, #ffffff 100%)`
});

const playerVolumeRange = document.querySelector('.player-volume-range');
  
playerVolumeRange.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #ffffff ${value}%, #ffffff 100%)`
})

Pagination();