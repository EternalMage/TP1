const express = require('express')
const router = express.Router()
const request = require("request");

// À COMPLÉTER
const url = "http://localhost:3000/api/projects";

router.get('/', (req, res, next) => {
    request.get(url, (error, response, body) => {
        if (error) {
            throw error
        } else {
            let projects = JSON.parse(body);
            res.render('./../views/projects', {
                projects: projects
            }, (err, html) => {
                if (err) {
                    throw err;
                } else {
                    res.send(html);
                }
            });
        }
    });
});

router.get('/:id', (req, res, next) => {
    request.get(url + '/' + req.params.id, (error, response, body) => {
        if (error) {
            throw error
        } else {
            let project = JSON.parse(body);
            console.log("===> RETURN project " + JSON.stringify(project))
            let projectPublications = project.publications
            res.render('./../views/project', {
                project: project.project,
                publications: projectPublications
            }, (err, html) => {
                if (err) {
                    throw err;
                } else {
                    res.send(html);
                }
            });
        }
    });
});

module.exports = router