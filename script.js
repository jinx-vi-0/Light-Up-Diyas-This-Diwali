const container = document.querySelector('.container');

function createCircles() {
    const numCircles = Math.floor((window.innerWidth / 60) * (window.innerHeight / 60));
    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.addEventListener('click', () => {
            circle.classList.toggle('glow');
        });
        container.appendChild(circle);
    }
}

createCircles();
