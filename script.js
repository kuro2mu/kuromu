// script.js
const _preload = new Image();
_preload.src = 'wavy lines.png';
const _preload2 = new Image();
_preload2.src = 'Health Fest Logo.png';

const button = document.querySelector('#mainBtn');

button.addEventListener('click', () => {
    console.log("Button Triggered");
    handleTransition();
});

function handleTransition() {
    const wrapper = document.querySelector('.button-wrapper');
    const header = document.querySelector('.site-header');

    // Quick press-down feel
    button.style.transition = 'transform 0.1s ease';
    button.style.transform = 'scale(0.9)';

    // Fade out button and header together
    wrapper.style.transition = 'opacity 0.125s ease';
    header.style.transition = 'opacity 0.125s ease';
    wrapper.style.opacity = '0';
    header.style.opacity = '0';

    setTimeout(() => {
        wrapper.style.display = 'none';
        header.style.display = 'none';

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

        // Pan wrapper — moves left to right at constant speed
        const pan = document.createElement('div');
        pan.style.cssText = `
            position: absolute;
            top: 0; left: 0;
            width: 300vw; height: 100%;
            animation: sweepLTR 6s linear forwards;
        `;
        clip.appendChild(pan);

        // Image — fills pan, grows in scale as it pans
        const sweep = document.createElement('img');
        sweep.src = 'wavy lines.png';
        sweep.style.cssText = `
            width: 100%; height: 100%;
            object-fit: cover;
            display: block;
            transform-origin: center center;
animation: sweepGrow 6s linear forwards, sweepFade 6s linear forwards;
        `;
        pan.appendChild(sweep);

        // After sweep finishes: fade out clip, then show reveal text
        setTimeout(() => {
            clip.style.transition = 'opacity 0.4s ease';
            clip.style.opacity = '0';
            setTimeout(() => {
                clip.remove();

                const reveal = document.createElement('div');
                reveal.style.cssText = `
                    position: fixed;
                    top: 0; left: 0;
                    width: 100vw; height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 3rem;
                    opacity: 0;
                    transition: opacity 0.6s ease;
                    z-index: 3;
                `;

                const logo = document.createElement('img');
                logo.src = 'Health Fest Logo.png';
                logo.style.cssText = `
                    width: clamp(280px, 80vw, 800px);
                    height: auto;
                    object-fit: contain;
                `;
                reveal.appendChild(logo);

                const lines = [
                    'You have joined the official unveiling of the EGH Campus Smart Hospital Roadmap.',
                    'Please turn your attention to the stage as the vision unfolds.'
                ];

                lines.forEach(text => {
                    const p = document.createElement('p');
                    p.textContent = text;
                    p.style.cssText = `
                        margin: 0;
                        font-family: 'AvantGarde', sans-serif;
                        font-weight: 900;
                        font-size: clamp(1.3rem, 3.5vw, 2.4rem);
                        color: #000;
                        text-align: center;
                        width: 80%;
                    `;
                    reveal.appendChild(p);
                });

                document.body.appendChild(reveal);
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => { reveal.style.opacity = '1'; });
                });
            }, 400);
        }, 2000);
    }, 150);
}
