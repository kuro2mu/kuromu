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

    button.style.transition = 'transform 0.1s ease';
    button.style.transform = 'scale(0.9)';

    wrapper.style.transition = 'opacity 0.125s ease';
    header.style.transition = 'opacity 0.125s ease';
    wrapper.style.opacity = '0';
    header.style.opacity = '0';

    setTimeout(() => {
        wrapper.style.display = 'none';
        header.style.display = 'none';

        const clip = document.createElement('div');
        clip.style.cssText = `
            position: fixed;
            top: 50%; /* Center vertically */
            left: 0;
            width: 100vw; 
            height: 100vh;
            transform: translateY(-50%);
            overflow: hidden;
            z-index: 2;
            pointer-events: none;
        `;
        document.body.appendChild(clip);

        const pan = document.createElement('div');
        pan.style.cssText = `
            position: absolute;
            top: 0; left: 0;
            width: 400vw; 
            height: 100%; 
            animation: sweepLTR 1s linear forwards;
        `;
        clip.appendChild(pan);

        const sweep = document.createElement('img');
        sweep.src = 'wavy lines.png';
        sweep.style.cssText = `
            width: 100%; height: 100%;
            object-fit: cover;
            display: block;
            transform-origin: center center;
            animation: sweepGrow 1s linear forwards, sweepFade 1s linear forwards;
        `;
        pan.appendChild(sweep);

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
                    gap: 1.5rem; 
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
                        line-height: 1.2;
                    `;
                    reveal.appendChild(p);
                });

                document.body.appendChild(reveal);
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => { reveal.style.opacity = '1'; });
                });
            }, 400);
        }, 1000);
    }, 150);
}