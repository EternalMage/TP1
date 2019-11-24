import React, { useState, useEffect } from 'react'

import Loader from '../Loader/Loader'

import './Project.css'
import PublicationTable from './../Publication/PublicationTable'

const pug = window.pug
const fetch = window.fetch

export default props => {

  // À COMPLÉTER
  // Cette composante correspond à la route '/projects/:id'. L'identifiant id est disponible dans 'props.match.params.id'
  // 1- Récupérer le project du service web http://localhost:3000/api/projects/:id avec 'fetch' et avec l'entête 'accept-language' à 'fr'.
  // 2- Une fois que les données ont été récupérées, le loading devient false
  // 3- Réutilisez la composante PublicationTable
  // 4- Si on supprime une publication, la liste doit être mise à jour.

  /*const project = {}
  const publications = []
  const loading = false*/

  const [project, setProject] = useState({})
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteState, setDeleteState] = useState(false)

  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch('http://localhost:3000/api/projects/' + props.match.params.id, {
        headers: {
          'accept-language': 'fr'
        }
      })
      const project = await response.json();
      console.log('useEffect()')
      setProject(project.project)
      setPublications(project.publications)
      setLoading(false)
      setDeleteState(false)
    }
    fetchProject()
  }, [deleteState])

  const trashButtonHandler = e => {
    const deletePublication = async () => {
      const response = await fetch('http://localhost:3000/api/publications/' + e.currentTarget.dataset.id, { method: 'DELETE' })
      const responseText = await response.text();
      console.log('Delete response: ' + responseText)
      setDeleteState(true)
    }
    deletePublication()
  }

  return pug`
    .loading-container
      if loading
        Loader(loading=loading)

      else
        if project && Object.keys(project).length !== 0
          h1= project.title

          section.description
            footer.meta
              p
                | Étudiant: #{''}
                = project.student

              p
                | Directeur(e): #{''}
                = project.supervisor

              if project.cosupervisor
                p
                  | Co-directeur(e)(s): #{''}
                  = project.cosupervisor

            div
              each paragraph, i in project.description.split('\n')
                p(key=i)= paragraph

            if project.thesisUrl
              p
                | Pour plus d'informations, #{''}
                a(href=project.thesisUrl) cliquez ici

          if publications.length > 0
            h2 Publications
            PublicationTable(publications=publications, trashButtonHandler=trashButtonHandler)
  `
}
