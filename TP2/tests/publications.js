"use strict";

const assert = require("assert");
const { expect } = require('chai')
const { setValue } = require('./utils')

var consoleLog;
module.exports = {
  before: function() {
    consoleLog = console.log;
  },
  'Page de publications': function(client) {
    console.log = function() {}; // Ignore the first log.
    client.url("http://localhost:3000/publications")
      .perform(function() {
        console.log = consoleLog;
      })
      .assert.elementNotPresent('#home-link.active', "Le menu de la page d'accueil n'est pas sélectionné.")
      .assert.elementNotPresent('#team-link.active', "Le menu de la page d'équipe n'est pas sélectionné.")
      .assert.elementNotPresent('#projects-link.active', "Le menu de la page de projets n'est pas sélectionné.")
      .assert.elementPresent('#publications-link.active', "Le menu de la page de publications est sélectionné.")

    client.expect.element('#modal-pubform').to.not.be.visible
    client
      .click('a.trigger button', () => {
        client.expect.element('#modal-pubform').to.be.visible
        client.elements('css selector', '.author-input', result => {
          assert(result.value.length === 1, "Le nombre de champ d'auteur n'est pas égal à 1.")
        })
        client.click('.add-author i', result => {
          client.elements('css selector', '.author-input', result => {
            assert(result.value.length === 2, "Le nombre de champ d'auteur n'est pas égal à 2.")
          })
        })
        client.click('.add-author i', () => {
          client.elements('css selector', '.author-input', result => {
            assert(result.value.length === 3, "Le nombre de champ d'auteur n'est pas égal à 3.")
          })
        })
        client.click('.remove-author:nth-child(14) i', () => {
          client.elements('css selector', '.author-input', result => {
            assert(result.value.length === 2, "Le nombre de champ d'auteur n'est pas égal à 2.")
          })
        })
      })
      .click('#modal-pubform .close-button', () => {
        client.expect.element('#modal-pubform').to.not.be.visible
      })

    // Changement du type de filtre
    client.expect.element('#fieldFilterSection').to.have.value.that.equals('date')
    client.setValue('#fieldFilterSection', 'title', result => {
      client
        .pause(500)
        .assert.urlContains('sort_by=title')
    })
    client.setValue('#fieldFilterSection', 'date', result => {
      client
        .pause(500)
        .assert.urlContains('sort_by=date')
    })
    client.url('http://localhost:3000/publications?sort_by=title').waitForUpdate()
    client.expect.element('#fieldFilterSection').to.have.value.that.equals('title')

    // Changement de l'ordre du filtre
    client.expect.element('#filterAscValueSection').to.have.value.that.equals('desc')
    client
      .execute(setValue, ['#filterAscValueSection', 'asc'], result => {
        client.pause(500).assert.urlContains('order_by=asc')
      })
      .execute(setValue, ['#filterAscValueSection', 'desc'], result => {
        client.pause(500).assert.urlContains('order_by=desc')
      })
    client.url('http://localhost:3000/publications?order_by=asc').waitForUpdate()
    client.expect.element('#filterAscValueSection').to.have.value.that.equals('asc')

    // Affichage de la page courante dans la pagination
    client.assert.elementNotPresent('.pagination .pagination-link.active:nth-child(1)', "La fonction page précédente de la pagination est active.")
    client.assert.elementPresent('.pagination .pagination-link.active:nth-child(2)', "La 1re page de la pagination est active.")
    client.assert.elementNotPresent('.pagination .pagination-link.active:nth-child(3)', "La 2re page de la pagination est active.")
    client.assert.elementNotPresent('.pagination .pagination-link.active:nth-child(4)', "La 3re page de la pagination est active.")
    client.assert.elementNotPresent('.pagination .pagination-link.active:nth-child(5)', "La fonction prochaine page de la pagination est active.")
    client
      .click('.pagination .pagination-link:nth-child(4)', () => {
        client.pause(500).assert.urlContains('page=3')
      })

    // Changement du nombre d'éléments par page
    client.expect.element('#elementsPerPageSection').to.have.value.that.equals('10')
    client
      .execute(setValue, ['#elementsPerPageSection', '50'], result => {
        client
          .pause(500)
          .assert.urlContains('limit=50')
          .assert.urlContains('page=1')
      })
      .execute(setValue, ['#elementsPerPageSection', '20'], result => {
        client
          .pause(500)
          .assert.urlContains('limit=20')
          .assert.urlContains('page=1')
      })
      .url('http://localhost:3000/publications?limit=10')
      .expect.element('#elementsPerPageSection').to.have.value.that.equals('10')

    // Si on change de page, alors le nombre d'éléments par page reste le même
    client
      .url('http://localhost:3000/publications?limit=50')
      .click('.pagination .pagination-link:nth-child(4)', () => {
        client
          .pause(500)
          .assert.urlContains('page=3')
          .assert.urlContains('limit=50')
      })

    // Suppression de la première publication
    client.expect.element('.publications tr:first-child .pubtitle').text.to.equal('Title test')
    client.click('.publications tr:first-child .del-icon i', result => {
      client.expect.element('.publications tr:first-child .pubtitle').text.to.equal('LAMA: a language adaptive method for question answering')
    })
    // Suppression de la 3ieme publication
    client.expect.element('.publications tr:nth-child(3) .pubtitle').text.to.equal('FICLONE: Improving DBpedia Spotlight Using Named Entity Recognition and Collective Disambiguation')
    client.click('.publications tr:nth-child(3) .del-icon i', result => {
      client.expect.element('.publications tr:nth-child(3) .pubtitle').text.to.equal('An assessment of open relation extraction systems for the semantic web')
    })

    client.end()
  }
};
