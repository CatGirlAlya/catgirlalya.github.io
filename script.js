const card = document.querySelector('.glass-card')

card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
})

card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    card.style.transition = 'transform 0.5s ease'
})

card.addEventListener('mouseenter', () => {
    card.style.transition = 'none'
})

if (!window.audioSetupComplete) {
    window.audioSetupComplete = true;

    const audio = document.getElementById("bg-audio");
    const playBtn = document.getElementById("play-btn");
    const volSlider = document.getElementById("vol-slider");

    audio.volume = volSlider.value;

    audio.play().catch(() => {
        console.log("Browser policy blocked autoplay. Awaiting user interaction.");
    });

    playBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    volSlider.addEventListener("input", (event) => {
        audio.volume = event.target.value;
    });
}
