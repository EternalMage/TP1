import { describe, it } from 'mocha'
import { expect } from 'chai'
import { genererCompteur, charCounts, daysToChristmas, commonKeys, distinct, sortByAuthorAndTitle, curry3, map, find, fold, Employee, Chercheur } from '../javascripts/utils'

describe('Exercices de préparation en Javascript (Langage)', function () {

  describe('genererCompteur', function () {
    it('devrait retourner la prochaine valeur en série à partir d\'une valeur initiale', function () {
      let c1 = genererCompteur(0)
      expect(c1()).to.equal(1)
      expect(c1()).to.equal(2)

      let c2 = genererCompteur(10)
      expect(c2()).to.equal(11)
    })
  })

  describe('charCounts', function () {
    it("devrait retourner toutes les occurrences des lettres d'une chaîne de caractères", function () {
      let occurrences = charCounts('laval')
      let expectedValue = {'l': 2, 'a': 2, 'v': 1}
      expect(occurrences).to.deep.equal(expectedValue)
    })

    it("devrait compter uniquement les lettres de l'alphabeth", function () {
      let occurrences = charCounts('1ava1')
      let expectedValue = {'a': 2, 'v': 1}
      expect(occurrences).to.deep.equal(expectedValue)
    })

    it('devrait changer les lettres en minuscules', function () {
      let occurrences = charCounts('Laval')
      let expectedValue = {'l': 2, 'a': 2, 'v': 1}
      expect(occurrences).to.deep.equal(expectedValue)
    })
  })

  describe('daysToChristmas', function () {
    it('devrait retourner le nombre de jours avant le 25 décembre', function () {
      let cmas = new Date(2018, 11, 25)
      expect(daysToChristmas(cmas)).to.equal(0)

      let firstOfSeptember = new Date(2018, 8, 1)
      expect(daysToChristmas(firstOfSeptember)).to.equal(116)
    })

    it('devrait gérer le cas où on se trouve en fin décembre', function () {
      let endDecember = new Date(2018, 11, 31)
      expect(daysToChristmas(endDecember)).to.equal(359)
    })
  })

  describe('commonKeys', function () {
    it('devrait donner les clés partagées par deux objets', function () {
      expect(commonKeys({x: 1, y: 2}, {x: 2, z: 4})).to.deep.equal(['x'])
    })
  })

  describe('distinct', function () {
    it("devrait retirer les éléments dupliqués d'un tableau Javascript", function () {
      let arr = [6, 1, 2, 2, 3, 4, 5, 3]
      expect(distinct(arr)).to.deep.equal([6, 1, 2, 3, 4, 5])
    })
  })

  describe('sortByAuthorAndTitle', function () {
    it("devrait trier un tableau d'objets selon l'attribut author et title", function () {
      let arr = [
        { author: 'Michel Michaud', title: 'Sous la surface' },
        { author: 'Patrick Sénécal', title: 'Les Sept Jours du talion' },
        { author: 'Michel Michaud', title: 'Violence à l\'origine' },
        { author: 'Michel David', title: 'Un bonheur si fragile' }
      ]

      let expectedArr = [arr[3], arr[0], arr[2], arr[1]]
      expect(sortByAuthorAndTitle(arr, true)).to.deep.equal(expectedArr)
      expect(sortByAuthorAndTitle(arr)).to.deep.equal(expectedArr)
    })

    it("devrait être capable de trier en ordre décroissant", function () {
      let arr = [
        { author: 'Michel Michaud', title: 'Sous la surface' },
        { author: 'Patrick Sénécal', title: 'Les Sept Jours du talion' },
        { author: 'Michel Michaud', title: 'Violence à l\'origine' },
        { author: 'Michel David', title: 'Un bonheur si fragile' }
      ]

      let expectedArr = [arr[1], arr[2], arr[0], arr[3]]
      expect(sortByAuthorAndTitle(arr, false)).to.deep.equal(expectedArr)
    })
  })

  describe('curry3', function () {
    it("devrait convertir une fonction de 3 paramètre en une fonction de 3 paramètres currifiée", function () {
      const sum = (x, y, z) => x + y + z
      expect(curry3(sum)(10)(5)(3)).to.equal(18)
    })

    it("devrait conservé l'ordre des paramètres lors de la currification", function () {
      const minus = (x, y, z) => x - y - z
      expect(curry3(minus)(10)(5)(3)).to.equal(2)
    })
  })

  describe('map', function () {
    it("devrait transformer chaque élément d'un tableau selon une fonction callback", function () {
      expect(map([1, 2, 3], x => x * 2)).to.deep.equal([2, 4, 6])
      expect(map([1, 2, 3], x => x + '' + x)).to.deep.equal(['11', '22', '33'])
    })
  })

  describe('find', function () {
    it("devrait trouver le premier élément d'un tableau qui satisfait un prédicat", function () {
      expect(find([1, 4, 3], x => x > 2)).to.equal(4)
    })

    it('devrait renvoyer null si aucun élément satisfait le prédicat', function () {
      expect(find([1, 4, 3], x => x > 5)).to.equal(null)
    })
  })

  describe('fold', function () {
    it("devrait appliquer une fonction sur chaque élément d'un tableau et de récupérer le résutlats dans un accumulateur", function () {
      expect(fold([1, 2, 3, 4, 5], 0, (acc, x) => acc + x)).to.equal(15)
      expect(fold([1, 2, 3], [], (acc, x) => [...acc, x ** 2])).to.deep.equal([1, 4, 9])
    })
  })

  describe('Employee', function () {
    const id = 1
    const name = 'Konstantinos'
    const salary = 50000
    const e = new Employee(id, name, salary)

    it('devrait représenter un livre selon le titre, l\'auteur et des étiquettes', function () {
      expect(e.id).to.equal(id)
      expect(e.name).to.equal(name)
      expect(e.salary).to.equal(salary)
    })

    it('devrait pas pouvoir modifié l\'attribut id et salaire', () => {
      expect(() => e.id = 2).to.throw()
      expect(() => e.name = 'Marc').to.not.throw()
      expect(() => e.salary = 10000).to.throw()
    })

    it('devrait avoir une méthode toString()', () => {
      expect(e.toString()).to.equal('Employee name=Marc,salary=50000')
    })
  })

  describe('Chercheur', function () {
    const id = 1
    const name = 'Konstantinos'
    const salary = 50000
    const bonus = 10 // En pourcentage
    const e = new Chercheur(id, name, salary, 10)

    it('devrait surcharger la méthode de salaire pour ajouter un bonus', function () {
      expect(e.salary).to.be.closeTo(55000, 0.001)
    })

    it('devrait avoir accès à l\'attribut bonus', () => {
      expect(e.bonus).to.equal(undefined)
    })

    it('devrait avoir une méthode toString qui étend la méthode toString de la classe parente et qui ajoute l\'attribut bonus', () => {
      expect(e.toString()).to.equal('Employee name=Konstantinos,salary=50000,bonus=10')
    })
  })
})
