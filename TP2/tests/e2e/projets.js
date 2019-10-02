"use strict";

var consoleLog;
module.exports = {
  before: function() {
    consoleLog = console.log;
  },
  'Page de projets': function(client) {
    console.log = function() {}; // Ignore the first log.
    client.url("http://localhost:3000/projects")
      .perform(function() {
        console.log = consoleLog;
      })
      .assert.elementNotPresent('#home-link.active', "Le menu de la page d'accueil n'est pas sélectionné.")
      .assert.elementNotPresent('#team-link.active', "Le menu de la page d'équipe n'est pas sélectionné.")
      .assert.elementPresent('#projects-link.active', "Le menu de la page de projets est sélectionné.")
      .assert.elementNotPresent('#publications-link.active', "Le menu de la page de publications n'est pas sélectionné.")
      .waitForUpdate();
    client.end()
  },
  'Page du projet de Mailloux': function(client) {
    client.url("http://localhost:3000/project-maillouxmaster")
      .perform(function() {
        console.log = consoleLog;
      })
      .assert.elementNotPresent('#home-link.active', "Le menu de la page d'accueil n'est pas sélectionné.")
      .assert.elementNotPresent('#team-link.active', "Le menu de la page d'équipe n'est pas sélectionné.")
      .assert.elementPresent('#projects-link.active', "Le menu de la page de projets est sélectionné.")
      .assert.elementNotPresent('#publications-link.active', "Le menu de la page de publications n'est pas sélectionné.")
      .waitForUpdate();
    client.end()
  },
  'Page du projet de Bourgoin': function(client) {
    client.url("http://localhost:3000/project-nbourgoinmaster")
      .perform(function() {
        console.log = consoleLog;
      })
      .assert.elementNotPresent('#home-link.active', "Le menu de la page d'accueil n'est pas sélectionné.")
      .assert.elementNotPresent('#team-link.active', "Le menu de la page d'équipe n'est pas sélectionné.")
      .assert.elementPresent('#projects-link.active', "Le menu de la page de projets est sélectionné.")
      .assert.elementNotPresent('#publications-link.active', "Le menu de la page de publications n'est pas sélectionné.")
      .waitForUpdate();
    client.end()
  }
};
