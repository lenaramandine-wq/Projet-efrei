<?php
// 1. Inclusion de la connexion et initialisation
include('connexion.php'); 
$message_succes = "";

// 2. Traitement du formulaire (Récupération via $_POST)
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['envoyer'])) {
    $nom     = $_POST['nom_complet'];
    $email   = $_POST['email'];
    $sujet   = $_POST['sujet'];
    $message = $_POST['message_texte'];

    $sql = "INSERT INTO messages_contact (nom_utilisateur, email, sujet, message) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    
    if ($stmt->execute([$nom, $email, $sujet, $message])) {
        // Message de succès personnalisé
        $message_succes = "<div style='background:#d4edda; color:#155724; padding:15px; border-radius:5px; margin-bottom:20px;'>Merci " . htmlspecialchars($nom) . " ! Votre message a bien été envoyé.</div>";
    }
}

// 3. Récupération des messages si clic sur le bouton "Voir"
$liste_messages = [];
if (isset($_GET['afficher'])) {
    $stmt = $pdo->query("SELECT * FROM messages_contact ORDER BY date_envoi DESC");
    $liste_messages = $stmt->fetchAll();
}
?>


<main>
  <section class="contact-section">
    <div class="contact-container">

      <div class="info-card">
        <h2>Nous Contacter</h2>
        <p><strong>Adresse :</strong><br>
          30 Avenue de la République<br>
          94800 Villejuif</p>

        <p><strong>Téléphone :</strong><br>
          06 12 14 58 46 72</p>

        <p><strong>Email :</strong><br>
          contact@efrei-informatique.fr</p>

        <p>
          Notre équipe est disponible du lundi au vendredi de 9h à 18h.
          Nous répondons sous 24 à 48h.
        </p>
        
        <form method="GET">
            <button type="submit" name="afficher" style="background:#34495e; color:white; border:none; padding:10px; cursor:pointer; border-radius:5px; margin-top:10px;">Voir les personnes enregistrées</button>
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

          <button type="submit" name="envoyer" class="btn">Envoyer</button>
        </form>
      </div>

    </div>

    <?php if (!empty($liste_messages)): ?>
      <div style="max-width: 1000px; margin: 30px auto; padding: 20px; background: #fff; color: #000;">
          <h3>Personnes ayant rempli le formulaire :</h3>
          <table border="1" style="width:100%; border-collapse:collapse;">
              <tr><th>Nom</th><th>Email</th><th>Date</th></tr>
              <?php foreach ($liste_messages as $m): ?>
              <tr>
                  <td style="padding:10px;"><?= htmlspecialchars($m['nom_utilisateur']) ?></td>
                  <td style="padding:10px;"><?= htmlspecialchars($m['email']) ?></td>
                  <td style="padding:10px;"><?= $m['date_envoi'] ?></td>
              </tr>
              <?php endforeach; ?>
          </table>
      </div>
    <?php endif; ?>
  </section>
</main>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     