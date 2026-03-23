<?php
include('connexion.php');  // Inclusion du fichier de connexion à la base de données (PDO)
$message_succes = "";      // Initialisation de la variable qui contiendra le message de confirmation
include("header.php");     // Inclusion de l'en-tête commun (balises <head>, CSS, métadonnées)
include("navigation.php"); // Inclusion de la barre de navigation commune à toutes les pages

// =====================================================
// 1. TRAITEMENT DU FORMULAIRE : exécuté uniquement si le formulaire a été soumis en POST
// =====================================================
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['envoyer'])) { // Vérifie que la requête est POST et que le bouton "envoyer" a été cliqué
    $nom     = htmlspecialchars($_POST['nom_complet']);    // Récupère et sécurise le nom complet (protection XSS)
    $email   = htmlspecialchars($_POST['email']);          // Récupère et sécurise l'adresse email
    $sujet   = htmlspecialchars($_POST['sujet']);          // Récupère et sécurise le sujet du message
    $message = htmlspecialchars($_POST['message_texte']); // Récupère et sécurise le contenu du message

    // Requête SQL préparée pour insérer le message dans la table messages_contact
    $sql = "INSERT INTO messages_contact (nom_utilisateur, email, sujet, message) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql); // Prépare la requête SQL via PDO pour éviter les injections SQL
    
    if ($stmt->execute([$nom, $email, $sujet, $message])) { // Exécute la requête avec les données saisies
        // Si l'insertion réussit, génère un message de succès avec le nom de l'utilisateur
        $message_succes = "<div style='background:#d4edda; color:#155724; padding:15px; border-radius:5px; margin-bottom:20px;'>✨ Merci " . $nom . " ! Votre message a bien été enregistré. ✨</div>";
    }
}

// =====================================================
// 2. RÉCUPÉRATION DES MESSAGES : exécuté uniquement si le paramètre GET "afficher" est présent
// =====================================================
$liste_messages = []; // Initialisation du tableau qui contiendra les messages récupérés en base
$mode_affichage = isset($_GET['afficher']); // Booléen : true si l'URL contient ?afficher, false sinon

if ($mode_affichage) { // Si le mode affichage est activé, on récupère tous les messages
    // Requête SQL pour récupérer tous les messages triés du plus récent au plus ancien
    $query = "SELECT nom_utilisateur, email, sujet, message, date_envoi 
              FROM messages_contact 
              ORDER BY date_envoi DESC";
    $stmt = $pdo->query($query);          // Exécute la requête de sélection via PDO
    $liste_messages = $stmt->fetchAll();  // Récupère tous les résultats sous forme de tableau associatif
}
?>

<main> <!-- Balise principale du contenu de la page -->
<body data-page="contact"> <!-- Attribut data-page pour identifier la page active en JS -->
  <script src="js/script.js"></script> <!-- Inclusion du script JS principal (animations, interactions) -->
