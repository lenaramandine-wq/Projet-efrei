/**
 * Fonction pour le défilement fluide vers la section présentation
 */
function scrollToSection() {
    const target = document.getElementById("presentation");
    if (target) {
        target.scrollIntoView({
            behavior: "smooth"
        });
    }
}

/**
 * Fonction d'animation des compteurs numériques (Chiffres clés)
 */
function animateValue(id, start, end, duration) {
    let obj = document.getElementById(id);
    if (!obj) return; // Sécurité si l'ID n'existe pas sur la page

    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));

    let timer = setInterval(function () {
        current += increment;
        // Ajout d'un "+" ou "%" selon l'ID pour plus de réalisme
        if (id === "satisfaction") {
            obj.textContent = current + "%";
        } else if (id === "diplomes") {
            obj.textContent = current.toLocaleString(); // Formatage des grands nombres
        } else {
            obj.textContent = (end > 100 && current === end) ? "+" + current : current;
        }

        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

/**
 * Gestion du carrousel d'images (Défilement automatique doux)
 */
function initCarousel() {
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        let scrollAmount = 0;
        let step = 1;
        
        function autoScroll() {
            scrollAmount += step;
            if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
                scrollAmount = 0; // Retour au début
            }
            carousel.scrollTo({
                left: scrollAmount,
                behavior: 'auto'
            });
        }
        
        let carouselTimer = setInterval(autoScroll, 30); // Vitesse du défilement

        // Pause le défilement si l'utilisateur survole avec la souris
        carousel.addEventListener('mouseenter', () => clearInterval(carouselTimer));
        carousel.addEventListener('mouseleave', () => carouselTimer = setInterval(autoScroll, 30));
    }
}

/**
 * Lancement des fonctions au chargement de la page
 */
window.onload = function () {
    // Animation des chiffres clés (mis à jour selon tes nouvelles sections)
    animateValue("etudiants", 0, 6000, 2000);
    animateValue("projets", 0, 2000, 2000);
    animateValue("enseignants", 0, 490, 2000);
    
    // Nouveaux compteurs demandés
    animateValue("satisfaction", 0, 98, 2500); 
    
    // Initialisation du carrousel
    initCarousel();
};