const express = require('express')
const router = express.Router()
const request = require("request");

// À COMPLÉTER
const url = "http://localhost:3000/api/members";

router.get('/', (req, res, next) => {
    request.get(url, (error, response, body) => {
        if (error) {
            throw error
        } else {
            let members = JSON.parse(body);
            res.render('./../views/team', {
                members: members
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