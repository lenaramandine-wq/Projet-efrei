/**
 * Script pour l'amélioration de l'expérience utilisateur (UX)
 * Structure : IIFE pour isoler le scope et éviter les conflits
 */
(function() {
    "use strict";

    // --- 1. INITIALISATION ET SÉCURITÉ (Consigne A.3) ---
    // On attend que le DOM soit chargé pour ne pas bloquer l'affichage
    document.addEventListener('DOMContentLoaded', () => {
        initNavigation();
        initFormValidation();
        initDynamicAgenda();
        initDarkMode(); // Suggestion créative
        initScrollProgress(); // Suggestion créative
    });

    // --- 2. MENU DE NAVIGATION INTERACTIF (Consigne A.1) ---
    function initNavigation() {
        const nav = document.querySelector('.main-nav');
        const burger = document.querySelector('.burger-menu');
        
        if (burger && nav) {
            burger.addEventListener('click', () => {
                nav.classList.toggle('nav-active');
                burger.classList.toggle('toggle-icon');
            });
        }
    }

    // --- 3. GESTION DE L'AGENDA (Consigne A.1) ---
    function initDynamicAgenda() {
        const agendaContainer = document.querySelector('#agenda-display');
        if (!agendaContainer) return;

        // Exemple de données (pourrait venir d'un fetch JSON plus tard)
        const permanences = [
            { jour: "Lundi", heure: "14h - 16h", prof: "M. Dupont" },
            { jour: "Mercredi", heure: "09h - 11h", prof: "Mme. Martin" }
        ];

        try {
            let html = '<table class="agenda-table"><tr><th>Jour</th><th>Heure</th><th>Intervenant</th></tr>';
            permanences.forEach(item => {
                html += `<tr><td>${item.jour}</td><td>${item.heure}</td><td>${item.prof}</td></tr>`;
            });
            html += '</table>';
            agendaContainer.innerHTML = html;
        } catch (error) {
            console.error("Erreur lors du rendu de l'agenda :", error);
            agendaContainer.innerHTML = "<p>L'agenda est momentanément indisponible.</p>";
        }
    }

    // --- 4. VALIDATION DE FORMULAIRE (Consigne A.1) ---
    function initFormValidation() {
        const form = document.querySelector('#contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            const email = document.querySelector('#email');
            const message = document.querySelector('#message');
            
            if (!email.value.includes('@') || message.value.length < 10) {
                e.preventDefault();
                alert("Veuillez remplir correctement les champs (Email valide et message de 10 caractères min.).");
            }
        });
    }

    // --- 5. CRÉATIVITÉ : MODE SOMBRE & PROGRESSION (Consigne A.2) ---
    function initDarkMode() {
        const btn = document.createElement('button');
        btn.innerHTML = "🌓";
        btn.className = "dark-mode-toggle";
        document.body.appendChild(btn);

        btn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        // Appliquer le choix précédent
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }

    function initScrollProgress() {
        const bar = document.createElement('div');
        bar.className = "progress-bar";
        document.body.appendChild(bar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            bar.style.width = scrolled + "%";
        });
    }

})();