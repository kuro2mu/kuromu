// script.js
const button = document.querySelector('#mainBtn');

button.addEventListener('click', () => {
    console.log("Button Triggered");
    handleTransition();
});

function handleTransition() {
    button.style.transform = "scale(0.9)";
    // Your logic here
}