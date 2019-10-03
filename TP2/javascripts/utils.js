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
  // The "g" flag indicates that the regular expression should be tested against all possible matches in a string.
  let strArray = str.toLowerCase().match(/[A-Za-z]/g)
  strArray.map(s => t[s] = (t[s] !== undefined)? t[s] + 1 : 1)
  return t
}

/**
 * Retourne un entier qui représente le nombre de jours restants jusqu'au prochain jour de Noël.
 *
 * Notions: Manipulation de Date
 *
 * @param {Date} date - Objet de Date
 * @returns {number} Nombre de jours jusqu'à Noël prochain.
 */
const daysToChristmas = function(date){
  var christmasDate=new Date(date.getFullYear(), 11, 25); // 11 for december
  // christmasDate - date given = number of milliseconds before Christmas
  if (christmasDate-date < 0){
    christmasDate=new Date(date.getFullYear() + 1, 11, 25);
  }
  // convertir milliseconds result to number of days 1000mil x 60s x 60min x 24h
  return Math.ceil((christmasDate-date)/(1000*60*60*24))
}

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
const distinct = function(arr) {
  // reduce: takes accumulator a (which starts at []), parse through array (current value b), execute func
  var distinctArr = arr.reduce(function(a,b){
    if (a.indexOf(b) < 0 ) a.push(b)
    return a
  },[])
  return distinctArr
}

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
const commonKeys = function(obj1, obj2){
  let a = []
  a = Object.keys(obj1).filter(value => Object.keys(obj2).indexOf(value) !== -1)
  return a
}

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
const sortByAuthorAndTitle = function(arr, asc){
  asc === undefined ? asc=true : null
  let sortAsc = function( a, b ) {
    // compare authors
    if ( a.author < b.author ){
      return -1;
    }
    if ( a.author > b.author ){
      return 1;
    }
    
    // else compare titles
    if (a.title < b.title) { 
        return -1;
    } else if (a.title > b.title) {
        return 1
    } else {
        return 0;
    }
  }

  let sortDsc = function( a, b ) {
    // compare authors
    if ( b.author < a.author ){
      return -1;
    }
    if ( b.author > a.author ){
      return 1;
    }
    
    // else compare titles
    if (b.title < a.title) { 
        return -1;
    } else if (b.title > a.title) {
        return 1
    } else {
        return 0;
    }
  }

  asc ? arr.sort(sortAsc) : arr.sort(sortDsc)
  return arr
}

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
const curry3 = function (op) {
  return (x) => {
    return (y) => {
      return (z) => {
          return op(x, y, z)
      }
    }
  }
}

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
  return arr.map(callback)
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
  let value = arr.find(predicate)
  return value !== undefined ? value : null
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
  constructor(id, name, salary) {
    this._id = id
    this._name = name
    this._salary = salary
  }

  // setters & getters
  set name(name) { this._name = name; }
  get name() { return this._name; }
  /*set id(id) { this._id = id; }*/
  get id() { return this._id; }
  /*set salary(salary) { this._salary = salary; }*/
  get salary() { return this._salary; }

  toString() {
    return 'Employee name=' + this._name + ',salary=' + this._salary
  }
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
class Chercheur extends Employee {
  constructor(id, name, salary, bonus) {
    super(id, name, salary)
    this._bonus = bonus
  }

  get salary() {
    return this._salary + (this._salary * this._bonus / 100)
  }
  toString() {
    return 'Employee name=' + this._name + ',salary=' + this._salary + ',bonus=' + this._bonus
  }
}

//const c = new Chercheur(1, 'Konstantinos', 50000, 10)
//console.log(c.toString()) // Renvoie 'Employee name=Konstantinos,salary=50000,bonus=10

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
