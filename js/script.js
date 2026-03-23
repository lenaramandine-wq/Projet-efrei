(function () { // IIFE (Immediately Invoked Function Expression) : s'exécute immédiatement et isole le code du scope global
  "use strict"; // Active le mode strict : interdit les mauvaises pratiques JS (variables non déclarées, etc.)

  /* ============================================================
     UTILITAIRES : raccourcis pour sélectionner les éléments DOM
  ============================================================ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);    // Raccourci pour querySelector : sélectionne 1 seul élément
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)]; // Raccourci pour querySelectorAll : sélectionne TOUS les éléments correspondants et retourne un vrai tableau
  const page = document.body.dataset.page; // Récupère la valeur de data-page sur le <body> (ex: "accueil", "contact", "equipe", "formations")

  /* ============================================================
      BARRE DE PROGRESSION AU SCROLL
     Affiche une fine barre colorée en haut de page qui grandit au fur et à mesure du scroll
  ============================================================ */
  function initScrollProgress() {
    const bar = document.createElement("div"); // Crée un nouvel élément <div> pour la barre de progression
    bar.id = "scroll-progress"; // Lui donne un id unique pour pouvoir le cibler en CSS si besoin
    Object.assign(bar.style, { // Applique plusieurs styles CSS d'un coup sur la barre
      position: "fixed",       // Fixée en haut, reste visible même en scrollant
      top: "0",                // Collée tout en haut de la fenêtre
      left: "0",               // Collée à gauche
      height: "3px",           // Très fine (3px de hauteur)
      width: "0%",             // Commence à 0% (invisible au départ)
      background: "linear-gradient(90deg, var(--accent, #6c63ff), var(--accent2, #ff6584))", // Dégradé violet → rose
      zIndex: "9999",          // Au-dessus de tout le reste de la page
      transition: "width 0.1s linear", // La largeur s'anime très rapidement (0.1s) au scroll
      borderRadius: "0 2px 2px 0",     // Léger arrondi uniquement à droite
      boxShadow: "0 0 8px var(--accent, #6c63ff)", // Effet de lueur violette sous la barre
    });
    document.body.appendChild(bar); // Ajoute la barre au bas du <body> (elle sera fixée en haut visuellement)

    window.addEventListener("scroll", () => { // Écoute l'événement scroll sur toute la fenêtre
      const scrolled =
        (document.documentElement.scrollTop / // Pixels déjà scrollés depuis le haut
          (document.documentElement.scrollHeight - // Hauteur totale du document
            document.documentElement.clientHeight)) * // Hauteur visible de la fenêtre
        100; // Convertit en pourcentage (0% = en haut, 100% = tout en bas)
      bar.style.width = scrolled + "%"; // Met à jour la largeur de la barre selon le pourcentage scrollé
    }, { passive: true }); // passive: true améliore les performances du scroll (ne bloque pas le rendu)
  }

  /* ============================================================
      RÉVÉLATION AU SCROLL (Intersection Observer)
     Les éléments avec la classe .reveal apparaissent progressivement quand ils entrent dans l'écran
  ============================================================ */
  function initScrollReveal() {
    const style = document.createElement("style"); // Crée une balise <style> pour injecter du CSS dynamiquement
    style.textContent = `
      .reveal { /* État initial : caché et décalé vers le bas */
        opacity: 0;                   /* Invisible au départ */
        transform: translateY(40px);  /* Décalé de 40px vers le bas */
        transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1); /* Animation fluide avec rebond léger */
      }
      .reveal.revealed { /* État final : visible et à sa position normale */
        opacity: 1;              /* Complètement visible */
        transform: translateY(0); /* Revenu à sa position normale */
      }
      .reveal-left  { transform: translateX(-50px); } /* Variante : arrive depuis la gauche */
      .reveal-right { transform: translateX(50px); }  /* Variante : arrive depuis la droite */
      .reveal-left.revealed,
      .reveal-right.revealed { transform: translateX(0); } /* Les deux variantes reviennent au centre */
      .reveal-scale { transform: scale(0.85); }  /* Variante : commence plus petit */
      .reveal-scale.revealed { transform: scale(1); } /* Revient à sa taille normale */
    `;
    document.head.appendChild(style); // Injecte ces styles dans le <head> du document

    const observer = new IntersectionObserver( // Crée un observateur qui surveille quand les éléments entrent dans le viewport
      (entries) => { // Callback appelé à chaque changement de visibilité
        entries.forEach((entry) => { // Parcourt tous les éléments surveillés qui ont changé d'état
          if (entry.isIntersecting) { // Si l'élément est maintenant visible dans l'écran
            const el = entry.target;  // Récupère l'élément DOM concerné
            const delay = el.dataset.delay || 0; // Lit le délai d'animation (data-delay) ou 0 par défaut
            setTimeout(() => el.classList.add("revealed"), Number(delay)); // Ajoute .revealed après le délai (déclenche l'animation CSS)
            observer.unobserve(el); // Arrête de surveiller l'élément (l'animation ne se joue qu'une seule fois)
          }
        });
      },
      { threshold: 0.12 } // L'animation se déclenche quand 12% de l'élément est visible dans l'écran
    );

    $$(".reveal").forEach((el) => observer.observe(el)); // Démarre la surveillance de tous les éléments .reveal de la page
  }

  /* ============================================================
     CURSEUR PERSONNALISÉ (desktop uniquement)
     Remplace le curseur natif par un point + un anneau animé
  ============================================================ */
  function initCustomCursor() {
    if (window.matchMedia("(pointer: coarse)").matches) return; // Abandonne si l'écran est tactile (mobile/tablette) — pas de curseur personnalisé sur ces appareils

    const style = document.createElement("style"); // Crée une balise <style> pour les styles du curseur personnalisé
    style.textContent = `
      *, *::before, *::after { cursor: none !important; } /* Cache le curseur natif sur tous les éléments */
      #cursor-dot { /* Le petit point qui suit exactement la souris */
        position: fixed; pointer-events: none; z-index: 99999; /* Fixé, ignore les clics, toujours au-dessus */
        width: 8px; height: 8px; border-radius: 50%; /* Petit cercle de 8px */
        background: var(--accent, #6c63ff); /* Couleur violette */
        transform: translate(-50%, -50%); /* Centré sur la position de la souris */
        transition: transform 0.1s; /* Petite animation */
      }
      #cursor-ring { /* L'anneau plus grand qui suit avec un léger retard */
        position: fixed; pointer-events: none; z-index: 99998; /* Fixé, ignore les clics, sous le point */
        width: 36px; height: 36px; border-radius: 50%; /* Cercle de 36px */
        border: 1.5px solid var(--accent, #6c63ff); /* Bordure violette fine */
        transform: translate(-50%, -50%); /* Centré */
        transition: transform 0.35s cubic-bezier(.22,1,.36,1), /* Se déplace avec un délai élastique (effet traîne) */
                    width 0.35s, height 0.35s, opacity 0.35s; /* Transitions taille et opacité */
        opacity: 0.6; /* Semi-transparent */
      }
      body:has(a:hover) #cursor-ring,
      body:has(button:hover) #cursor-ring { /* Quand la souris survole un lien ou un bouton... */
        width: 56px; height: 56px; opacity: 0.35; /* ...l'anneau grossit et devient plus transparent */
      }
    `;
    document.head.appendChild(style); // Injecte les styles dans le <head>

    const dot  = document.createElement("div"); dot.id  = "cursor-dot";  // Crée le div du point
    const ring = document.createElement("div"); ring.id = "cursor-ring"; // Crée le div de l'anneau
    document.body.append(dot, ring); // Ajoute les deux éléments au <body>

    let mx = 0, my = 0, rx = 0, ry = 0; // mx/my = position exacte de la souris, rx/ry = position interpolée de l'anneau
    document.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; }); // Met à jour la position exacte de la souris à chaque mouvement
    dot.style.left = ring.style.left = "50%"; // Position initiale horizontale au centre
    dot.style.top  = ring.style.top  = "50%"; // Position initiale verticale au centre

    (function loop() { // Boucle d'animation qui tourne en continu (60fps via requestAnimationFrame)
      rx += (mx - rx) * 0.12; // Interpolation douce : l'anneau se rapproche de la souris de 12% à chaque frame (effet traîne)
      ry += (my - ry) * 0.12; // Idem pour l'axe vertical
      dot.style.left  = mx + "px"; dot.style.top  = my + "px"; // Le point suit exactement la souris (instantané)
      ring.style.left = rx + "px"; ring.style.top = ry + "px"; // L'anneau suit avec le retard de l'interpolation
      requestAnimationFrame(loop); // Appelle la prochaine frame (boucle infinie à 60fps)
    })(); // Exécution immédiate de la boucle
  }

  /* ============================================================
      NAVIGATION – Lien actif + transition de page fluide
  ============================================================ */
  function initNav() {
    const navLinks = $$("nav a, .nav a, header a"); // Sélectionne tous les liens dans la navigation et le header
    navLinks.forEach((link) => {
      if (link.href === location.href) link.classList.add("nav-active"); // Si l'URL du lien correspond à l'URL actuelle, ajoute la classe .nav-active (pour le souligner)
    });

    const style = document.createElement("style"); // Crée une balise style pour les animations de transition entre pages
    style.textContent = `
      @keyframes pageFadeIn { /* Animation d'entrée de page : monte et apparaît */
        from { opacity: 0; transform: translateY(16px); } /* Commence invisible et décalé vers le bas */
        to   { opacity: 1; transform: translateY(0); }    /* Termine visible à sa position normale */
      }
      body { animation: pageFadeIn 0.55s cubic-bezier(.22,1,.36,1) both; } /* Applique l'animation d'entrée à chaque chargement de page */
      .page-leaving { animation: pageFadeOut 0.3s forwards; } /* Animation de sortie quand on clique sur un lien */
      @keyframes pageFadeOut { /* L'ancienne page monte et disparaît */
        to { opacity: 0; transform: translateY(-12px); }
      }
    `;
    document.head.appendChild(style); // Injecte ces styles dans le <head>

    document.addEventListener("click", (e) => { // Intercepte tous les clics sur la page
      const a = e.target.closest("a"); // Remonte vers le <a> parent si on a cliqué sur un élément enfant
      if (!a || a.target === "_blank" || a.host !== location.host) return; // Ignore les liens externes, _blank, ou si ce n'est pas un lien
      e.preventDefault(); // Empêche la navigation immédiate par défaut
      document.body.classList.add("page-leaving"); // Déclenche l'animation de sortie (.page-leaving)
      setTimeout(() => (location.href = a.href), 290); // Attend 290ms (durée de l'animation), puis navigue vers la nouvelle page
    });
  }

  /* ============================================================
      EFFET MACHINE À ÉCRIRE (typewriter)
     Tape le texte caractère par caractère sur les éléments [data-typewriter]
  ============================================================ */
  function initTypewriter() {
    const targets = $$("[data-typewriter]"); // Sélectionne tous les éléments avec l'attribut data-typewriter
    if (!targets.length) return; // Si aucun élément trouvé, on abandonne la fonction

    const style = document.createElement("style"); // Crée une balise style pour l'animation du curseur clignotant
    style.textContent = `
      .typewriter-cursor::after { /* Pseudo-élément : ajoute un curseur "|" clignotant après le texte */
        content: "|";             /* Le caractère curseur */
        animation: blink 0.75s step-end infinite; /* Clignote toutes les 0.75s */
        color: var(--accent, #6c63ff); /* Couleur violette */
        font-weight: 300;         /* Fin pour ressembler à un vrai curseur */
        margin-left: 2px;         /* Petit espace entre le texte et le curseur */
      }
      @keyframes blink { 50% { opacity: 0; } } /* À 50% de l'animation, le curseur devient invisible → effet clignotant */
    `;
    document.head.appendChild(style); // Injecte les styles dans le <head>

    targets.forEach((el) => { // Parcourt chaque élément à animer
      const text = el.textContent.trim(); // Sauvegarde le texte original de l'élément
      el.textContent = "";               // Vide l'élément (le texte sera retapé caractère par caractère)
      el.classList.add("typewriter-cursor"); // Ajoute le curseur clignotant
      let i = 0; // Index du prochain caractère à afficher
      const delay = Number(el.dataset.delay || 0); // Délai avant de commencer l'animation (data-delay ou 0)
      setTimeout(() => { // Attend le délai avant de démarrer
        const timer = setInterval(() => { // Lance une répétition toutes les 45ms
          el.textContent += text[i++]; // Ajoute le caractère suivant du texte
          if (i === text.length) { // Si tous les caractères ont été tapés
            clearInterval(timer); // Arrête l'intervalle
            setTimeout(() => el.classList.remove("typewriter-cursor"), 1200); // Retire le curseur clignotant après 1.2 secondes
          }
        }, 45); // Un caractère toutes les 45ms (vitesse de frappe)
      }, delay); // Démarre après le délai configuré
    });
  }

  /* ============================================================
      COMPTEURS ANIMÉS
     Fait défiler les chiffres de 0 jusqu'à la valeur cible (data-count)
  ============================================================ */
  function initCounters() {
    const counters = $$("[data-count]"); // Sélectionne tous les éléments avec l'attribut data-count
    if (!counters.length) return;        // Si aucun compteur trouvé, on abandonne

    const observer = new IntersectionObserver((entries) => { // Observe quand les compteurs deviennent visibles
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return; // Ignore si l'élément n'est pas encore visible
        const el = entry.target;           // Récupère l'élément compteur
        const target = +el.dataset.count; // Convertit la valeur cible (string → number)
        const duration = 1400;            // Durée totale de l'animation : 1400ms (1.4 secondes)
        const step = 16;                  // Intervalle entre chaque mise à jour : 16ms (≈ 60fps)
        const increment = target / (duration / step); // Calcule de combien augmenter à chaque step pour atteindre target en duration ms
        let current = 0;                  // Valeur actuelle affichée, commence à 0
        const timer = setInterval(() => { // Lance le comptage à intervalles réguliers
          current = Math.min(current + increment, target); // Augmente la valeur sans dépasser la cible
          el.textContent = Math.round(current).toLocaleString("fr-FR"); // Affiche le chiffre arrondi avec le format français (espaces comme séparateurs de milliers)
          if (current >= target) clearInterval(timer); // Arrête l'animation quand la cible est atteinte
        }, step); // Toutes les 16ms
        observer.unobserve(el); // Arrête de surveiller l'élément (ne compte qu'une seule fois)
      });
    }, { threshold: 0.5 }); // Déclenche quand 50% de l'élément est visible

    counters.forEach((el) => observer.observe(el)); // Démarre la surveillance de chaque compteur
  }

  /* ============================================================
      PARTICULES FLOTTANTES (canvas)
     Dessine des particules animées sur un canvas dans la section hero
  ============================================================ */
  function initParticles(container) {
    if (!container) return; // Si aucun conteneur hero trouvé, on abandonne
    const canvas = document.createElement("canvas"); // Crée un élément <canvas> pour dessiner les particules
    Object.assign(canvas.style, { // Positionne le canvas pour qu'il couvre tout le conteneur
      position: "absolute", inset: "0", // Couvre tout l'espace (top/right/bottom/left à 0)
      width: "100%", height: "100%",    // Prend tout l'espace disponible
      pointerEvents: "none", zIndex: "0", // Ignore les clics et reste en arrière-plan
    });
    container.style.position = "relative"; // S'assure que le conteneur est en position relative (pour que le canvas absolu fonctionne)
    container.insertBefore(canvas, container.firstChild); // Insère le canvas comme premier enfant (derrière le contenu)

    const ctx = canvas.getContext("2d"); // Récupère le contexte 2D pour dessiner sur le canvas
    let W, H, particles = []; // W/H = dimensions du canvas, particles = tableau de toutes les particules

    const resize = () => { // Fonction pour adapter la taille du canvas à son conteneur
      W = canvas.width  = container.offsetWidth;  // Largeur du canvas = largeur du conteneur
      H = canvas.height = container.offsetHeight; // Hauteur du canvas = hauteur du conteneur
    };
    resize(); // Appel initial pour définir la taille dès le départ
    window.addEventListener("resize", resize, { passive: true }); // Recalcule la taille si la fenêtre est redimensionnée

    class Particle { // Classe représentant une particule individuelle
      constructor() { this.reset(); } // À la création, initialise avec des valeurs aléatoires
      reset() { // Réinitialise la particule à une position et vitesse aléatoires
        this.x  = Math.random() * W;          // Position X aléatoire dans le canvas
        this.y  = Math.random() * H;          // Position Y aléatoire dans le canvas
        this.r  = Math.random() * 2.5 + 0.5; // Rayon aléatoire entre 0.5 et 3px
        this.vx = (Math.random() - 0.5) * 0.4; // Vitesse X aléatoire entre -0.2 et +0.2
        this.vy = (Math.random() - 0.5) * 0.4; // Vitesse Y aléatoire entre -0.2 et +0.2
        this.alpha = Math.random() * 0.5 + 0.1; // Transparence aléatoire entre 0.1 et 0.6
      }
      update() { // Déplace la particule selon sa vitesse
        this.x += this.vx; this.y += this.vy; // Applique la vitesse à la position
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset(); // Si la particule sort du canvas, on la recrée aléatoirement
      }
      draw() { // Dessine la particule sur le canvas
        ctx.beginPath(); // Démarre un nouveau tracé
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); // Dessine un cercle complet (de 0 à 2π radians)
        ctx.fillStyle = `rgba(108, 99, 255, ${this.alpha})`; // Couleur violette avec la transparence de la particule
        ctx.fill(); // Remplit le cercle
      }
    }

    const count = Math.min(80, Math.floor((W * H) / 12000)); // Calcule le nombre de particules selon la surface (max 80) pour ne pas surcharger les petits écrans
    for (let i = 0; i < count; i++) particles.push(new Particle()); // Crée toutes les particules et les ajoute au tableau

    function drawConnections() { // Dessine des lignes entre les particules proches (effet réseau)
      for (let i = 0; i < particles.length; i++) { // Parcourt toutes les particules
        for (let j = i + 1; j < particles.length; j++) { // Compare avec toutes les particules suivantes (évite les doublons)
          const dx = particles[i].x - particles[j].x; // Différence de position en X
          const dy = particles[i].y - particles[j].y; // Différence de position en Y
          const dist = Math.sqrt(dx * dx + dy * dy); // Calcule la distance euclidienne entre les deux particules
          if (dist < 100) { // Si les particules sont à moins de 100px l'une de l'autre
            ctx.beginPath(); // Démarre un nouveau tracé
            ctx.moveTo(particles[i].x, particles[i].y); // Déplace le stylo sur la première particule
            ctx.lineTo(particles[j].x, particles[j].y); // Trace une ligne jusqu'à la deuxième
            ctx.strokeStyle = `rgba(108, 99, 255, ${0.12 * (1 - dist / 100)})`; // Plus les particules sont proches, plus la ligne est opaque
            ctx.lineWidth = 0.6; // Ligne très fine
            ctx.stroke(); // Dessine la ligne
          }
        }
      }
    }

    (function loop() { // Boucle d'animation principale (tourne en continu à 60fps)
      ctx.clearRect(0, 0, W, H); // Efface tout le canvas avant de redessiner (évite les traînes)
      particles.forEach((p) => { p.update(); p.draw(); }); // Met à jour et redessine chaque particule
      drawConnections(); // Dessine les connexions entre particules proches
      requestAnimationFrame(loop); // Planifie la prochaine frame (boucle infinie synchronisée avec l'écran)
    })(); // Démarre immédiatement la boucle
  }

  /* ============================================================
      VALIDATION DE FORMULAIRE (page contact.php)
     Valide les champs en temps réel et affiche des messages d'erreur animés
  ============================================================ */
  function initFormValidation() {
    const form = $("#contact-form"); // Sélectionne le formulaire par son id
    if (!form) return; // Si le formulaire n'existe pas sur cette page, on abandonne

    const style = document.createElement("style"); // Crée les styles pour les états de validation
    style.textContent = `
      .field-wrapper { position: relative; margin-bottom: 1.4rem; } /* Conteneur de chaque champ */
      .field-wrapper input,
      .field-wrapper textarea {
        transition: border-color 0.25s, box-shadow 0.25s; /* Transitions douces pour les changements d'état */
      }
      .field-wrapper input.invalid,
      .field-wrapper textarea.invalid { /* Champ invalide : bordure et lueur rouges */
        border-color: #ff4d4d !important;
        box-shadow: 0 0 0 3px rgba(255,77,77,.15);
      }
      .field-wrapper input.valid,
      .field-wrapper textarea.valid { /* Champ valide : bordure et lueur vertes */
        border-color: #2ecc71 !important;
        box-shadow: 0 0 0 3px rgba(46,204,113,.12);
      }
      .field-error { /* Message d'erreur affiché sous le champ */
        font-size: 0.78rem; color: #ff4d4d;
        margin-top: 4px; display: block;
        animation: errShake 0.35s ease; /* Petite secousse pour attirer l'attention */
      }
      @keyframes errShake { /* Animation de secousse horizontale */
        0%,100%{ transform:translateX(0) }
        25%{ transform:translateX(-5px) }
        75%{ transform:translateX(5px) }
      }
      .form-toast { /* Notification flottante de succès */
        position: fixed; bottom: 2rem; right: 2rem; /* Coin bas-droite de l'écran */
        background: #2ecc71; color: #fff;             /* Fond vert, texte blanc */
        padding: 1rem 1.6rem; border-radius: 10px;
        font-size: 0.95rem; z-index: 9999;
        box-shadow: 0 8px 32px rgba(0,0,0,.18);
        animation: toastIn 0.4s cubic-bezier(.22,1,.36,1); /* Apparaît avec une animation */
      }
      @keyframes toastIn { /* Le toast monte et apparaît */
        from { opacity: 0; transform: translateY(20px) scale(0.95); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
    `;
    document.head.appendChild(style); // Injecte les styles dans le <head>

    $$("input, textarea, select", form).forEach((field) => { // Parcourt tous les champs du formulaire
      if (!field.closest(".field-wrapper")) { // Si le champ n'est pas encore enveloppé dans un .field-wrapper
        const wrap = document.createElement("div"); // Crée un div wrapper
        wrap.className = "field-wrapper";           // Lui donne la classe .field-wrapper
        field.parentNode.insertBefore(wrap, field); // Insère le wrapper avant le champ dans le DOM
        wrap.appendChild(field);                    // Déplace le champ à l'intérieur du wrapper
      }
    });

    function showError(field, msg) { // Affiche un message d'erreur sous un champ
      clearError(field); // Supprime d'abord l'éventuel message précédent
      field.classList.add("invalid"); // Marque le champ comme invalide (bordure rouge)
      const err = document.createElement("span"); // Crée un <span> pour le message
      err.className = "field-error";              // Lui donne la classe .field-error
      err.textContent = msg;                      // Remplit avec le message d'erreur
      field.closest(".field-wrapper").appendChild(err); // Ajoute le message sous le champ
    }
    function clearError(field) { // Supprime l'état d'erreur ou de succès d'un champ
      field.classList.remove("invalid", "valid"); // Retire les classes d'état
      const prev = field.closest(".field-wrapper")?.querySelector(".field-error"); // Cherche un ancien message d'erreur
      if (prev) prev.remove(); // Le supprime s'il existe
    }
    function markValid(field) { // Marque un champ comme valide
      clearError(field);           // Supprime les erreurs précédentes
      field.classList.add("valid"); // Ajoute la classe .valid (bordure verte)
    }

    const email   = $("#email",   form); // Récupère le champ email du formulaire
    const message = $("#message", form); // Récupère le champ message du formulaire

    email?.addEventListener("input", () => { // Écoute chaque frappe dans le champ email
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) // Teste si l'email a un format valide (regex)
        ? markValid(email)                             // Si valide : bordure verte
        : email.value && showError(email, "Adresse email invalide"); // Si invalide et non vide : affiche l'erreur
    });
    message?.addEventListener("input", () => { // Écoute chaque frappe dans le champ message
      message.value.length >= 10                      // Vérifie que le message fait au moins 10 caractères
        ? markValid(message)                           // Si assez long : bordure verte
        : message.value && showError(message, "Minimum 10 caractères"); // Sinon : affiche l'erreur
    });

    form.addEventListener("submit", (e) => { // Intercepte la soumission du formulaire
      let valid = true; // Indicateur de validité globale, suppose valide au départ
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { // Vérifie le format email au moment de l'envoi
        showError(email, "Entrez un email valide"); valid = false; // Marque invalide et met le flag à false
      }
      if (!message || message.value.length < 10) { // Vérifie la longueur minimum du message
        showError(message, "Message trop court (min. 10 caractères)"); valid = false; // Marque invalide
      }
      if (!valid) { e.preventDefault(); return; } // Si un champ est invalide, bloque l'envoi

      e.preventDefault(); // Empêche l'envoi réel du formulaire (gestion JS côté client)
      const toast = document.createElement("div"); // Crée la notification de succès
      toast.className = "form-toast";              // Lui donne la classe .form-toast
      toast.textContent = "✅ Message envoyé avec succès !"; // Texte de confirmation
      document.body.appendChild(toast);            // Ajoute la notification à la page
      setTimeout(() => toast.remove(), 3500);      // La supprime automatiquement après 3.5 secondes
      form.reset();                                // Vide tous les champs du formulaire
      $$("input, textarea", form).forEach(clearError); // Retire tous les états de validation (vert/rouge)
    });
  }

  /* ============================================================
      CARTES ÉQUIPE – Effet tilt 3D au survol
     Les cartes s'inclinent en 3D selon la position de la souris
  ============================================================ */
  function initTeamCards() {
    const cards = $$(".team-card, .card-membre, [data-tilt]"); // Sélectionne les cartes de l'équipe (plusieurs sélecteurs possibles)
    if (!cards.length) return; // Si aucune carte trouvée, on abandonne

    cards.forEach((card) => { // Parcourt chaque carte
      card.addEventListener("mousemove", (e) => { // Écoute le mouvement de souris sur la carte
        const rect = card.getBoundingClientRect(); // Récupère la position et taille de la carte dans la fenêtre
        const x = (e.clientX - rect.left) / rect.width  - 0.5; // Normalise la position X de la souris entre -0.5 et +0.5
        const y = (e.clientY - rect.top)  / rect.height - 0.5; // Normalise la position Y de la souris entre -0.5 et +0.5
        card.style.transform = `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.04)`; // Applique la rotation 3D proportionnelle à la position de la souris (max ±7deg)
        card.style.transition = "transform 0.1s"; // Transition rapide pour suivre la souris
        card.style.boxShadow  = `${-x * 16}px ${y * 16}px 40px rgba(108,99,255,.2)`; // Ombre dynamique qui suit l'inclinaison
      });
      card.addEventListener("mouseleave", () => { // Quand la souris quitte la carte
        card.style.transform  = "perspective(600px) rotateY(0) rotateX(0) scale(1)"; // Remet la carte à plat
        card.style.transition = "transform 0.5s cubic-bezier(.22,1,.36,1), box-shadow 0.5s"; // Transition lente et élastique pour le retour
        card.style.boxShadow  = ""; // Supprime l'ombre dynamique
      });
    });
  }

  /* ============================================================
      FILTRES / TABS FORMATIONS
     Filtre les formations affichées selon la catégorie cliquée
  ============================================================ */
  function initFormationFilters() {
    const filterBtns = $$("[data-filter]");   // Sélectionne tous les boutons de filtre
    const items      = $$("[data-category]"); // Sélectionne tous les éléments filtrables
    if (!filterBtns.length || !items.length) return; // Si boutons ou éléments absents, on abandonne

    filterBtns.forEach((btn) => { // Parcourt chaque bouton de filtre
      btn.addEventListener("click", () => { // Écoute le clic sur chaque bouton
        filterBtns.forEach((b) => b.classList.remove("active")); // Retire la classe .active de TOUS les boutons
        btn.classList.add("active"); // Ajoute .active uniquement sur le bouton cliqué

        const filter = btn.dataset.filter; // Récupère la catégorie à filtrer (ex: "web", "data", "all")
        items.forEach((item) => { // Parcourt tous les éléments filtrables
          const show = filter === "all" || item.dataset.category === filter; // Détermine si cet élément doit être affiché
          if (show) { // Si l'élément correspond au filtre
            item.style.animation = "none"; // Coupe l'animation précédente
            item.offsetHeight;             // Force un reflow pour que l'animation puisse être relancée (hack nécessaire)
            item.style.animation = "filterIn 0.45s cubic-bezier(.22,1,.36,1) forwards"; // Lance l'animation d'apparition
            item.style.display = "";       // Assure que l'élément est visible (annule le display:none)
          } else { // Si l'élément ne correspond pas au filtre
            item.style.animation = "filterOut 0.3s forwards"; // Lance l'animation de disparition
            setTimeout(() => (item.style.display = "none"), 290); // Masque complètement l'élément après l'animation (290ms)
          }
        });
      });
    });

    const style = document.createElement("style"); // Crée les styles pour les animations de filtre
    style.textContent = `
      @keyframes filterIn  { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} } /* Apparition avec légère mise à l'échelle */
      @keyframes filterOut { to  {opacity:0;transform:scale(.92)} }                                  /* Disparition avec légère réduction */
    `;
    document.head.appendChild(style); // Injecte les styles dans le <head>
  }

  /* ============================================================
      BOUTON RETOUR EN HAUT DE PAGE
     Apparaît quand on scrolle vers le bas, disparaît en haut
  ============================================================ */
  function initBackToTop() {
    const btn = document.createElement("button"); // Crée un bouton HTML
    btn.id = "back-to-top";    // Id unique pour cibler en CSS
    btn.innerHTML = "↑";       // Flèche vers le haut comme icône
    btn.setAttribute("aria-label", "Retour en haut"); // Label accessible pour les lecteurs d'écran
    Object.assign(btn.style, { // Applique les styles en une seule instruction
      position: "fixed", bottom: "2rem", right: "2rem", // Coin bas-droite de l'écran
      width: "44px", height: "44px", borderRadius: "50%", // Bouton circulaire
      background: "var(--accent, #6c63ff)", color: "#fff", // Fond violet, flèche blanche
      border: "none", fontSize: "1.2rem", cursor: "pointer", // Pas de bordure, police lisible, curseur main
      zIndex: "8888", opacity: "0", transform: "scale(0.7)", // Invisible et réduit au départ
      transition: "opacity 0.3s, transform 0.3s",            // Apparition/disparition animée
      boxShadow: "0 4px 20px rgba(108,99,255,.4)",            // Ombre violette
    });
    document.body.appendChild(btn); // Ajoute le bouton à la page

    window.addEventListener("scroll", () => { // Écoute le scroll pour afficher/cacher le bouton
      const show = window.scrollY > 400; // Affiche le bouton seulement si on a scrollé de plus de 400px
      btn.style.opacity       = show ? "1" : "0";          // Visible ou invisible
      btn.style.transform     = show ? "scale(1)" : "scale(0.7)"; // Taille normale ou réduite
      btn.style.pointerEvents = show ? "auto" : "none";    // Cliquable ou non (évite de cliquer sur un bouton invisible)
    }, { passive: true }); // passive améliore les performances du scroll

    btn.addEventListener("click", () => // Au clic sur le bouton
      window.scrollTo({ top: 0, behavior: "smooth" }) // Remonte en haut de la page avec défilement fluide
    );
  }

  /* ============================================================
      TOOLTIPS LÉGERS
     Affiche une infobulle au survol des éléments avec data-tooltip="..."
  ============================================================ */
  function initTooltips() {
    const els = $$("[data-tooltip]"); // Sélectionne tous les éléments avec un attribut data-tooltip
    if (!els.length) return;          // Si aucun élément trouvé, on abandonne

    const style = document.createElement("style"); // Crée les styles pour les tooltips
    style.textContent = `
      [data-tooltip] { position: relative; } /* L'élément parent doit être en position relative */
      [data-tooltip]::after { /* Le pseudo-élément ::after affiche le contenu du tooltip */
        content: attr(data-tooltip); /* Récupère le texte directement depuis l'attribut data-tooltip */
        position: absolute; bottom: calc(100% + 8px); left: 50%; /* Positionné au-dessus de l'élément, centré */
        transform: translateX(-50%) scale(0.85); /* Centré horizontalement et légèrement réduit au départ */
        background: #1a1a2e; color: #fff;       /* Fond sombre, texte blanc */
        font-size: 0.78rem; padding: 5px 10px; border-radius: 6px; /* Style de la bulle */
        white-space: nowrap; pointer-events: none; /* Texte sur une seule ligne, ignore les clics */
        opacity: 0; transition: opacity .2s, transform .2s; /* Invisible par défaut, apparition animée */
        z-index: 999; /* Au-dessus du contenu */
      }
      [data-tooltip]:hover::after { /* Au survol : le tooltip devient visible */
        opacity: 1; transform: translateX(-50%) scale(1); /* Visible et à taille normale */
      }
    `;
    document.head.appendChild(style); // Injecte les styles dans le <head>
  }

  /* ============================================================
     INIT – Initialise les fonctions selon la page active
  ============================================================ */
  function init() {
    // --- Fonctions communes à TOUTES les pages ---
    initScrollProgress();  // Barre de progression au scroll
    initScrollReveal();    // Animations d'apparition au scroll
    initCustomCursor();    // Curseur personnalisé (desktop)
    initNav();             // Navigation active + transitions de page
    initBackToTop();       // Bouton retour en haut
    initTooltips();        // Infobulles
    initTypewriter();      // Effet machine à écrire
    initCounters();        // Compteurs animés

    // Initialise les particules sur le hero s'il existe sur la page
    initParticles($(".hero, #hero, .hero-section, [data-particles]")); // Cherche le hero par différents sélecteurs possibles

    // --- Fonctions spécifiques selon la page ---
    switch (page) { // Évalue la valeur de data-page sur le <body>
      case "contact":    // Page contact.php
        initFormValidation(); // Active la validation du formulaire de contact
        break;
      case "equipe":     // Page équipe.php
        initTeamCards();      // Active l'effet tilt 3D sur les cartes de l'équipe
        break;
      case "formations": // Page formations.php
        initFormationFilters(); // Active les filtres de formations par catégorie
        break;
      case "accueil":    // Page index.php (accueil)
        // Les particules sont déjà initialisées au-dessus pour le hero
        break;
    }
  }

  // Démarre l'initialisation au bon moment selon l'état de chargement du DOM
  if (document.readyState === "loading") { // Si le DOM n'est pas encore entièrement chargé
    document.addEventListener("DOMContentLoaded", init); // Attend la fin du chargement avant d'initialiser
  } else { // Si le DOM est déjà chargé (script chargé en bas de page ou en différé)
    init(); // Initialise immédiatement
  }
})(); // Ferme et exécute immédiatement la fonction IIFE

