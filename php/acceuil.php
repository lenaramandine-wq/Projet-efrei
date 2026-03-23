<?php 
// Tableau associatif contenant les chiffres clés du département
$chiffres_cles = [
    // Chaque entrée contient une valeur affichée et son libellé descriptif
    ["valeur" => "98%",    "label" => "Taux de satisfaction des étudiants"],
    ["valeur" => "14 000+","label" => "Diplômés dans le secteur du numérique"],
    ["valeur" => "120+",   "label" => "Partenaires entreprises clés"],
    ["valeur" => "95%",    "label" => "Embauche avant l'obtention du diplôme"]
];

// Tableau associatif listant les domaines d'expertise du département
$expertises = [
    // Chaque expertise possède un titre et une courte description
    ["titre" => "Cybersécurité",            "desc" => "Formation en sécurité offensive et défensive."],
    ["titre" => "Intelligence Artificielle", "desc" => "Machine Learning, Deep Learning et Big Data."],
    ["titre" => "Cloud & DevOps",            "desc" => "Architectures cloud et automatisation CI/CD."],
    ["titre" => "Développement Logiciel",    "desc" => "Applications web/mobiles et microservices."]
];

include("header.php");     // Inclusion du fichier d'en-tête (balises <head>, métadonnées, liens CSS…)
include("navigation.php"); // Inclusion de la barre de navigation commune à toutes les pages
?>

<main> <!-- Balise principale du contenu de la page -->

    <!-- HERO : section d'accroche visible en premier au chargement -->
    <section class="hero" data-particles> <!-- data-particles déclenche l'animation de particules en JS -->
        <div class="hero-box reveal"> <!-- reveal : classe CSS pour l'animation d'apparition au scroll -->
            <!-- data-typewriter déclenche l'effet machine à écrire via JS -->
            <h2 data-typewriter>Façonner les ingénieurs et experts du numérique de demain</h2>
            <p>
                <!-- Texte de présentation du département informatique -->
                Le Département Informatique de l'EFREI forme des experts capables de concevoir,
                sécuriser et innover dans un monde numérique en constante évolution.
            </p>
            <div class="hero-buttons"> <!-- Conteneur des boutons d'action principaux -->
                <!-- Bouton redirigeant vers la page de l'équipe pédagogique -->
                <button onclick="window.location.href='equipe.php';">Découvrir notre équipe d'experts</button>
                <!-- Bouton redirigeant vers la page d'admissions externe EFREI -->
                <button onclick="window.location.href='https://www.efrei.fr/admission/admissions-programme-grande-ecole/';">Admissions PGE</button>
            </div>
        </div>
    </section>

    <!-- PRÉSENTATION : trois piliers pédagogiques du département -->
    <section id="presentation">
        <!-- Titre de section avec animation reveal au scroll -->
        <h2 class="section-title reveal">L'informatique, bien plus qu'un diplôme</h2>
        <div class="presentation-container"> <!-- Conteneur flex/grid des cartes de présentation -->

            <!-- Carte 1 : Innovation, apparition sans délai -->
            <div class="card reveal" data-delay="0">
                <span class="card-badge">01</span> <!-- Badge numéroté pour identifier visuellement la carte -->
                <h3>Innovation</h3>
                <p>Un cursus axé sur les technologies émergentes.</p>
            </div>

            <!-- Carte 2 : Professionnalisation, apparition décalée de 120 ms -->
            <div class="card reveal" data-delay="120">
                <span class="card-badge">02</span>
                <h3>Professionnalisation</h3>
                <p>Des programmes co-construits avec nos partenaires.</p>
            </div>

            <!-- Carte 3 : Accompagnement, apparition décalée de 240 ms -->
            <div class="card reveal" data-delay="240">
                <span class="card-badge">03</span>
                <h3>Accompagnement</h3>
                <p>Un suivi personnalisé et des projets concrets.</p>
            </div>

        </div>
    </section>

    <!-- CHIFFRES CLÉS : statistiques mises en avant du département -->
    <section id="chiffres-cles">
        <h2 class="section-title reveal">Chiffres Clés du Département</h2>
        <div class="cards"> <!-- Conteneur de la grille de cartes -->
            <?php foreach ($chiffres_cles as $i => $item): // Boucle sur chaque chiffre clé, $i sert au délai d'animation ?>
                <!-- Carte animée avec délai croissant selon l'index ($i * 100 ms) -->
                <div class="card reveal" data-delay="<?= $i * 100 ?>">
                    <!-- Affichage sécurisé de la valeur (htmlspecialchars prévient les failles XSS) -->
                    <h3><?php echo htmlspecialchars($item['valeur']); ?></h3>
                    <!-- Affichage sécurisé du libellé -->
                    <p><?php echo htmlspecialchars($item['label']); ?></p>
                </div>
            <?php endforeach; // Fin de la boucle chiffres clés ?>
        </div>
    </section>

    <!-- EXPERTISES : domaines techniques enseignés dans le département -->
    <section id="expertises">
        <h2 class="section-title reveal">Nos Expertises</h2>
        <div class="cards"> <!-- Conteneur de la grille de cartes expertises -->
            <?php foreach ($expertises as $i => $exp): // Boucle sur chaque expertise, $i sert au délai ?>
                <!-- Carte animée avec délai croissant selon l'index ($i * 100 ms) -->
                <div class="card reveal" data-delay="<?= $i * 100 ?>">
                    <!-- Affichage sécurisé du titre de l'expertise -->
                    <h3><?php echo htmlspecialchars($exp['titre']); ?></h3>
                    <!-- Affichage sécurisé de la description de l'expertise -->
                    <p><?php echo htmlspecialchars($exp['desc']); ?></p>
                </div>
            <?php endforeach; // Fin de la boucle expertises ?>
        </div>
    </section>

    <!-- CTA (Call To Action) : incitation à candidater -->
    <section class="cta-section reveal"> <!-- Section avec animation reveal au scroll -->
        <h2 class="section-title">Prêt à rejoindre l'aventure ?</h2>
        <!-- Bouton redirigeant vers le formulaire de candidature officiel EFREI -->
        <button class="cta-button" onclick="location.href='https://www.efrei.fr/candidature/'">
            Candidater Maintenant
        </button>
    </section>

</main> <!-- Fin du contenu principal -->

<?php include("footer.php"); // Inclusion du pied de page commun (liens, mentions légales…) ?>

<!-- Inclusion du script JS principal (animations, typewriter, particles…) -->
<script src="js/script.js"></script>
<script>
    // Affiche une alerte de bienvenue dès que la page est entièrement chargée
    window.onload = function () {
        alert("Bienvenue sur le site de l'EFREI");
    }
</script>