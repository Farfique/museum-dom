import Pagination from './pagination';

export default function video() {
    Pagination('#playlist-slider', 'video');

    let postersSrc = ["assets/video/poster0.jpeg",
    "assets/video/poster1.jpeg",
    "assets/video/poster2.jpeg",
    "assets/video/poster3.jpeg",
    "assets/video/poster4.jpeg"]

    let videoSrc = ["assets/video/video0.mp4",
    "assets/video/video1.mp4",
    "assets/video/video2.mp4",
    "assets/video/video3.mp4",
    "assets/video/video4.mp4"]

    let slider = document.querySelector('#playlist-slider');
    let activeSlide;
    console.log("active slide = ", activeSlide);

    let mainVideo = document.querySelector('.main-video');
    buildView();
    initializeMainVideo();



    slider.addEventListener('changeActiveSlide', (e) => {
        console.log('active slide has changed');
        buildView();

    });

    function buildView(){
        activeSlide = slider.querySelector('.active-slide');
        
        let wrapper = slider.querySelector('.slider-wrapper');
        let indexActive = Array.prototype.indexOf.call(wrapper.children, activeSlide);
        mainVideo.setAttribute('src', videoSrc[indexActive]);
        mainVideo.setAttribute('poster', postersSrc[indexActive]);

        Array.prototype.forEach.call(wrapper.children, (slide, index) => {
            slide.classList.remove('slide-column1', 'slide-column2', 'slide-column3', 'slide-nocolumn');

            if (index == indexActive){
                slide.classList.add('slide-column1');
            }
            else if (index == indexActive + 1 || (indexActive + 1) == wrapper.children.length && index == 0){
                slide.classList.add('slide-column2');
            }
            else if (index == indexActive + 2 || (indexActive + 2) == wrapper.children.length && index == 0 || (indexActive + 2) == wrapper.children.length + 1 && index == 1 ){
                slide.classList.add('slide-column3');
            }
            else {
                slide.classList.add('slide-nocolumn');
            }

        }
           

        );

        let changedVideoEvent = new Event('mainVideoChanged', {bubbles: true});
        slider.dispatchEvent(changedVideoEvent); 

    }

    function initializeMainVideo(){
        let videoContainer = document.querySelector('.video-player');
        let video = document.querySelector('.current-video');
        let playerControls = document.querySelector('.player-controls');
        let cachedVolume = 30;


        var supportsVideo = !!document.createElement('video').canPlayType;
        if (supportsVideo) {
            let playBigBtn = videoContainer.querySelector('.play-video-big-btn');
            let playSmallBtn = playerControls.querySelector('.player-play-btn');
            let playerTimeRange = playerControls.querySelector('.player-time-range');
            let volumeBtn = playerControls.querySelector('.player-volume-btn');
            let playerVolumeRange = playerControls.querySelector('.player-volume-range');
            let fullscreenBtn = playerControls.querySelector('.player-fullscreen');
            let playbackMessage = videoContainer.querySelector('.playback-ratio');


            function playPauseVideo(){
                if (video.paused || video.ended) {
                    video.play();
                    playBigBtn.style.display = 'none';
                    playSmallBtn.firstChild.setAttribute('src', 'assets/svg/pause.svg');

                    let eventPlay = new Event('mainVideoPlay');
                    video.dispatchEvent(eventPlay);
                }
                else {
                    video.pause();
                    playBigBtn.style.display = 'block';
                    playSmallBtn.firstChild.setAttribute('src', 'assets/svg/play-small.svg');
                }
                    
            }
            function mute(){
                video.muted = !video.muted;
                if (!video.muted){
                    playerVolumeRange.value = cachedVolume;
                    volumeBtn.firstChild.setAttribute('src', 'assets/svg/volume.svg');
                    
                }
                else {
                    cachedVolume = playerVolumeRange.value;
                    playerVolumeRange.value = 0;
                   
                    volumeBtn.firstChild.setAttribute('src', 'assets/svg/mute.svg'); 
                }      
                updateVolumeRangeStyle(playerVolumeRange.value);
            }

            let videoCachedWidth = videoContainer.querySelector('.video').style.maxWidth;
            let playerControlsCachedWidth = playerControls.style.width;

            function toggleFullscreen() {              
                if (!document.fullscreenElement) {
                    videoContainer.requestFullscreen().then(() => {
                        fullscreenBtn.firstChild.setAttribute('src', 'assets/svg/fullscreen_exit.svg');
                        videoCachedWidth = videoContainer.querySelector('.video').style.maxWidth;
                        videoContainer.querySelector('.video').style.maxWidth = '100%';
                        playerControlsCachedWidth = playerControls.style.width;
                        playerControls.style.width = '100%';
                        playerControls.style.position = 'absolute';
                        playerControls.style.bottom = '0';
                    })
                    .catch(err => {
                    alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                  });
                } else {
                  document.exitFullscreen().then(() => {
                    fullscreenBtn.firstChild.setAttribute('src', 'assets/svg/fullscreen-icon.svg');
                    videoContainer.querySelector('.video').style.maxWidth = videoCachedWidth;
                    playerControls.style.width = playerControlsCachedWidth;
                    playerControls.style.position = 'relative';
                  });
                }
              }

            video.addEventListener('click', playPauseVideo);
            playBigBtn.addEventListener('click', playPauseVideo);
            playSmallBtn.addEventListener('click', playPauseVideo);
            volumeBtn.addEventListener('click', mute);
            fullscreenBtn.addEventListener('click', toggleFullscreen);

            

            function updateTimeRangeStyle(inputValue){
                const value = inputValue/playerTimeRange.max * 100;
                playerTimeRange.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
            }

            function updateVolumeRangeStyle(inputValue){
                const value = inputValue;
                playerVolumeRange.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
            }
  
            playerTimeRange.addEventListener('input', function () {
                video.currentTime = this.value;
                updateTimeRangeStyle(this.value);
                console.log("this.value = ", this.value);
                console.log('max = ', playerTimeRange.max);
                if (this.value == Math.floor(playerTimeRange.max)){
                    playerTimeRange.value = playerTimeRange.max;
                    video.currentTime = playerTimeRange.max;
                    updateTimeRangeStyle(playerTimeRange.max);
                    playBigBtn.style.display = 'block';
                    playSmallBtn.firstChild.setAttribute('src', 'assets/svg/play-small.svg');
                }
            });
            
            playerVolumeRange.addEventListener('input', function() {
                video.volume = this.value/100;
                updateVolumeRangeStyle(this.value);

                if (this.value == 0){
                    video.muted = true;
                    cachedVolume = 0;
                    volumeBtn.firstChild.setAttribute('src', 'assets/svg/mute.svg');
                }
                else {
                    video.muted = false;
                    volumeBtn.firstChild.setAttribute('src', 'assets/svg/volume.svg');
                }
            })

            slider.addEventListener('mainVideoChanged', () => {
                console.log("main video has changed");

                

            })

            video.addEventListener('timeupdate', function() {
                if (!playerTimeRange.getAttribute('max')) playerTimeRange.setAttribute('max', video.duration);
                playerTimeRange.value = video.currentTime;
                updateTimeRangeStyle(playerTimeRange.value);
             });

            video.addEventListener('loadedmetadata', function() {
                console.log("loaded metadata");

                playBigBtn.style.display = 'block';
                volumeBtn.firstChild.setAttribute('src', 'assets/svg/volume.svg');
                playSmallBtn.firstChild.setAttribute('src', 'assets/svg/play-small.svg');
                playerTimeRange.setAttribute('max', video.duration);
                playerTimeRange.value = 0;
                updateTimeRangeStyle(playerTimeRange.value);
             });

             document.addEventListener('keydown', (e) => {

                console.log("key code = ", e.code);

                if (e.code == 'Comma' && e.shiftKey){
                    console.log('speed up!');
                    video.playbackRate += (video.playbackRate < 2.0)? 0.25 : 0;
                    playbackMessage.innerText = video.playbackRate + "x";
                    playbackMessage.style.display = 'inline-block';
                    setTimeout(() => {
                        playbackMessage.style.display = 'none';
                    }, 1000);

                }
                if (e.code == 'Period' && e.shiftKey){
                    console.log('slow down!');
                    video.playbackRate -= (video.playbackRate > 0.25)? 0.25 : 0;
                    playbackMessage.innerText = video.playbackRate + "x";
                    playbackMessage.style.display = 'inline-block';
                    setTimeout(() => {
                        playbackMessage.style.display = 'none';
                    }, 1000);
                }
                if (e.code == 'Space'){
                    e.preventDefault();
                    console.log('pause / play');
                    playPauseVideo();
                }
                if (e.code == 'KeyM'){
                    console.log("MUTE!");
                    mute();
                }
                if (e.code == 'KeyF'){
                    console.log('FULLSCREEN!');
                    toggleFullscreen();
                }
             });



        }

    }



}