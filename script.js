// script.js
const button = document.querySelector('#mainBtn');

const tileImages = [
    'tileBlue_44.png',
    'tileGreen_44.png',
    'tileOrange_44.png',
    'tilePink_45.png',
    'tileRed_46.png',
    'tileYellow_46.png'
];

button.addEventListener('click', () => {
    console.log("Button Triggered");
    handleTransition();
    spawnConfetti();
});

function handleTransition() {
    const wrapper = document.querySelector('.button-wrapper');

    // Quick press-down feel
    button.style.transition = 'transform 0.1s ease';
    button.style.transform = 'scale(0.9)';

    setTimeout(() => {
        // Fade out the button
        wrapper.style.transition = 'opacity 0.4s ease';
        wrapper.style.opacity = '0';

        setTimeout(() => {
            wrapper.style.display = 'none';

            // Create and show reveal text
            const reveal = document.createElement('div');
            reveal.id = 'revealText';
            reveal.textContent = 'Unveiling of the EGH Campus Smart Hospital Road Map!';
            reveal.style.cssText = `
                position: absolute;
                top: 62.5%;
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
            `;
            document.body.appendChild(reveal);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    reveal.style.opacity = '1';
                });
            });
        }, 400);
    }, 100);
}

function spawnConfetti() {
    const count = 60;
    const origin = button.getBoundingClientRect();
    const cx = origin.left + origin.width / 2;
    const cy = origin.top + origin.height / 2;

    for (let i = 0; i < count; i++) {
        const el = document.createElement('img');
        el.src = tileImages[Math.floor(Math.random() * tileImages.length)];
        el.classList.add('confetti-tile');

        // Random trajectory
        const angle = Math.random() * 2 * Math.PI;
        const speed = 150 + Math.random() * 400;
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed - 300; // bias upward
        const rotation = (Math.random() - 0.5) * 720;
        const size = 20 + Math.random() * 28;
        const duration = 600 + Math.random() * 800;

        el.style.cssText = `
            position: fixed;
            left: ${cx}px;
            top: ${cy}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
                        opacity ${duration}ms ease-in;
        `;

        document.body.appendChild(el);

        // Trigger animation on next frame
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${rotation}deg)`;
                el.style.opacity = '0';
            });
        });

        setTimeout(() => el.remove(), duration + 100);
    }
}