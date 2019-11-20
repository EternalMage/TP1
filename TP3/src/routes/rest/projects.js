const express = require('express')
const async = require('async')

module.exports = (serviceProjects, servicePublication) => {
    const router = express.Router()

    // À COMPLÉTER
    router.get('/', (req, res, next) => {
        let language = req.app.locals.lang;
        serviceProjects.getProjects(language)((err, projects) => {
            if (err) {
                if (req.app.locals.t === undefined || req.app.locals.t['ERRORS'] === undefined || req.app.locals.t['ERRORS']['PROJECTS_ERROR'] === undefined) {
                    res.status(500).json({
                        'errors': [err.message]
                    });
                } else {
                    res.status(500).json({
                        'errors': [req.app.locals.t['ERRORS']['PROJECTS_ERROR']]
                    });
                }
            } else {
                res.status(200).json(projects);
            }
        })
    });

    router.get('/:id', (req, res, next) => {
        const language = req.app.locals.lang;
        const id = req.params.id; // GET sample/:id => use req.params.id
        const translationObj = req.app.locals.t;

        serviceProjects.getProjectById(translationObj)(language)(id)((err, projects) => {
            if (err) {
                //console.log(err)
                if (err.name === 'NOT_FOUND') {
                    if (req.app.locals.t === undefined || req.app.locals.t['ERRORS'] === undefined || req.app.locals.t['ERRORS']['PROJECT_NOT_FOUND'] === undefined) {
                        res.status(404).json({
                            'errors': [err.message]
                        });
                    } else {
                        res.status(404).json({
                            'errors': [req.app.locals.t['ERRORS']['PROJECT_NOT_FOUND'] + id]
                        });
                    }
                } else {
                    if (req.app.locals.t === undefined || req.app.locals.t['ERRORS'] === undefined || req.app.locals.t['ERRORS']['PROJECT_ERROR'] === undefined) {
                        res.status(500).json({
                            'errors': [err.message]
                        });
                    } else {
                        res.status(500).json({
                            'errors': [req.app.locals.t['ERRORS']['PROJECT_ERROR']]
                        });
                    }
                }
            } else {
                console.log("===> publications : " + JSON.stringify(projects.publications))
                res.status(200).json({
                    "project": projects.projects !== undefined ? projects.projects : {publications: []},
                    "publications": projects.publications
                });
            }
        })
    });

    return router
}