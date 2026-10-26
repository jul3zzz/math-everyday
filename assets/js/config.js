/* Math Everyday — réglages des services externes.
   ia.endpoint : adresse d'un petit serveur qui appelle une IA (laisser vide tant qu'il n'existe pas).
     Il reçoit en POST { question, attendu, eleve, correction, niveau } et renvoie { texte }.
   firebase : bloc firebaseConfig de la console Firebase (null = mode démo sur l'appareil).
     Ces valeurs sont publiques par nature : la sécurité vient des règles Firestore (firestore.rules).
   paiement : liens de paiement Stripe (https://buy.stripe.com/…) des 3 offres, et lien du portail client
     (factures, carte, résiliation). Vides = abonnement simulé (démo). Dans Stripe, chaque lien doit renvoyer
     après paiement vers : https://jul3zzz.github.io/math-everyday/?paiement={CHECKOUT_SESSION_ID}&offre=<mensuel|annuel|vie> */
window.ME_CONFIG = {
  ia: { endpoint: '', limiteGratuite: 3 },
  paiement: { mensuel: '', annuel: '', vie: '', portail: '' },
  firebase: {
    apiKey: 'AIzaSyBaiYBwB8m7lgAHXFBQClUTx__V1E6S7lc',
    authDomain: 'math-everyday-b8137.firebaseapp.com',
    projectId: 'math-everyday-b8137',
    storageBucket: 'math-everyday-b8137.firebasestorage.app',
    messagingSenderId: '854966434955',
    appId: '1:854966434955:web:86e2ae5bb18783398b288e'
  }
};
