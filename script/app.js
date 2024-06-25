const $currentAudio = document.querySelector("#currentAudio");
const $audioCover = document.querySelector("#audioCover");
const $audioDuration = document.querySelector("#audioDuration");
const $audioPlayedTime = document.querySelector("#audioPlayedTime");
const $playBtn = document.querySelector("#playBtn");
const $prevBtn = document.querySelector("#prevBtn");
const $nextBtn = document.querySelector("#nextBtn");
const $shuffleBtn = document.querySelector("#shuffleBtn");
const $playIcon = document.querySelector(".fa-play");
const $pauseIcon = document.querySelector(".fa-pause");
const $audioVolumeInput = document.querySelector("#audioVolumeInput");
const $imageOne = document.querySelector("#imageOne");
const $imageTwo = document.querySelector("#imageTwo");
const $animationContainer = document.querySelector(".animation");
const $audioList = document.querySelector("#audioList");

let currentAudioIndex = 0;
const audios = [
    {
        src: "./audios/save-your-tears.mp3",
        title: "Save your tears",
        artist: "The Weeknd",
        cover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36"
    },
    {
        src: "./audios/one-of-the-girls.mp3",
        title: "One of the girls",
        artist: "The Weeknd",
        cover: "https://i.scdn.co/image/ab67616d0000b273b0dd6a5cd1dec96c4119c262"
    },
    {
        src: "./audios/die-for-you.mp3",
        title: "Die for you",
        artist: "The Weeknd",
        cover: "https://i.scdn.co/image/ab67616d0000b2738de12a274f6e1df6634f57ec"
    },
    {
        src: "./audios/moonlight.mp3",
        title: "Moonlight",
        artist: "XXXTENTACIONS",
        cover: "https://i1.sndcdn.com/artworks-fyq5WbQNZdJo-0-t500x500.jpg"
    },
    {
        src: "./audios/without-me.mp3",
        title: "Without me",
        artist: "Eminem",
        cover: "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4"
    }
];
$currentAudio.src = audios[currentAudioIndex].src;
$audioCover.src = audios[currentAudioIndex].cover;
$imageOne.src = audios[currentAudioIndex].cover;
$imageTwo.src = audios[currentAudioIndex].cover;

const formatTime  = (time) => {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    return `${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`
}

$currentAudio.addEventListener("loadedmetadata", () => {
    $audioDuration.innerText = formatTime($currentAudio.duration);
    $audioVolumeInput.value = localStorage.getItem("currentVolume")
    $currentAudio.volume = localStorage.getItem("currentVolume") / 100;
})

setInterval(() => {
    $audioPlayedTime.innerText = formatTime($currentAudio.currentTime)
    $audioDuration.innerText = formatTime($currentAudio.duration - $currentAudio.currentTime)  
}, 1000)


const playAudio = () => {
    if($currentAudio.getAttribute("data-currently-playing") === "false"){
        $currentAudio.setAttribute("data-currently-playing", true);
        $currentAudio.play();
        $playIcon.classList.add("hidden");
        $pauseIcon.classList.remove("hidden");
        $animationContainer.classList.add("animation-spin");
    }
    else{
        $currentAudio.setAttribute("data-currently-playing", false);
        $currentAudio.pause();
        $playIcon.classList.remove("hidden");
        $pauseIcon.classList.add("hidden");
        $animationContainer.classList.remove("animation-spin");
    }
}

const changeVolume = (e) => {
    $currentAudio.volume = e.target.value / 100;
    localStorage.setItem("currentVolume", e.target.value);
}

const renewAudio = () => {
    $currentAudio.src = audios[currentAudioIndex].src;
    $audioCover.src = audios[currentAudioIndex].cover ? audios[currentAudioIndex].cover : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdelVvulL1xaToJ0S2cZd2H2x_npQj9QhaWA&s"
    if(audios[currentAudioIndex].cover){
        $imageOne.src = audios[currentAudioIndex].cover;
        $imageTwo.src = audios[currentAudioIndex].cover;
    }
    else{
        $imageOne.src = "https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_album-cover-art-73ab5b3d9b81f442cb2288630ab63acf.jpg?ts%20=%201698245952";
        $imageTwo.src = "https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_album-cover-art-73ab5b3d9b81f442cb2288630ab63acf.jpg?ts%20=%201698245952"
    }
    $currentAudio.play();
    $animationContainer.classList.add("animation-spin");
    $currentAudio.setAttribute("data-currently-playing", true);
    $playIcon.classList.add("hidden");
    $pauseIcon.classList.remove("hidden");
}

const playPrevAudio = () => {
    if(currentAudioIndex > 0){
        currentAudioIndex--;
    }
    else{
        currentAudioIndex = audios.length - 1
    }
    renewAudio()
}

const playNextAudio = () => {
    if(currentAudioIndex < audios.length - 1){
        currentAudioIndex++;
    }
    else{
        currentAudioIndex = 0
    }
    renewAudio()
}

const renderedAudioList = () => {
    const $audioFragment = document.createDocumentFragment();
    audios.forEach((audio, index) => {
        const $li = document.createElement("li");
        $li.className = "py-2 list-none";
        $li.innerHTML = `
            <div class="flex items-center gap-2">   
                <img class="w-[30px] h-[30px] rounded-[5px]" src="${audio.cover}" alt="">
                <div class="flex flex-col">
                    <p class="text-sm text-gray-100">${audio.title}</p>
                    <p class="text-xs text-gray-400">${audio.artist}</p>
                </div>  
            </div>
        `
        $audioFragment.appendChild($li);
        $li.addEventListener("click", () => {
            currentAudioIndex = index;
            renewAudio()
            
        })
    })
    $audioList.appendChild($audioFragment);
}

renderedAudioList()

const shuffleAudio = () => {
    let randomIndex;
    do{
        randomIndex = Math.floor(Math.random() * audios.length)
    }
    while(randomIndex === currentAudioIndex);
    currentAudioIndex = randomIndex;
    renewAudio();
}


$playBtn.addEventListener("click", playAudio);
$prevBtn.addEventListener("click", playPrevAudio);
$nextBtn.addEventListener("click", playNextAudio);
$audioVolumeInput.addEventListener("input", changeVolume);
$shuffleBtn.addEventListener("click", shuffleAudio)