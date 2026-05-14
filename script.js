
// --- Alert button ---
function showAlert() {
    alert("Hello! 👋\nThis alert was triggered using JavaScript.\nDOM events are working!");
}

// --- Toggle message ---
var messageVisible = false;

function toggleMessage() {
    var box = document.getElementById("output-box");
    var btn = document.getElementById("toggle-btn");

    if (messageVisible) {
        box.style.display = "none";
        btn.textContent = "💬 Toggle Message";
        messageVisible = false;
    } else {
        box.style.display = "block";
        btn.textContent = "❌ Hide Message";
        messageVisible = true;
    }
}

// --- Counter ---
var count = 0;

function changeCount(amount) {
    count += amount;
    document.getElementById("count-display").textContent = count;

    // change color based on value
    var display = document.getElementById("count-display");
    if (count > 0) {
        display.style.color = "#27ae60";
    } else if (count < 0) {
        display.style.color = "#e74c3c";
    } else {
        display.style.color = "#e9a825";
    }
}

// --- Smooth scroll for nav links ---
var navLinks = document.querySelectorAll("nav a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
        var href = this.getAttribute("href");
        if (href.startsWith("#")) {
            e.preventDefault();
            var target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        }
    });
});