</body>

  <!-- Section principale de la page contact, pleine largeur avec padding -->
  <section class="contact-section" style="padding: 20px; width: 100%;">
    
    <?php if (!$mode_affichage): // Affiche le formulaire si le mode affichage des messages n'est PAS actif ?>

      <div class="contact-container"> <!-- Conteneur flex regroupant la carte info et le formulaire -->

        <!-- CARTE INFORMATIONS DE CONTACT -->
        <div class="info-card">
          <h2>Nous Contacter</h2> <!-- Titre de la carte d'informations -->
          <!-- Adresse physique de l'établissement -->
          <p><strong>Adresse :</strong><br>30 Avenue de la République<br>94800 Villejuif</p>
          <p><strong>Téléphone :</strong><br>06 12 14 58 46 72</p> <!-- Numéro de téléphone de contact -->
          <p><strong>Email :</strong><br>contact@efrei-informatique.fr</p> <!-- Adresse email de contact -->
          
          <!-- Formulaire GET pour activer le mode affichage des messages enregistrés -->
          <form method="GET">
              <!-- Bouton qui soumet le formulaire GET et ajoute ?afficher dans l'URL -->
              <button type="submit" name="afficher" style="background:#34495e; color:white; border:none; padding:10px; cursor:pointer; border-radius:5px; margin-top:10px; width:100%;">
                  Voir les messages enregistrés
              </button>
          </form>
        </div>

        <!-- CARTE FORMULAIRE D'ENVOI DE MESSAGE -->
        <div class="form-card">
          <h2>Envoyer un message</h2> <!-- Titre de la carte formulaire -->
          <?php echo $message_succes; ?> <!-- Affiche le message de confirmation si l'envoi a réussi -->

          <!-- Formulaire POST vers contact.php pour envoyer un nouveau message -->
          <form method="POST" action="contact.php">

            <!-- Champ : Nom complet -->
            <div class="form-group">
              <label>Nom complet</label> <!-- Libellé du champ nom -->
              <input type="text" name="nom_complet" placeholder="Votre nom complet" required> <!-- Champ texte obligatoire -->
            </div>

            <!-- Champ : Email -->
            <div class="form-group">
              <label>Email</label> <!-- Libellé du champ email -->
              <input type="email" name="email" placeholder="Votre adresse email" required> <!-- Champ email obligatoire avec validation de format -->
            </div>

            <!-- Champ : Sujet -->
            <div class="form-group">
              <label>Sujet</label> <!-- Libellé du champ sujet -->
              <input type="text" name="sujet" placeholder="Objet du message"> <!-- Champ texte optionnel pour le sujet -->
            </div>

            <!-- Champ : Message -->
            <div class="form-group">
              <label>Message</label> <!-- Libellé de la zone de texte -->
              <textarea name="message_texte" placeholder="Votre message..." required></textarea> <!-- Zone de texte multiligne obligatoire -->
            </div>

            <!-- Bouton de soumission du formulaire POST -->
            <button type="submit" name="envoyer" class="btn" style="background:#e91e63; color:white; width:100%; border:none; padding:10px; border-radius:5px; cursor:pointer;">Envoyer</button>
          </form>
        </div>
      </div>

    <?php else: // Sinon, affiche le tableau de tous les messages enregistrés en base ?>

      <div style="width: 100%; margin: 0 auto;"> <!-- Conteneur pleine largeur pour le tableau des messages -->
          
          <!-- En-tête de la section tableau : titre + bouton retour -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 0 10px;">
              <h2 style="color:#000000; margin: 0; font-weight: bold;">Tous les messages enregistrés</h2> <!-- Titre du tableau -->
              <!-- Lien retour vers le formulaire (supprime le paramètre GET ?afficher) -->
              <a href="contact.php" style="background:#e91e63; color:white; padding:12px 25px; border-radius:5px; text-decoration:none; font-weight:bold;">
                  ⬅ Retourner au formulaire
              </a>
          </div>

          <?php if (!empty($liste_messages)): // Vérifie si des messages existent dans la base ?>

            <!-- Conteneur scrollable horizontalement pour le tableau sur petits écrans -->
            <div style="background: #ffffff; border: 1px solid #000000; border-radius:8px; overflow-x: auto; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                <!-- Tableau des messages avec largeur minimale pour éviter l'écrasement -->
                <table style="width:100%; border-collapse:collapse; min-width: 900px;">
                    <thead>
                      <!-- En-tête du tableau avec fond sombre et texte blanc -->
                      <tr style="background:#34495e; color: #ffffff;">
                          <th style="padding:15px; border:1px solid #000000; text-align:left; width: 20%;">Expéditeur</th> <!-- Colonne nom et email -->
                          <th style="padding:15px; border:1px solid #000000; text-align:left; width: 15%;">Sujet</th>      <!-- Colonne sujet -->
                          <th style="padding:15px; border:1px solid #000000; text-align:left; width: 50%;">Message</th>    <!-- Colonne contenu du message -->
                          <th style="padding:15px; border:1px solid #000000; text-align:left; width: 15%;">Date d'envoi</th> <!-- Colonne date -->
                      </tr>
                    </thead>
                    <tbody style="color: #000000;"> <!-- Corps du tableau avec texte noir -->

                      <?php foreach ($liste_messages as $m): // Boucle sur chaque message récupéré en base ?>
                      <tr style="border-bottom: 1px solid #000000; background: #ffffff;"> <!-- Ligne du tableau pour un message -->

                          <!-- Cellule expéditeur : nom en gras et email souligné -->
                          <td style="padding:15px; border:1px solid #000000; vertical-align: top; color: #000000;">
                              <strong style="font-size: 1.1em;"><?= htmlspecialchars($m['nom_utilisateur']) ?></strong><br> <!-- Nom sécurisé contre XSS -->
                              <span style="color:#000000; text-decoration: underline;"><?= htmlspecialchars($m['email']) ?></span> <!-- Email sécurisé -->
                          </td>

                          <!-- Cellule sujet : affiché en gras -->
                          <td style="padding:15px; border:1px solid #000000; vertical-align: top; font-weight: bold; color: #000000;">
                              <?= htmlspecialchars($m['sujet']) ?> <!-- Sujet sécurisé contre XSS -->
                          </td>

                          <!-- Cellule message : nl2br convertit les sauts de ligne en <br> pour l'affichage HTML -->
                          <td style="padding:15px; border:1px solid #000000; vertical-align: top; line-height: 1.6; color: #000000;">
                              <?= nl2br(htmlspecialchars($m['message'])) ?> <!-- Message sécurisé avec conservation des sauts de ligne -->
                          </td>

                          <!-- Cellule date : formatée en jour/mois/année heure:minute -->
                          <td style="padding:15px; border:1px solid #000000; vertical-align: top; font-size:13px; color: #000000; font-weight: bold; white-space: nowrap;">
                              <?= date('d/m/Y H:i', strtotime($m['date_envoi'])) ?> <!-- Conversion et formatage de la date SQL -->
                          </td>
                      </tr>
                      <?php endforeach; // Fin de la boucle sur les messages ?>

                    </tbody>
                </table>
            </div>

          <?php else: // Si aucun message n'est présent en base, affiche un message informatif ?>
            <!-- Bloc centré indiquant l'absence de messages dans la base -->
            <div style="text-align:center; padding: 50px; background: white; border-radius: 8px; border: 1px solid #000000; color: #000000;">
                <p style="font-size: 18px; font-weight: bold;">Aucun message n'est présent dans la base de données.</p>
            </div>
          <?php endif; // Fin de la condition sur la liste des messages ?>

      </div>
    <?php endif; // Fin de la condition mode_affichage (formulaire vs tableau) ?>

  </section>
</main> <!-- Fin du contenu principal -->

<?php include("footer.php"); ?> <!-- Inclusion du pied de page commun (liens, mentions légales…) -->

<!-- Définit l'attribut data-page sur le body pour identifier la page active en JS -->
<script>document.body.dataset.page = "contact";</script>
<!-- Inclusion du script JS principal (animations, interactions) -->
<script src="js/script.js">
  <script> 
  <!-- Affiche une alerte de bienvenue dès que la page est entièrement chargée -->
  window.onload = function() {
        alert("Bienvenue sur le site de l'EFREI");
    }
</script>
</script>