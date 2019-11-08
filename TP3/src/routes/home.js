const express = require('express')
const router = express.Router()
const request = require("request")

const moment = require('moment')

// À COMPLÉTER
const url = "http://localhost:3000/api/feed";

router.get('/', (req, res, next) => {
    request.get(url, (error, response, body) => {
        if (error) {
            throw error
        } else {
            let feeds = JSON.parse(body);
            res.render('./../views/index', {
                feeds: feeds
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