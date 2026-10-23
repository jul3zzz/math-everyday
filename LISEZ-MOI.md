# Math Everyday

Site de maths « 30 minutes par jour », de la 6e à la prépa MPSI.
Logo : le symbole φ (nombre d'or). Trois designs au choix : Minimaliste, Enfantin, Doré élégant.

## Ce qui marche déjà (version démo)

- **Test de niveau** : 20 QCM adaptatifs (la difficulté monte quand on réussit, descend quand on se trompe), puis 5 exercices à rédiger pour confirmer. Le niveau peut être changé à la main.
- **Leçons du jour** : chaque jour, 3 leçons proposées (2 suites du programme + 1 révision si une leçon a été ratée). Une seule est gratuite, au choix de l'élève.
- **Leçons** : 96 leçons (12 par niveau), chacune avec un cours, une vidéo YouTube conseillée et 3 exercices corrigés (2 essais, correction détaillée).
- **Abonnement** : 4,99 €/mois (satisfait ou remboursé le 1er mois), 39,99 €/an, 49,99 € à vie. En démo, l'activation est simulée.
- **Mail quotidien** : réglage de l'heure + aperçu dans Réglages. Le modèle prêt à l'envoi est dans `mails/lecon-du-jour.html`.

Tout est enregistré dans le navigateur (localStorage, clé `mathEveryday.v1`).

## Tester en local

```
node _serve.js
```
puis ouvrir http://localhost:4182

## Organisation des fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Page unique |
| `assets/css/base.css` | Mise en page commune |
| `assets/css/themes.css` | Les 3 designs |
| `assets/js/core.js` | Outils, icônes, logo, stockage, correction des réponses |
| `assets/js/test.js` | Test de niveau |
| `assets/js/views.js` | Pages (aujourd'hui, leçon, programme, abonnement, réglages) |
| `assets/js/app.js` | Navigation |
| `assets/js/data/lecons-*.js` | Les leçons, un fichier par niveau |
| `assets/js/data/placement.js` | Les questions du test (bonne réponse toujours en 1re position, mélangée à l'affichage) |
| `assets/js/data/videos.js` | La vidéo choisie pour chaque leçon |

Ajouter une leçon : copier un bloc `{ id: …, titre: …, cours: …, exos: [...] }` dans le fichier du niveau. Les maths s'écrivent en LaTeX entre `$…$`. Ne jamais écrire `<` ou `>` dans une formule : utiliser `\lt` et `\gt`.

## Passer de la démo au réel (étape suivante)

1. **Comptes** : Firebase Authentication (connexion par e-mail) + Firestore pour sauvegarder la progression.
2. **Mails** : un service d'envoi (ex. Brevo, gratuit jusqu'à 300 mails/jour) déclenché chaque quart d'heure par une tâche planifiée (GitHub Actions), qui remplit `mails/lecon-du-jour.html`.
3. **Paiement** : Stripe (liens de paiement pour les 3 offres + webhook qui active l'abonnement dans Firestore). Le remboursement du 1er mois se fait depuis le tableau de bord Stripe.
