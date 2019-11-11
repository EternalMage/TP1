/**
 * Fonction de rappel pour récupérer les membres du laboratoire.
 *
 * @callback teamCallback
 * @param {Error} err - Objet d'erreur
 * @param {Array} results - Tableau de membres
 */
const config = require('./../../config.json')
const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(config.dbUrl, {
  useNewUrlParser: true
})

const getTeamMembers = db => callback => {
  // À COMPLÉTER

  // .find({}) = findAll = SELECT
  db.collection("members").find({}).toArray(function(err, result) {
    console.log('GET TEAM MEMBERS FROM DATABASE');
    if (err) callback(err, []);
    //console.log(result);
    callback(null, result);
  });
}

module.exports = db => {
  return {
    getTeamMembers: getTeamMembers(db)
  }
}