const playPauseBtn = document.getElementById('play-pause');
const nextBtn = document.getElementById('next');
const previousBtn = document.getElementById('previous');
const albumArt = document.querySelector('.album-art');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const progressBar = document.querySelector('.progress-bar');
const progressContainer = document.querySelector('.progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');

let music = new Audio();
let isPlaying = false;
let currentSongIndex = 0;

const playlist = [
    {
        name: 'In the End',
        artist: 'Linkin Park',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        image: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Linkin_Park_In_the_End_CD_single.jpg'
    },
    {
        name: 'The Scientist',
        artist: 'Coldplay',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/TheScientist.jpg/220px-TheScientist.jpg'
    },
    {
        name: 'Shape of My Heart',
        artist: 'Sting',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        image: 'https://upload.wikimedia.org/wikipedia/en/e/e5/Sting_-_Shape_of_My_Heart.png'
    }
];

function loadSong(song) {
    music.src = song.src;
    songTitle.textContent = song.name;
    artistName.textContent = song.artist;
    albumArt.src = song.image;
    music.load(); // Loads the new song
}

function playSong() {
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    music.pause();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(playlist[currentSongIndex]);
    playSong();
}

function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(playlist[currentSongIndex]);
    playSong();
}

function updateProgress() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Update song time display
    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    currentTimeEl.textContent = `${minutes}:${seconds}`;

    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
    if (duration) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = music.duration;
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
playPauseBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
nextBtn.addEventListener('click', nextSong);
previousBtn.addEventListener('click', previousSong);
volumeSlider.addEventListener('input', (e) => (music.volume = e.target.value));
music.addEventListener('timeupdate', updateProgress);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgress);

// Initial load
loadSong(playlist[currentSongIndex]);