const express = require('express')
const router = express.Router()
const moment = require('moment')
const request = require("request");

const url = "http://localhost:3000/api/publications";

// À COMPLÉTER
router.get('/', (req, res, next) => {
    request.get(url, (error, response, body) => {
        if (error) {
            throw error
        } else {
            let publications = JSON.parse(body);
            console.log(publications)
            /*res.render('./../views/team', {
                members: members
            }, (err, html) => {
                if (err) {
                    throw err;
                } else {
                    res.send(html);
                }
            });*/
        }
    });
});

module.exports = router
