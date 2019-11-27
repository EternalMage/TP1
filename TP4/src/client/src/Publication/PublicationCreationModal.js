import React, { useState } from 'react'

const pug = window.pug
const moment = window.moment
const url = 'http://localhost:3000/api/publications'

export default props => {
    const monthNames = moment.months()
    const buttonModalHandler = props.buttonModalHandler

    const defaultFormData = {
        'year': '',
        'month': '',
        'title': '',
        'authors': [''],
        'venue': ''
    }
    const [formData, setFormData] = useState(defaultFormData)


    const onInputChangeHandler = (e) => {
        console.log("INPUT CHANGE")
        console.log(JSON.stringify(e.target.name))
        console.log(JSON.stringify(e.target.value))
        const newFormData = JSON.parse(JSON.stringify(formData)) // Deep Clone (see : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

        if (e.target.name === "authors[]") {
            const i = e.target.id.split('-')[1]
            newFormData.authors[i] = e.target.value
        } else {
            newFormData[e.target.name] = e.target.value
        }


        setFormData(newFormData)
    }

    const onClickAddAuthorHandler = () => {
        const newFormData = JSON.parse(JSON.stringify(formData)) // Deep Clone (see : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
        newFormData.authors.push('')
        setFormData(newFormData)
    }

    const onClickHandler = async(e) => {
        e.preventDefault()
        const send = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        alert('Send Success!')
        setFormData(defaultFormData)
    }

    return pug `
    .modal(className="show-modal")
      .modal-content
        i.fa.fa-window-close.fa-2x.close-button(onClick=buttonModalHandler)

        h2 Création d'une publication

        form
          label(for="year") Année:

          input(
            type="number",
            name="year",
            min="1900",
            max="2099",
            step="1",
            value=formData.year,
            placeholder="Année",
            onChange=onInputChangeHandler)

          br

          label(for="month") Mois #{' '}

          select(name="month", value=formData.month, onChange=onInputChangeHandler)
            option(value="")
              | - #{' '} Mois - #{' '}

            each monthName, i in monthNames
              option(key=monthName, value=i)= monthName.charAt(0).toUpperCase() + monthName.slice(1)

          br

          label(for="title") Titre #{':'}

          input(type="text",
            name="title",
            placeholder="Titre",
            value=formData.title,
            onChange=onInputChangeHandler)

          br

          label(for="authors") Auteur #{':'}

          br

          each author, i in formData.authors
            .author-input(key="div" + author)
              input(
                id="author-" + i,
                type="text",
                name="authors[]"
                placeholder="Auteur",
                value=author,
                onChange=onInputChangeHandler)

            if i > 0
              .remove-author
                i.fa.fa-minus.fa-3x

          .add-author
            i.fa.fa-plus.fa-3x(onClick=onClickAddAuthorHandler)

          label(for="venue") Revue #{''}

          input(
            type="text",
            name="venue",
            placeholder="Revue",
            value=formData.venue,
            onChange=onInputChangeHandler)

          br

          input(type="submit", value="Création d'une publication", onClick=onClickHandler)
  `
}