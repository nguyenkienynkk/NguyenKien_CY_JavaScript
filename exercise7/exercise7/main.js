function Observe() {
    this.listeners = {
        play: new Set(),
        pause: new Set(),
        next: new Set(),
        prev: new Set(),
    };

    this.subscribe = function (eventName, listener) {
        this.listeners[eventName].add(listener);
    };

    this.unsubscribe = function (eventName, listener) {
        this.listeners[eventName].delete(listener);
    };

    this.notify = function (eventName) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach(listener => listener());
        }
    };
}


const listTrackPath = [{
    name: "Lose Yourself", artist: "Eminem", path: "tracks/lose_yourself.mp3",
}, {
    name: "When Im gone", artist: "Eminem", path: "tracks/when_im_gone.mp3",
}];

let audio = null;
const musicPlayerControlsPlay = document.querySelector('.music_player__controls__btn_play');
const musicPlayerControlsNext = document.querySelector('.music_player__controls__btn_next');
const musicPlayerControlsPrev = document.querySelector('.music_player__controls__btn_prev');
const musicPlayerProgressBarCurrent = document.querySelector('.music_player__progress__bar__current');
const musicPlayerProgressBar = document.querySelector('.music_player__progress__bar');
const musicPlayerThumb = document.querySelector('.music_player__progress__bar__thumb');
const musicPlayerProgressTimeCurrent = document.querySelector('.music_player__progress__time__current');
const musicPlayerProgressTimeDuration = document.querySelector('.music_player__progress__time__duration');

const currentTrackIndex = new Proxy({
    value: 0
}, {
    set(target, key, value) {
        target[key] = value;
        currentTrack.value = listTrackPath[value];
        document.querySelectorAll('.music_player__list_tracks__track').forEach((trackElement) => {
            trackElement.classList.remove('music_player__list_tracks__track--active');
        });
        document.querySelector(`.music_player__list_tracks__track[data-index="${value}"]`).classList.add('music_player__list_tracks__track--active');
        return true;
    }
})

let timerInterval = null;
const isPlay = new Proxy({value: false}, {
    set(target, key, value) {
        target[key] = value;
        if (value) {
            pubSub.notify('play');
        } else {
            pubSub.notify('pause');
        }
        return true;
    }
});

const currentTrack = new Proxy({value: 0}, {
    set(target, key, value) {
        target[key] = value;
        if (!audio) {
            initPlayer();
            isPlay.value = true;
        } else {
            audio.pause();
            audio.src = value.path;
            isPlay.value = true;
        }
        return true;
    }
});


function renderPlayButton() {
    musicPlayerControlsPlay.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                 class="icon icon-tabler icons-tabler-filled icon-tabler-player-play">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"/>
            </svg>`;
}

function renderPauseButton() {
    musicPlayerControlsPlay.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-player-pause"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" /><path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" /></svg>`
}

function renderProgressBar() {
    musicPlayerProgressBarCurrent.style.width = '0%';
    timerInterval = requestAnimationFrame(function updateProgress() {
        const progress = audio.currentTime / audio.duration * 100;
        musicPlayerProgressBarCurrent.style.width = `${progress}%`;
        musicPlayerThumb.style.left = `${progress}%`;
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60);
        musicPlayerProgressTimeCurrent.innerHTML = `${minutes}:${seconds}`;
        timerInterval = requestAnimationFrame(updateProgress);
    });

    let _isDragAble = false;

    function _dragStart() {
        _isDragAble = true;
        isPlay.value = false;
        document.addEventListener('mousemove', _dragging);
        document.addEventListener('mouseup', _dragEnd);
    }

    function _dragEnd() {
        if (_isDragAble) {
            document.removeEventListener('mousemove', _dragging);
            document.removeEventListener('mouseup', _dragEnd);
            isPlay.value = true;
        }
        _isDragAble = false;
    }

    function _dragging(event) {
        if (_isDragAble) {
            const rect = musicPlayerProgressBar.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const width = rect.width;
            const progress = Math.max(0, Math.min(x / width * 100, 100));
            audio.currentTime = audio.duration * progress / 100;
            musicPlayerProgressBarCurrent.style.width = `${Math.ceil(progress)}%`;
        }
    }

    musicPlayerThumb.addEventListener('mousedown', _dragStart);
}

let pubSub = null;
function initSubscribers() {
    pubSub = new Observe();
    pubSub.subscribe('play', () => {
        audio?.play();
    });
    pubSub.subscribe('play', renderPauseButton);
    pubSub.subscribe('play', renderProgressBar);


    pubSub.subscribe('pause', renderPlayButton);
    pubSub.subscribe('pause', () => {
        audio?.pause();
    });
}

function initPlayList() {
    listTrackPath.forEach((track, index) => {
        const trackElement = document.createElement('div');
        trackElement.classList.add('music_player__list_tracks__track');
        trackElement.setAttribute('data-index', index);
        trackElement.innerHTML = `<div class="music_player__list_tracks__track__name">${track.name}</div>
        <div class="music_player__list_tracks__track__artist">${track.artist}</div>`;
        document.querySelector('.music_player__list_tracks').appendChild(trackElement);
    });


    document.querySelectorAll('.music_player__list_tracks__track').forEach((trackElement) => {
        trackElement.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();
            currentTrackIndex.value = parseInt(trackElement.getAttribute('data-index'));
        });
    });
}

function initPlayer() {
    audio = new Audio(currentTrack.value.path);
    audio.onended = () => {
        audio.src = currentTrack.value.path;
        audio.play();
    }
    musicPlayerControlsPlay.addEventListener('click', () => {
        isPlay.value = !isPlay.value;
    });

    audio.addEventListener('loadedmetadata', () => {
        const duration = audio.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        musicPlayerProgressTimeDuration.innerHTML = `${minutes}:${seconds}`;
    });

    musicPlayerControlsNext.addEventListener('click', () => {
        currentTrackIndex.value = currentTrackIndex.value < listTrackPath.length - 1 ? currentTrackIndex.value + 1 : 0;
    });

    musicPlayerControlsPrev.addEventListener('click', () => {
        currentTrackIndex.value = currentTrackIndex.value > 0 ? currentTrackIndex.value - 1 : listTrackPath.length - 1;
    });
}

initPlayList();
initSubscribers();

