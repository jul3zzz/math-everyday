/* Math Everyday — réglages des services externes.
   ia.endpoint : adresse d'un petit serveur qui appelle une IA (laisser vide tant qu'il n'existe pas).
     Il reçoit en POST { question, attendu, eleve, correction, niveau } et renvoie { texte }.
   firebase : bloc firebaseConfig de la console Firebase (laisser null = mode démo sur l'appareil). */
window.ME_CONFIG = {
  ia: { endpoint: '', limiteGratuite: 3 },
  firebase: null
};
