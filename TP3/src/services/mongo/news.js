const moment = require('moment')
const {
  getTranslation
} = require('../utils')

/**
 * Fonction de rappel pour récupérer les nouvelles
 *
 * @callback newsCallback
 * @param {Error} err - Objet d'erreur
 * @param {Array} results - Tableaux de nouvelles
 */

/**
 *  Obtenir les nouvelles.
 *
 *  @param db - Base de données Mongo
 *  @param {string} language - Langue courante (p.ex. 'fr', 'en', etc.)
 *  @param {newsCallback} callback - Fonction de rappel pour obtenir le résultat
 */
const getNews = db => language => callback => {
  // À COMPLÉTER
  // .find({}) = findAll = SELECT
  db.collection("news").find({}).toArray(function (err, result) {
    console.log('GET NEWS FROM DATABASE');
    if (err) callback(err, []);
    const news = result.map(news => {
      const translatedText = getTranslation(language, news.text)
      const newCreatedAtDate = moment(news.createdAt, 'YYYY-MM-DD HH:mm:ss').toDate()
      return {
        ...news,
        text: translatedText,
        type: 'news',
        createdAt: newCreatedAtDate
      }
    })
    callback(null, news);
  });
}

module.exports = db => {
  return {
    getNews: getNews(db)
  }
}
