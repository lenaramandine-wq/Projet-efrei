<?php 
// Cela permet de modifier un chiffre ou une expertise ici sans toucher au HTML plus bas.

$chiffres_cles = [
    ["valeur" => "98%", "label" => "Taux de satisfaction des étudiants"],
    ["valeur" => "14 000+", "label" => "Diplômés dans le secteur du numérique"],
    ["valeur" => "120+", "label" => "Partenaires entreprises clés"],
    ["valeur" => "95%", "label" => "Embauche avant l'obtention du diplôme"]
];

$expertises = [
    ["titre" => "Cybersécurité", "desc" => "Formation en sécurité offensive et défensive."],
    ["titre" => "Intelligence Artificielle", "desc" => "Machine Learning, Deep Learning et Big Data."],
    ["titre" => "Cloud & DevOps", "desc" => "Architectures cloud et automatisation CI/CD."],
    ["titre" => "Développement Logiciel", "desc" => "Applications web/mobiles et microservices."]
];

include("header.php"); 
include("navigation.php"); 
?>

<main>
    <section class="hero">
        <div class="hero-box">
            <h2>Façonner les ingénieurs et experts du numérique de demain</h2>
            <p>
                Le Département Informatique de l’EFREI forme des experts capables de concevoir,
                sécuriser et innover dans un monde numérique en constante évolution.
            </p>
            <div class="hero-buttons">
                <button onclick="window.location.href='equipe.php';">Découvrir notre équipe d'experts</button>
                <button onclick="window.location.href='https://www.efrei.fr/admission/admissions-programme-grande-ecole/';">Admissions PGE</button>
            </div>
        </div>
    </section>

    <section id="presentation">
        <h2 class="section-title">L'informatique, bien plus qu'un diplôme</h2>
        <div class="presentation-container">
            <div class="card">
                <span class="card-badge">01</span>
                <h3>Innovation</h3>
                <p>Un cursus axé sur les technologies émergentes.</p>
            </div>
            <div class="card">
                <span class="card-badge">02</span>
                <h3>Professionnalisation</h3>
                <p>Des programmes co-construits avec nos partenaires.</p>
            </div>
            <div class="card">
                <span class="card-badge">03</span>
                <h3>Accompagnement</h3>
                <p>Un suivi personnalisé et des projets concrets.</p>
            </div>
        </div>
    </section>

    <section id="chiffres-cles">
        <h2 class="section-title">Chiffres Clés du Département</h2>
        <div class="cards">
            <?php foreach ($chiffres_cles as $item): ?>
                <div class="card">
                    <h3><?php echo htmlspecialchars($item['valeur']); ?></h3>
                    <p><?php echo htmlspecialchars($item['label']); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    </section>

    <section id="expertises">
        <h2 class="section-title">Nos Expertises</h2>
        <div class="cards">
            <?php foreach ($expertises as $exp): ?>
                <div class="card">
                    <h3><?php echo htmlspecialchars($exp['titre']); ?></h3>
                    <p><?php echo htmlspecialchars($exp['desc']); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    </section>

    <section class="cta-section">
        <h2 class="section-title">Prêt à rejoindre l’aventure ?</h2>
        <button class="cta-button" onclick="location.href='https://www.efrei.fr/candidature/'">
            Candidater Maintenant
        </button>
    </section>
</main>

<?php include("footer.php"); ?>