class AudioPlayer {
    constructor() {
        this.songs = [
            {
                name: "Bầu trời mới",
                singer: "Raftaar x Fortnite",
                path: "./mp3/BauTroiMoi-DaLABMinhTocLam-16286137.mp3",
                image: "image/img.png"
            },
            {
                name: "Điều Anh Mong",
                singer: "Raftaar x Salim Merchant x Karma",
                path: "./mp3/DieuAnhMong-Czee-16035892.mp3",
                image: "image/img_1.png"
            }
        ];
        this.currentIndex = 0;
        this.isPlaying = false;

        this.audio = document.getElementById('audio');
        this.cdThumbImg = document.querySelector('.thumb_img');
        this.playBtn = document.querySelector('.btn-toggle-play');
        this.iconPlay = document.querySelector('.icon-play');
        this.iconPause = document.querySelector('.icon-pause');
        this.nextBtn = document.querySelector('.btn-next');
        this.prevBtn = document.querySelector('.btn-prev');
        this.playList = document.querySelector('.playlist');
        this.currentTimeEl = document.getElementById('current-time');
        this.durationTimeEl = document.getElementById('duration-time');
        this.progressContainer = document.getElementById('progress-container');
        this.progressBar = document.getElementById('progress-bar');

        this.init();
    }

    init() {
        this.loadSong(this.songs[this.currentIndex]);
        this.playBtn.addEventListener('click', this.togglePlayPause.bind(this));
        this.nextBtn.addEventListener('click', this.nextSong.bind(this));
        this.prevBtn.addEventListener('click', this.prevSong.bind(this));
        this.audio.addEventListener('timeupdate', this.updateProgress.bind(this));
        this.progressContainer.addEventListener('click', this.setProgress.bind(this));

        this.listMusic();
    }

    loadSong(song) {
        this.audio.src = song.path;
        this.cdThumbImg.src = song.image;
        this.displaySongInfo(song);
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.audio.pause();
            this.iconPause.style.display = 'none';
            this.iconPlay.style.display = 'inline-block';
        } else {
            this.audio.play();
            this.iconPlay.style.display = 'none';
            this.iconPause.style.display = 'inline-block';
        }
        this.isPlaying = !this.isPlaying;
    }

    duplicateThisSong() {
        this.loadSong(this.songs[this.currentIndex]);
        this.highlightCurrentSong();
        this.audio.play();
        this.isPlaying = true;
        this.iconPlay.style.display = 'none';
        this.iconPause.style.display = 'inline-block';
    }

    nextSong() {
        this.currentIndex++;
        if (this.currentIndex > this.songs.length - 1) this.currentIndex = 0;
        this.duplicateThisSong()
    }

    prevSong() {
        this.currentIndex--;
        if (this.currentIndex < 0) this.currentIndex = this.songs.length - 1;
        this.duplicateThisSong()
    }

    updateProgress() {
        if (this.audio.duration) {
            const progressPercent = (this.audio.currentTime / this.audio.duration) * 100;
            this.progressBar.style.width = `${progressPercent}%`;
            this.updateTimeDisplay();
        }
    }

    setProgress(e) {
        const width = this.progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = this.audio.duration;
        this.audio.currentTime = (clickX / width) * duration;
    }

    updateTimeDisplay() {
        this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
        this.durationTimeEl.textContent = this.formatTime(this.audio.duration);
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    displaySongInfo(song) {
        const songTitle = document.querySelector('header h2');
        const songSinger = document.querySelector('header h4');

        songTitle.textContent = song.name;
        songSinger.textContent = song.singer;
    }

    highlightCurrentSong() {
        const allSongs = document.querySelectorAll('.song');
        allSongs.forEach(song => song.classList.remove('active'));
        const currentSong = document.querySelector(`.song[data-index="${this.currentIndex}"]`);
        currentSong.classList.add('active');
    }

    listMusic() {
        this.playList.innerHTML = '';
        this.songs.forEach((song, index) => {
            const item = document.createElement('div');
            item.classList.add('song');
            item.setAttribute('data-index', index);
            item.innerHTML = `
              <div class="thumb" style="background-image: url('${song.image}')"></div>
              <div class="body">
                  <h3 class="title">${song.name}</h3>
                  <p class="author">${song.singer}</p>
              </div>
            `;

            this.playList.appendChild(item);
            if (index === 0) item.classList.add('active');
            item.addEventListener('click', () => {
                this.currentIndex = index;
                this.duplicateThisSong()
            });
        });
    }
}

class UploadManager {
    constructor(audioPlayer) {
        this.audioPlayer = audioPlayer;
        this.modal = document.getElementById('upload_modal');
        this.uploadBtn = document.querySelector('button');
        this.closeBtn = document.querySelector('.close');
        this.uploadForm = document.getElementById('upload_form');

        this.init();
    }

    init() {
        this.uploadBtn.addEventListener('click', () => {
            this.modal.style.display = 'block';
        });

        this.closeBtn.addEventListener('click', () => {
            this.modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === this.modal) this.modal.style.display = 'none';
        });

        this.uploadForm.addEventListener('submit', this.handleUpload.bind(this));
    }

    handleUpload(e) {
        e.preventDefault();

        const newSongName = document.getElementById('songName').value;
        const newSinger = document.getElementById('singer').value;
        const mp3File = document.getElementById('fileUpload').files[0];
        const imageFile = document.getElementById('imageUpload').files[0];

        const audioURL = URL.createObjectURL(mp3File);
        const imageURL = URL.createObjectURL(imageFile);

        const newSong = {
            name: newSongName,
            singer: newSinger,
            path: audioURL,
            image: imageURL
        };

        this.audioPlayer.songs.push(newSong);
        this.audioPlayer.playList.innerHTML = '';
        this.audioPlayer.listMusic();
        this.modal.style.display = 'none';
        this.uploadForm.reset();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const player = new AudioPlayer();
    new UploadManager(player);
});
