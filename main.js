const app = function () {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".video-container video");


    //SOUNDS
    const sounds = document.querySelectorAll(".sound-picker button");

    //TIME DISPLAY
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button");

    //GET LENGTH OF OUTLINE OF CIRCLE
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);

    //DURATION
    let fakeDuration = 600;
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // PICK SOUNDS
    sounds.forEach(sound => {
        sound.addEventListener("click", function () {
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");

            checkPlaying(song);
        })
    })
    //PLAY SOUND
    play.addEventListener("click", function () {
        checkPlaying(song)
    })

    // SELECT TIME
    timeSelect.forEach(option => {
        option.addEventListener("click", function () {



            fakeDuration = this.getAttribute("data-time");
            if (Math.floor(fakeDuration % 60) == 0) {
                timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60) + "0"}`
            }
            else {
                timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
            }


        });

    });

    // CREATE A FUNCTION SPECIFIC TO PLAY AND PAUSE THE SOUND
    function checkPlaying(song) {
        if (song.paused) {
            song.play();
            video.play();
            play.src = `./svg/pause.svg`;
        }
        else {
            song.pause();
            video.pause();
            play.src = `./svg/play.svg`;
        }
    };

    //ANIMATE THE CIRCLE
    song.ontimeupdate = function () {
        let currentTime = song.currentTime;
        //console.log(currentTime);

        let elapsedTime = fakeDuration - currentTime;
        console.log(elapsedTime);

        let seconds = Math.floor(elapsedTime % 60);
        let minutes = Math.floor(elapsedTime / 60);

        // ANIMATE THE CIRCLE
        let progress = outlineLength * (elapsedTime / fakeDuration);
        outline.style.strokeDashoffset = progress;

        // ANIMATE TIME DISPLAY
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= fakeDuration) {
            song.pause();
            video.pause();
            song.currentTime = 0;
            play.src = `./svg/play.svg`;
            outline.style.strokeDashoffset = outlineLength;
            

        }
    }



};

app()