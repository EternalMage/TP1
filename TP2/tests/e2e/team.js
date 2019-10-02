"use strict";

var consoleLog;
module.exports = {
  before: function() {
    consoleLog = console.log;
  },
  'Page d\'équipe': function(client) {
    console.log = function() {}; // Ignore the first log.
    client.url("http://localhost:3000/team")
      .perform(function() {
        console.log = consoleLog;
      })
      .assert.elementNotPresent('#home-link.active', "Le menu de la page d'accueil n'est pas sélectionné.")
      .assert.elementPresent('#team-link.active', "Le menu de la page d'équipe est sélectionné.")
      .assert.elementNotPresent('#projects-link.active', "Le menu de la page de projets n'est pas sélectionné.")
      .assert.elementNotPresent('#publications-link.active', "Le menu de la page de publications n'est pas sélectionné.")
      .waitForUpdate();
    client.end()
  }
};
