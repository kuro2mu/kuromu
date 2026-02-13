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
        // Remove button entirely
        wrapper.style.display = 'none';

        // Full-screen clip container
        const clip = document.createElement('div');
        clip.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            overflow: hidden;
            z-index: 2;
            pointer-events: none;
        `;
        document.body.appendChild(clip);

        // Sweep layer — this gets the translateX animation
        const sweep = document.createElement('div');
        sweep.style.cssText = `
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            animation: marqueeTrack 3s linear forwards;
        `;
        clip.appendChild(sweep);

        // Diagonal container: 250vw wide, centered on viewport, rotated
        const rowH = Math.max(btnRect.height * 1.2, 80);
        const gap = rowH * 0.5;
        const ANGLE = -15;

        const diagonal = document.createElement('div');
        diagonal.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(${ANGLE}deg);
            width: 250vw;
            display: flex;
            flex-direction: column;
            gap: ${gap}px;
        `;
        sweep.appendChild(diagonal);

        // 4 rows, each with 4 images
        for (let r = 0; r < 4; r++) {
            const row = document.createElement('div');
            row.style.cssText = `
                display: flex;
                height: ${rowH}px;
                flex-shrink: 0;
            `;
            diagonal.appendChild(row);

            [0, 1, 2, 3].forEach((i) => {
                const img = document.createElement('img');
                img.src = 'wavy lines.png';
                img.style.cssText = `
                    width: 25%;
                    height: 100%;
                    object-fit: cover;
                    flex-shrink: 0;
                    ${i % 2 === 1 ? 'transform: scaleX(-1);' : ''}
                `;
                row.appendChild(img);
            });
        }

        // After sweep finishes: hide clip, reveal text
        setTimeout(() => {
            clip.style.display = 'none';

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
                z-index: 3;
            `;
            document.body.appendChild(reveal);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => { reveal.style.opacity = '1'; });
            });
        }, 3100);
    }, 100);
}
