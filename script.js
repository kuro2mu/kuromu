// script.js
const button = document.querySelector('#mainBtn');

button.addEventListener('click', () => {
    console.log("Button Triggered");
    handleTransition();
});

function handleTransition() {
    const wrapper = document.querySelector('.button-wrapper');

    // Capture rect BEFORE any layout changes
    const btnRect = button.getBoundingClientRect();

    // Quick press-down feel
    button.style.transition = 'transform 0.1s ease';
    button.style.transform = 'scale(0.9)';

    setTimeout(() => {
        // Fade button to 30% — still visible but not clickable
        wrapper.style.transition = 'opacity 0.3s ease';
        wrapper.style.opacity = '0.3';
        wrapper.style.pointerEvents = 'none';

        // Marquee container — clipped to button bounds, 2x taller
        const marqueeH = btnRect.height * 3;
        const marquee = document.createElement('div');
        marquee.style.cssText = `
            position: fixed;
            top: ${btnRect.top + btnRect.height / 2 - marqueeH / 2}px;
            left: ${btnRect.left}px;
            width: ${btnRect.width}px;
            height: ${marqueeH}px;
            overflow: hidden;
            z-index: 2;
            pointer-events: none;
        `;
        document.body.appendChild(marquee);

        // Seamless track: two images side by side, sweep left-to-right
        const track = document.createElement('div');
        track.style.cssText = `
            display: flex;
            width: 300%;
            height: 100%;
            animation: marqueeTrack 3s linear forwards;
        `;
        marquee.appendChild(track);

        [0, 1, 2].forEach((i) => {
            const img = document.createElement('img');
            img.src = 'wavy lines.png';
            img.style.cssText = `
                width: 33.333%;
                height: 100%;
                object-fit: cover;
                flex-shrink: 0;
${i % 2 === 1 ? 'transform: scaleX(-1);' : ''}
            `;
            track.appendChild(img);
        });

        // After marquee finishes, fade button out, keep marquee looping faintly, reveal text
        setTimeout(() => {
            // Fade button wrapper out
            wrapper.style.transition = 'opacity 0.4s ease';
            wrapper.style.opacity = '0';

            // Switch marquee to faint infinite loop behind the text
            // Instantly hide before switching animation to avoid a flash frame
            marquee.style.transition = 'none';
            marquee.style.opacity = '0';
            marquee.style.zIndex = '0';
            track.style.animation = 'marqueeTrack 6s linear infinite';
            requestAnimationFrame(() => {
                marquee.style.transition = 'opacity 0.4s ease';
                marquee.style.opacity = '0.15';
            });

            setTimeout(() => {
                wrapper.style.display = 'none';

                const reveal = document.createElement('div');
                reveal.id = 'revealText';
                reveal.textContent = 'Unveiling of the EGH Campus Smart Hospital Road Map!';
                reveal.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-family: 'SN Pro', sans-serif;
                    font-weight: 900;
                    font-size: clamp(1.2rem, 5vw, 2.5rem);
                    color: #000;
                    text-align: center;
                    width: 80%;
                    opacity: 0;
                    transition: opacity 0.6s ease;
                    line-height: 1.3;
                    z-index: 1;
                `;
                document.body.appendChild(reveal);
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => { reveal.style.opacity = '1'; });
                });
            }, 400);
        }, 3100);
    }, 100);
}
