/**
 * Génère un objet représentant un compteur en utilisant les fermetures de Javascript.
 * À partir d'une valeur initiale, chaque appel à la fonction incrémenter
 * cette valeur et la renvoie.
 *
 * @example
 * genererCompteur(1) // Renvoie une fonction
 * genererCompteur() // Renvoie 2
 * genererCompteur() // Renvoie 3
 */
const genererCompteur = function (x) {
  return function () {
    x = x + 1
    return x
  }
}

/**
 * Retourne un object Javascript qui contient en clé les lettres de la châine
 * de caractères et leur occurrence en valeur.
 *
 * Notions: Regex Javascript,
 *
 * @example
 * charCounts('laval') // Renvoie { l: 2, a: 2, v: 1 }
 *
 * @param {string} str - Chaîne de caractère
 * @returns {Object<string, number>}
 */
const charCounts = function(str) {
  let t = {}
  str.split("").map(s => t[s] = (t[s] !== undefined) ? t[s] + 1 : 1)
  return t
}

console.log(charCounts('laval'))

/**
 * Retourne un entier qui représente le nombre de jours restants jusqu'au prochain jour de Noël.
 *
 * Notions: Manipulation de Date
 *
 * @param {Date} date - Objet de Date
 * @returns {number} Nombre de jours jusqu'à Noël prochain.
 */
const daysToChristmas = undefined

/**
 * Renvoie un tableau sans éléments dupliqués.
 *
 * Notions: Manipulation de tableaux (reduce)
 *
 * @example
 * distinct([1, 2, 2, 3, 1]) // Renvoie [1, 2, 3]
 *
 * @param {Array} arr - Tableau avec potentiellement des éléments dupliqués
 * @returns {Array} Tableau sans éléments dupliqués
 */
const distinct = undefined

/**
 * Renvoie un tableau qui contient les clés partagées entre deux objets Javascript.
 *
 * Notions: Manipulation objet (Object.keys()) et tableaux
 *
 * @example
 * commonKeys({ x: 1, y: 2}, { x: 2, z: 4 }) // Renvoie [x]
 *
 * @param {Object} obj1 - Premier objet
 * @param {Object} obj2 - Deuxième objet
 * @returns {Array} Tableau qui contient les cléfs partagées entre deux objets
 */
const commonKeys = undefined

/**
 * Renvoie un tableau trié selon le champ 'author' d'un objet. Si deux objets
 * ont la même valeur dans l'attribut 'author', alors on compare la valeur
 * de l'attribut 'title'.
 *
 * Notion: Trie de tableaux avec .sort(comparator)
 * @param {Array} arr - Tableau à trié
 * @param {Boolean} asc - True si on trie en ordre croissant. False pour décroissant
 * @returns {Array} Tableau trié
 */
const sortByAuthorAndTitle = undefined

/**
 * Convertit une fonction de trois paramètre non-currifiée vers une fonction currifiée de 3 paramètres.
 *
 * Notions: Fonctions lambda
 *
 * @example
 * const sum = (x, y, z) => x + y + z
 * sum(10, 5, 3) // Renvoie 18
 * const sumCurried = curry(sum)
 * sumCurried(10)(5)(3) // Renvoie 18
 *
 * @param {Function} fun - Fonction à currifier
 * @param {any} x - 1re paramètre
 * @param {any} y - 2e paramètre
 * @param {any} z - 3e paramètre
 * @returns {Function} Fonction currifiée
 */
const curry3 = undefined

/**
 * Applique une fonction de rappel sur chaque élément d'un tableau et retourne
 * le tableau transformé.
 * Cette fonction existe déjà, mais réimplémentez la.
 *
 * Notions: Manipulation de tableaux, récursivité
 *
 * @example
 * map([1,2,3], x => x * 2) // renvoie [2,4,6]
 * @example
 * map([1,2,3], x => x + '' + x) // renvoie ['11', '22', '33']
 *
 * @param {Array} arr
 * @param callback - Fonction de rappel
 * @returns {Array}
 */
function map(arr, callback) {
  return undefined
}

/**
 * Applique un prédicat sur chaque élément d'un tableau et renvoie le premier
 * éléments qui satisfait le prédicat. Sinon, renvoie null.
 * Cette fonction existe déjà, mais réimplémentez la.
 *
 * Notions: Manipulation de tableaux, récursivité
 *
 * @example
 * find([1,4,3], x => x > 2) // renvoie 4
 * @example
 * find([1,4,3], x => x > 5) // renvoie null
 *
 * @param {Array} arr
 * @param callback - Fonction de rappel
 * @returns {Array}
 */
function find(arr, predicate) {
  return undefined
}

/**
 * Cette fonction de rappel prend un accumulateur et une valeur de tableau en entrée et renvoie
 * un nouveau accumulateur.
 *
 * @callback foldCallback
 * @template S
 * @param {S} acc - Accumulateur
 * @template T
 * @param {T} x - Valeur d'un tableau
 * @returns {S} Accumulateur
 */

/**
 * Applique une fonction de rappel à partir d'un accumulateur, initialisé au
 * départ, et chaque élément d'un tableau et retourne l'accumulateur final.
 *
 * Notions: Manipulation de tableaux, récursivité
 *
 * @example
 * fold([1,2,3,4,5], 0, (acc, x) => acc + x) // renvoie 15
 * @example
 * fold([1,2,3], [], (acc, x) => [...acc, x ** 2]) // renvoie [1,4,9]
 *
 * @template T
 * @param {Array<T>} arr
 * @template S
 * @param {S} init - Valeur initiale de l'accumulateur
 * @param {foldCallback} op - Fonction de rappel qui prend un accumulateur et un
 * élément du tableau en paramètre.
 * @returns {S} Accumulateur
 */
function fold(arr, init, op) {
  return undefined
}

/**
 * Classe Employee représentée par trois attributs: id, name, salary. Nous
 * pouvons accéder aux trois attributs, mais seulement 'name' peut être
 * modifié.
 *
 * Il existe une méthode toString() qui permet d'afficher une représentation
 * en chaîne de caractères de l'objet.
 *
 * @example
 * const e = new Employee(1, 'Konstantinos', 50000)
 * e.toString() // Renvoie 'Employee name=Konstantinos,salary=50000
 */
class Employee {
}

/**
 * Classe Chercheur représentée par 4 attributs: id, name, salary, bonus.
 * Elle hérite de Employee. L'attribut 'bonus' ne peut être accéder ni
 * modifié.
 *
 * Surcharger la méthode toString() pour ajouter l'attribut bonus.
 *
 * @example
 * const e = new Chercheur(1, 'Konstantinos', 50000, 10)
 * e.toString() // Renvoie 'Employee name=Konstantinos,salary=50000,bonus=10
 */
class Chercheur {
}

export {
  genererCompteur,
  charCounts,
  daysToChristmas,
  distinct,
  commonKeys,
  sortByAuthorAndTitle,
  curry3,
  map,
  find,
  fold,
  Employee,
  Chercheur
}
