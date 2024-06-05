document.addEventListener('DOMContentLoaded', () => {
    // 获取播放器相关元素
    const player = document.getElementById('player');
    const audioPlayer = document.getElementById('audio-player');
    const modeBtn = document.getElementById('mode-btn');
    const modeSelect = document.getElementById('mode-select');
    const lyricsBtn = document.getElementById('lyrics-btn');
    const lyricsContainer = document.getElementById('lyrics-container');
    const toggleAlbumCollectionBtn = document.getElementById('toggle-album-collection');
    const albumCollection = document.getElementById('album-collection');
    const albumList = document.getElementById('album-list');

    // 创建折叠按钮并插入播放器中
    const collapseBtn = document.createElement('button');
    collapseBtn.id = 'collapse-btn';
    collapseBtn.textContent = '⏯️';
    collapseBtn.title = '折叠';
    player.insertBefore(collapseBtn, player.firstChild);

    // 初始化变量
    let playMode = 0; // 0: 列表循环, 1: 单曲循环, 2: 随机播放
    let isLyricsVisible = false;
    let currentAlbum = null;
    let songs = []; // 存储所有歌曲元素
    let playedIndices = new Set();

    // 初始化歌曲列表
    function initSongs() {
        songs = Array.from(document.querySelectorAll('.music-list li'));
        if (songs.length > 0) {
            const initialSong = songs[0];
            initialSong.classList.add('active');
            audioPlayer.src = initialSong.getAttribute('data-src');
            updateCurrentSong(initialSong.innerText);
            currentAlbum = initialSong.closest('.album').getAttribute('data-album');
            updateActiveAlbum(currentAlbum);
        }
    }

    // 折叠按钮点击事件
    collapseBtn.addEventListener('click', () => {
        const isCollapsed = player.classList.toggle('collapsed');
        collapseBtn.title = isCollapsed ? '默认模式' : '精简模式';
    });

    // 播放模式按钮点击事件
    modeBtn.addEventListener('click', () => {
        playMode = (playMode + 1) % 3;
        modeSelect.value = playMode;
        updateModeButton();
    });

    // 播放模式选择事件
    modeSelect.addEventListener('change', (e) => {
        playMode = parseInt(e.target.value, 10);
        updateModeButton();
    });

    // 更新播放模式按钮
    function updateModeButton() {
        const modes = ['🔁', '🔂', '🔀'];
        const titles = ['列表循环', '单曲循环', '随机播放'];
        modeBtn.textContent = modes[playMode];
        modeBtn.title = titles[playMode];
        audioPlayer.loop = playMode === 1;
    }

    // 歌词按钮点击事件
    lyricsBtn.addEventListener('click', () => {
        isLyricsVisible = !isLyricsVisible;
        lyricsContainer.style.display = isLyricsVisible ? 'block' : 'none';
        lyricsBtn.classList.toggle('active', isLyricsVisible);
        if (isLyricsVisible) {
            loadLyrics(document.querySelector('.active').getAttribute('data-lyrics'));
        }
    });

    // 初始化歌词容器隐藏状态
    lyricsContainer.style.display = 'none';

    // 专辑集合按钮点击事件
    toggleAlbumCollectionBtn.addEventListener('click', () => {
        const isVisible = albumCollection.style.display === 'block';
        albumCollection.style.display = isVisible ? 'none' : 'block';
        toggleAlbumCollectionBtn.title = isVisible ? '展开专辑列表合集' : '折叠专辑列表合集';
        updateAlbumDisplay();
    });

    // 更新当前播放歌曲名称
    function updateCurrentSong(songName) {
        const currentSongElement = document.getElementById('current-song');
        currentSongElement.textContent = songName;
        const scrollingText = document.querySelector('.scrolling-text');
        scrollingText.classList.remove('animate');
        void scrollingText.offsetWidth;
        scrollingText.classList.add('animate');
    }

    // 加载歌词
    function loadLyrics(lyricsSrc) {
        // 实现加载歌词逻辑
    }

    // 专辑列表点击事件
    albumList.addEventListener('click', (e) => {
        if (e.target && e.target.nodeName === 'LI') {
            const songSrc = e.target.getAttribute('data-src');
            const lyricsSrc = e.target.getAttribute('data-lyrics');
            audioPlayer.src = songSrc;
            audioPlayer.play();
            document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
            e.target.classList.add('active');
            updateCurrentSong(e.target.innerText);
            if (isLyricsVisible) {
                loadLyrics(lyricsSrc);
            }
            currentAlbum = e.target.closest('.album').getAttribute('data-album');
            updateActiveAlbum(currentAlbum);
        } else if (e.target && e.target.classList.contains('toggle-album')) {
            const album = e.target.getAttribute('data-album');
            const musicList = document.querySelector(`.music-list[data-album="${album}"]`);
            const isVisible = musicList.style.display === 'block';
            musicList.style.display = isVisible ? 'none' : 'block';
            e.target.textContent = isVisible ? '展开' : '折叠';
            const albumElement = e.target.closest('.album');
            const albumBackground = albumElement.querySelector('.album-background');
            const albumIcon = albumElement.querySelector('.album-icon');
            albumBackground.style.display = isVisible ? 'block' : 'none';
            albumIcon.style.display = isVisible ? 'none' : 'block';
        }
    });

    // 音频播放结束事件
    audioPlayer.addEventListener('ended', () => {
        let nextSong;
        if (playMode === 2) { // 随机播放
            const randomIndex = getRandomSongIndex();
            nextSong = songs[randomIndex];
        } else { // 列表循环或单曲循环
            const currentIndex = songs.findIndex(song => song.classList.contains('active'));
            const nextIndex = (currentIndex + 1) % songs.length;
            nextSong = songs[nextIndex];
        }
        audioPlayer.src = nextSong.getAttribute('data-src');
        audioPlayer.play();
        document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
        nextSong.classList.add('active');
        updateCurrentSong(nextSong.innerText);
        if (isLyricsVisible) {
            loadLyrics(nextSong.getAttribute('data-lyrics'));
        }
        currentAlbum = nextSong.closest('.album').getAttribute('data-album');
        updateActiveAlbum(currentAlbum);
        updateAlbumDisplay();
    });

    // 更新活跃专辑
    function updateActiveAlbum(album) {
        document.querySelectorAll('.album').forEach(albumElem => {
            albumElem.classList.remove('active');
            albumElem.querySelector('.album-background').style.display = 'block';
        });
        const activeAlbum = document.querySelector(`.album[data-album="${album}"]`);
        activeAlbum.classList.add('active');
        const albumBackground = activeAlbum.querySelector('.album-background');
        albumBackground.style.display = 'none';
    }

    // 更新专辑显示状态
    function updateAlbumDisplay() {
        document.querySelectorAll('.album').forEach(albumElem => {
            const isExpanded = albumElem.querySelector('.music-list').style.display === 'block';
            const albumBackground = albumElem.querySelector('.album-background');
            const albumIcon = albumElem.querySelector('.album-icon');
            albumBackground.style.display = isExpanded ? 'none' : 'block';
            albumIcon.style.display = isExpanded ? 'block' : 'none';
        });
    }

    // 获取随机歌曲索引
    function getRandomSongIndex() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (playedIndices.has(randomIndex) && playedIndices.size < songs.length);
        return randomIndex;
    }

    // 初始化歌曲列表和播放模式按钮
    initSongs();
    updateModeButton();

    // 添加一次性点击事件来播放音频
    document.body.addEventListener('click', () => {
        audioPlayer.play();
    }, { once: true });
});
