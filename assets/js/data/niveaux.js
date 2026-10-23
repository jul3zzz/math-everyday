/* Les 8 niveaux, du collège à la prépa. L'index sert au test adaptatif. */
window.NIVEAUX = [
  { id: '6e', nom: '6e', long: 'Sixième', cycle: 'Collège' },
  { id: '5e', nom: '5e', long: 'Cinquième', cycle: 'Collège' },
  { id: '4e', nom: '4e', long: 'Quatrième', cycle: 'Collège' },
  { id: '3e', nom: '3e', long: 'Troisième', cycle: 'Collège' },
  { id: '2nde', nom: '2nde', long: 'Seconde', cycle: 'Lycée' },
  { id: '1re', nom: '1re', long: 'Première (spé maths)', cycle: 'Lycée' },
  { id: 'tle', nom: 'Tle', long: 'Terminale (spé maths)', cycle: 'Lycée' },
  { id: 'mpsi', nom: 'MPSI', long: 'Prépa MPSI', cycle: 'Prépa' }
];
window.niv = function (id) {
  for (var i = 0; i < window.NIVEAUX.length; i++) if (window.NIVEAUX[i].id === id) return window.NIVEAUX[i];
  return null;
};
window.nivIndex = function (id) {
  for (var i = 0; i < window.NIVEAUX.length; i++) if (window.NIVEAUX[i].id === id) return i;
  return -1;
};
