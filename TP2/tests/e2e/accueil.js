"use strict"

var consoleLog;
module.exports = {
  before: function() {
    consoleLog = console.log;
  },
  'Page d\'accueil': function(client) {
    console.log = function() {}; // Ignore the first log.
    client.url("http://localhost:3000")
      .perform(function() {
        console.log = consoleLog;
      })
      .assert.elementPresent('#home-link.active', "Le menu de la page d'accueil est sélectionné.")
      .assert.elementNotPresent('#team-link.active', "Le menu de la page d'équipe n'est pas sélectionné.")
      .assert.elementNotPresent('#projects-link.active', "Le menu de la page de projets n'est pas sélectionné.")
      .assert.elementNotPresent('#publications-link.active', "Le menu de la page de publications n'est pas sélectionné.")
      .assert.containsText('.jumbotron', 'Le laboratoire Semantic IA est un laboratoire de recherche')
      .waitForUpdate();

     client.expect.element('nav li .dropdown .dropdown-content').to.not.be.visible

    client.end()
  }
};
