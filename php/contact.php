<?php
include('connexion.php'); 
$message_succes = ""; 
include("header.php");  
include("navigation.php");

// 1. Traitement du formulaire
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['envoyer'])) {
    $nom     = htmlspecialchars($_POST['nom_complet']); 
    $email   = htmlspecialchars($_POST['email']);
    $sujet   = htmlspecialchars($_POST['sujet']);
    $message = htmlspecialchars($_POST['message_texte']);

    $sql = "INSERT INTO messages_contact (nom_utilisateur, email, sujet, message) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    
    if ($stmt->execute([$nom, $email, $sujet, $message])) {
        $message_succes = "<div style='background:#d4edda; color:#155724; padding:15px; border-radius:5px; margin-bottom:20px;'>✨ Merci " . $nom . " ! Votre message a bien été enregistré. ✨</div>";
    }
}

// 2. Récupération des messages
$liste_messages = []; 
$mode_affichage = isset($_GET['afficher']); 

if ($mode_affichage) { 
    $query = "SELECT nom_utilisateur, email, sujet, message, date_envoi 
              FROM messages_contact 
              ORDER BY date_envoi DESC";
    $stmt = $pdo->query($query);
    $liste_messages = $stmt->fetchAll(); 
}
?>

<main>
  <section class="contact-section" style="padding: 20px; width: 100%;">
    
    <?php if (!$mode_affichage): ?>
      <div class="contact-container">
        <div class="info-card">
          <h2>Nous Contacter</h2>
          <p><strong>Adresse :</strong><br>30 Avenue de la République<br>94800 Villejuif</p>
          <p><strong>Téléphone :</strong><br>06 12 14 58 46 72</p>
          <p><strong>Email :</strong><br>contact@efrei-informatique.fr</p>
          
          <form method="GET">
              <button type="submit" name="afficher" style="background:#34495e; color:white; border:none; padding:10px; cursor:pointer; border-radius:5px; margin-top:10px; width:100%;">
                  Voir les messages enregistrés
              </button>
          </form>
        </div>

        <div class="form-card">
          <h2>Envoyer un message</h2>
          <?php echo $message_succes; ?>

          <form method="POST" action="contact.php">
            <div class="form-group">
              <label>Nom complet</label>
              <input type="text" name="nom_complet" placeholder="Votre nom complet" required>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="Votre adresse email" required>
            </div>
            <div class="form-group">
              <label>Sujet</label>
              <input type="text" name="sujet" placeholder="Objet du message">
            </div>
            <div class="form-group">
              <label>Message</label>
              <textarea name="message_texte" placeholder="Votre message..." required></textarea>
            </div>
            <button type="submit" name="envoyer" class="btn" style="background:#e91e63; color:white; width:100%; border:none; padding:10px; border-radius:5px; cursor:pointer;">Envoyer</button>
          </form>
        </div>
      </div>

    <?php else: ?>
      <div style="width: 100%; margin: 0 auto;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 0 10px;">
              <h2 style="color:#000000; margin: 0; font-weight: bold;">Tous les messages enregistrés</h2>
              <a href="contact.php" style="background:#e91e63; color:white; padding:12px 25px; border-radius:5px; text-decoration:none; font-weight:bold;">
                  ⬅ Retourner au formulaire
              </a>
          </div>

          <?php if (!empty($liste_messages)): ?>
            <div style="background: #ffffff; border: 1px solid #000000; border-radius:8px; overflow-x: auto; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                <table style="width:100%; border-collapse:collapse; min-width: 900px;">
                    <thead>
                      <tr style="background:#34495e; color: #ffffff;">
                          <th style="padding:15px; border:1px solid #000000; text-align:left; width: 20%;">Expéditeur</th>
                          <th style="padding:15px; border:1px solid #000000; text-align:left; width: 15%;">Sujet</th>
                          <th style="padding:15px; border:1px solid #000000; text-align:left; width: 50%;">Message</th>
                          <th style="padding:15px; border:1px solid #000000; text-align:left; width: 15%;">Date d'envoi</th>
                      </tr>
                    </thead>
                    <tbody style="color: #000000;">
                      <?php foreach ($liste_messages as $m): ?>
                      <tr style="border-bottom: 1px solid #000000; background: #ffffff;">
                          <td style="padding:15px; border:1px solid #000000; vertical-align: top; color: #000000;">
                              <strong style="font-size: 1.1em;"><?= htmlspecialchars($m['nom_utilisateur']) ?></strong><br>
                              <span style="color:#000000; text-decoration: underline;"><?= htmlspecialchars($m['email']) ?></span>
                          </td>
                          <td style="padding:15px; border:1px solid #000000; vertical-align: top; font-weight: bold; color: #000000;">
                              <?= htmlspecialchars($m['sujet']) ?>
                          </td>
                          <td style="padding:15px; border:1px solid #000000; vertical-align: top; line-height: 1.6; color: #000000;">
                              <?= nl2br(htmlspecialchars($m['message'])) ?>
                          </td>
                          <td style="padding:15px; border:1px solid #000000; vertical-align: top; font-size:13px; color: #000000; font-weight: bold; white-space: nowrap;">
                              <?= date('d/m/Y H:i', strtotime($m['date_envoi'])) ?>
                          </td>
                      </tr>
                      <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
          <?php else: ?>
            <div style="text-align:center; padding: 50px; background: white; border-radius: 8px; border: 1px solid #000000; color: #000000;">
                <p style="font-size: 18px; font-weight: bold;">Aucun message n'est présent dans la base de données.</p>
            </div>
          <?php endif; ?>
      </div>
    <?php endif; ?>

  </section>
</main>

<?php include("footer.php"); ?>