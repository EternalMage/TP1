const {
  getTranslation
} = require('../utils')
const ObjectId = require('mongodb').ObjectId

/**
 * Fonction de rappel pour récupérer les projets
 *
 * @callback projectsCallback
 * @param {Error} err - Objet d'erreur
 * @param {Array} results - Tableaux de projets
 */

/**
 *  Obtenir les projets.
 *
 *  @param db - Base de données Mongo
 *  @param {string} language - Langue courante (p.ex. 'fr', 'en', etc.)
 *  @param {projectsCallback} callback - Fonction de rappel pour obtenir le résultat
 */
const getProjects = db => language => callback => {
  // À COMPLÉTER
  // .find({}) = findAll = SELECT
  db.collection("projects").find({}).toArray(function (err, result) {
    console.log('GET PROJECTS FROM DATABASE');
    if (err) callback(err, []);
    const projects = result.map(project => {
      const translatedTitle = getTranslation(language, project.title)
      const translatedDescription = getTranslation(language, project.description)
      return {
        ...project,
        title: translatedTitle,
        description: translatedDescription,
        publications: (project.publications === undefined) ? [] : project.publications
      }
    })
    callback(null, projects);
  });
}

/**
 * Fonction de rappel pour récupérer un projet particulier
 *
 * @callback projectCallback
 * @param {Error} err - Objet d'erreur
 * @param {Object} result - Un projet particulier
 */

/**
 *  Obtenir un projet selon un identificatn.
 *
 *  @param db - Base de donnée Mongo
 *  @param {Object} translationObj - Objet qui contient l'ensemble des traductions définies
 *  @param {string} language - Langue courante (p.ex. 'fr', 'en', etc.)
 *  @param {int} id - Identificant unique du projet à trouer
 *  @param {projectCallback} callback - Fonction de rappel pour obtenir le résultat
 */
const getProjectById = db => translationObj => language => id => callback => {
  // À COMPLÉTER
  let query = {
    "_id": id
  }
  db.collection("projects").find({}, query).toArray(function (err, result) {
    console.log('GET PROJECTS BY ID FROM DATABASE');
    if (err) {
      const errorMsg = translationObj === undefined && translationObj['PROJECTS'] === undefined && translationObj['PROJECTS']['PROJECT_NOT_FOUND_MSG'] === undefined ? `${id} not found` : translationObj['PROJECTS' ['PROJECT_NOT_FOUND_MSG']]
      const error = new Error(errorMsg)
      error.name = 'NOT_FOUND';
      callback(error, []);
    }
    callback(null, result);
  });

  //callback()
}

module.exports = db => {
  return {
    getProjects: getProjects(db),
    getProjectById: getProjectById(db)
  }
}
