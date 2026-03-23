<?php
$host = 'localhost';
$db   = 'gestion_utilisateur';
$user = 'root';
// Mot de passe MySQL
$pass = ''; 
// Encodage des caractères utilisé pour la connexion
// utf8mb4 supporte tous les caractères Unicode, y compris les emojis
$charset = 'utf8mb4';
// Construction du DSN (Data Source Name) : chaîne qui identifie la source de données
// Elle précise : le type de BDD (mysql), le serveur (host), la BDD (dbname) et l'encodage (charset)
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
     // Active le mode "exception" : toute erreur SQL déclenchera une exception PDOException
    // (au lieu de retourner silencieusement false)
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
     // Définit le mode de récupération par défaut des résultats
    // FETCH_ASSOC retourne les données sous forme de tableau associatif (clé => valeur)
    // au lieu d'un tableau indexé par numéro
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
     // Désactive la simulation des requêtes préparées
    // false = utilise les vraies requêtes préparées du serveur MySQL
    // ce qui est plus sécurisé contre les injections SQL
    PDO::ATTR_EMULATE_PREPARES   => false,
];
// Bloc try/catch : tente la connexion et intercepte les erreurs éventuelles
try {
     // Création d'une nouvelle instance PDO avec :
    // - le DSN (type de BDD + serveur + nom de la BDD + charset)
    // - le nom d'utilisateur MySQL
    // - le mot de passe MySQL
    // - le tableau d'options défini plus haut
     $pdo = new PDO($dsn, $user, $pass, $options);
     // Message affiché si la connexion s'est établie avec succès
     echo "Connexion réussie à la base de données !";
} catch (\PDOException $e) {
     // En cas d'échec de connexion, une PDOException est capturée dans $e
    // On relance une nouvelle PDOException avec :
    // - $e->getMessage() : le message d'erreur original
    // - (int)$e->getCode() : le code d'erreur converti en entier
    // Cela propage l'erreur vers le niveau supérieur pour un meilleur débogage
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
?>