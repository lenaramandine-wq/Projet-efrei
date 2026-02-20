function scrollToSection() {
    document.getElementById("presentation").scrollIntoView({
        behavior: "smooth"
    });
}

function animateValue(id, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let obj = document.getElementById(id);

    let timer = setInterval(function () {
        current += increment;
        obj.textContent = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

window.onload = function () {
    animateValue("etudiants", 0, 1200, 2000);
    animateValue("projets", 0, 350, 2000);
    animateValue("enseignants", 0, 45, 2000);
};
