// =====================
// Image Carousel
// =====================

const images = [
    "https://picsum.photos/id/237/700/400",
    "https://picsum.photos/id/238/700/400",
    "https://picsum.photos/id/239/700/400",
    "https://picsum.photos/id/240/700/400"
];

let currentIndex = 0;

const slider = document.getElementById("slider");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

nextBtn.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    slider.src = images[currentIndex];
});

prevBtn.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    slider.src = images[currentIndex];
});

// =====================
// API Fetch
// =====================

const jokeBtn = document.getElementById("jokeBtn");
const jokeText = document.getElementById("joke");

jokeBtn.addEventListener("click", getJoke);

async function getJoke() {

    try {

        const response = await fetch(
            "https://official-joke-api.appspot.com/random_joke"
        );

        const data = await response.json();

        jokeText.textContent =
            `${data.setup} ${data.punchline}`;

    } catch (error) {

        jokeText.textContent =
            "Failed to fetch joke. Try again.";

        console.log(error);
    }
}