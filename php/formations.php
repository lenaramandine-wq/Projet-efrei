<?php include("header.php"); ?>  <!-- Inclusion de l'en-tête commun (balises <head>, CSS, métadonnées) -->
<?php include("navigation.php"); ?>  <!-- Inclusion de la barre de navigation commune à toutes les pages -->

<main> <!-- Balise principale du contenu de la page -->

    <!-- SECTION INTRODUCTION : présentation générale des formations -->
    <section class="content-section"> <!-- Section avec style de contenu général -->

        <h2 class="section-title"> Nos Formations</h2> <!-- Titre principal de la page formations -->

        <!-- Bloc d'introduction centré, limité à 800px de largeur -->
        <div class="intro-box" style="max-width: 800px; margin: 0 auto 40px; text-align: center;">
            <!-- Texte de présentation du cursus, avec mise en gras des mots-clés pédagogiques -->
            <p>Notre établissement propose un cursus complet du post-bac au Bac+5. Nos objectifs pédagogiques sont centrés sur l'<strong>expertise technique</strong>, la <strong>gestion de projet</strong> agile et l'<strong>innovation</strong> constante pour répondre aux défis numériques de demain.</p>
        </div>

        <h3 class="section-subtitle">Aperçu des matières principales</h3> <!-- Sous-titre de la grille de matières -->

        <div class="grid-container"> <!-- Conteneur en grille pour les cartes de matières -->

            <!-- Carte matière 1 : Programmation & Algorithmique -->
            <div class="course-card">
                <h3>Programmation & Algorithmique</h3> <!-- Titre de la carte -->
                <div class="course-item">Python avancé, Java, C/C++</div> <!-- Élément de cours : langages enseignés -->
                <div class="course-item">Structures de données</div> <!-- Élément de cours : algorithmique -->
            </div>

            <!-- Carte matière 2 : Développement Web & Mobile -->
            <div class="course-card">
                <h3>Développement Web & Mobile</h3>
                <div class="course-item">React, Node.js, PHP</div> <!-- Frameworks et langages web enseignés -->
                <div class="course-item">Bases de données (SQL/NoSQL)</div> <!-- Technologies de bases de données -->
            </div>

            <!-- Carte matière 3 : Réseaux & Cybersécurité -->
            <div class="course-card">
                <h3>Réseaux & Cybersécurité</h3>
                <div class="course-item">Administration Linux & Cloud</div> <!-- Gestion de systèmes et cloud -->
                <div class="course-item">Sécurité offensive/défensive</div> <!-- Techniques de sécurité informatique -->
            </div>

            <!-- Carte matière 4 : IA & Data Science -->
            <div class="course-card">
                <h3>IA & Data Science</h3>
                <div class="course-item">Machine & Deep Learning</div> <!-- Apprentissage automatique et réseaux de neurones -->
                <div class="course-item">NLP & Computer Vision</div> <!-- Traitement du langage naturel et vision par ordinateur -->
            </div>

        </div>
    </section>

    <hr class="separator"> <!-- Séparateur horizontal visuel entre les sections -->

    <!-- SECTION BACHELORS : programmes de niveau Bac+3 -->
    <section class="content-section">
        <h2 class="section-title">Programmes Bachelors (Bac+3)</h2> <!-- Titre de la section Bachelors -->

        <div class="formation-container"> <!-- Conteneur flex/grid pour les cartes de formation -->

            <!-- Carte formation : Bachelor Informatique -->
            <div class="formation-card">
                <div class="card-header"> <!-- En-tête de la carte avec titre et badge de durée -->
                    <h3>Bachelor Informatique</h3> <!-- Nom de la formation -->
                    <span class="duration-tag">Grade de Licence</span> <!-- Badge indiquant le grade obtenu -->
                </div>
                <!-- Objectifs pédagogiques du Bachelor Informatique -->
                <p><strong>Objectifs :</strong> Maîtriser les fondamentaux du cycle de vie d'un logiciel et des infrastructures.</p>
                <!-- Modalités d'accès et rythme de la formation -->
                <p><strong>Modalités :</strong> Initiale (Année 1) / Alternance possible (Année 2 & 3).</p>
                <!-- Métiers accessibles après la formation -->
                <p><strong>Débouchés :</strong> Développeur Full-stack, Administrateur Systèmes, Consultant SI.</p>
            </div>

            <!-- Carte formation : Bachelor Cybersécurité -->
            <div class="formation-card">
                <div class="card-header"> <!-- En-tête de la carte avec titre et badge de durée -->
                    <h3>Bachelor Cybersécurité</h3> <!-- Nom de la formation -->
                    <span class="duration-tag">3 ans</span> <!-- Badge indiquant la durée totale -->
                </div>
                <!-- Objectifs pédagogiques du Bachelor Cybersécurité -->
                <p><strong>Objectifs :</strong> Apprendre à protéger les actifs numériques et répondre aux incidents.</p>
                <!-- Modalités d'accès et rythme de la formation -->
                <p><strong>Modalités :</strong> Rythme alterné dès la 2ème année.</p>
                <!-- Métiers accessibles après la formation -->
                <p><strong>Débouchés :</strong> Analyste SOC, Auditeur sécurité, Technicien réseau.</p>
            </div>

        </div>
    </section>

    <hr class="separator"> <!-- Séparateur horizontal visuel entre les sections -->

    <!-- SECTION CYCLE INGÉNIEUR : programmes de niveau Bac+5 -->
    <section class="content-section">
        <h2 class="section-title">Cycle Ingénieur (Bac+5)</h2> <!-- Titre de la section Cycle Ingénieur -->
        <p class="section-subtitle">Une spécialisation de haut niveau pour devenir leader technique</p> <!-- Sous-titre descriptif -->

        <div class="grid-container"> <!-- Conteneur en grille pour les cartes du cycle ingénieur -->

            <!-- Carte 1 : liste des filières et majeures disponibles -->
            <div class="course-card">
                <h3>Filières & Majeures</h3>
                <ul> <!-- Liste non ordonnée des spécialisations -->
                    <li><strong>Information Technology :</strong> Logiciels et SI complexes.</li> <!-- Filière IT -->
                    <li><strong>Data Science :</strong> Big Data et analyse prédictive.</li> <!-- Filière Data -->
                    <li><strong>Sécurité & Réseaux :</strong> Infrastructure critique.</li> <!-- Filière Sécu -->
                    <li><strong>Systèmes Embarqués :</strong> IoT et robotique.</li> <!-- Filière Embarqué -->
                </ul>
            </div>

            <!-- Carte 2 : modules électifs disponibles en Master -->
            <div class="course-card">
                <h3>Focus Spécialisation</h3>
                <!-- Description des options de spécialisation en 2ème année de cycle ingénieur -->
                <p>En Master, les étudiants choisissent des modules électifs : Cloud Computing, Blockchain, ou Management de l'Innovation.</p>
            </div>

            <!-- Carte 3 : expérience professionnelle intégrée au cursus -->
            <div class="course-card">
                <h3>Expérience Professionnelle</h3>
                <!-- Informations sur les projets de fin d'études en entreprise -->
                <p><strong>Projets :</strong> Projets de fin d'études (PFE) en partenariat avec des entreprises.</p>
                <!-- Durée minimale de stage obligatoire sur l'ensemble du cycle -->
                <p><strong>Stages :</strong> 12 mois de stage minimum cumulés sur le cycle ingénieur.</p>
            </div>

        </div>
    </section>

</main> <!-- Fin du contenu principal -->

<?php include("footer.php"); ?>  <!-- Inclusion du pied de page commun (liens, mentions légales…) -->

<!-- Définit un attribut data-page sur le body pour identifier la page active en JS -->
<script>document.body.dataset.page = "formations";</script>
<!-- Inclusion du script JS principal (animations, interactions…) -->
<script src="js/script.js"></script>