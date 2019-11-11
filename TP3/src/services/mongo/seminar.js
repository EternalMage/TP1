const moment = require('moment')
const {
  getTranslation
} = require('../utils')

/**
 * Fonction de rappel pour récupérer les séminaires
 *
 * @callback seminarCallback
 * @param {Error} err - Objet d'erreur
 * @param {Array} result - Séminaires
 */

/**
 *  Obtenir l'ensemble des séminaires.
 *
 *  @param db - Base de données Mongo
 *  @param {Object} query - Requête particulière sous le format suivant:
 *    { from: <DATE>, sort: { field: <string>, order: <ASC|DESC> } }
 *  @param {string} language - Langue courante (p.ex. 'fr', 'en', etc.)
 *  @param {seminarCallback} callback - Fonction de rappel pour obtenir le résultat
 */
const getSeminars = db => query => language => callback => {
  // À COMPLÉTER
  // .find({}) = findAll = SELECT
  db.collection("seminars").find({}).toArray(function (err, result) {
    console.log('GET SEMINARS FROM DATABASE');
    if (err) callback(err, []);
    //console.log(result);
    const seminars = result.map(seminar => {
      const translatedTitle = getTranslation(language, seminar.title)
      const translatedDescription = getTranslation(language, seminar.description)
      const newDate = moment(seminar.date, 'YYYY-MM-DD HH:mm:ss').toDate()
      const newCreatedAtDate = moment(seminar.createdAt, 'YYYY-MM-DD HH:mm:ss').toDate()
      return {
        ...seminar,
        title: translatedTitle,
        description: translatedDescription,
        type: 'seminar',
        date: newDate,
        createdAt: newCreatedAtDate
      }
    })
    callback(null, seminars);
  });
}

module.exports = db => {
  return {
    getSeminars: getSeminars(db)
  }
}