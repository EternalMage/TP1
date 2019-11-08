const express = require('express')
const router = express.Router()
const moment = require('moment')
const request = require("request");



// À COMPLÉTER
router.get('/', (req, res, next) => {
    const limit = req.query.limit ? req.query.limit : 10
    const page = req.query.page ? req.query.page : 1
    const sort_by = req.query.sort_by ? req.query.sort_by : 'date'
    const order_by = req.query.order_by ? req.query.order_by : 'desc'
    const url = "http://localhost:3000/api/publications?order_by=" + order_by + "&sort_by=" + sort_by + "&limit=" + limit + "&page=" + page
    request.get(url, (error, response, body) => {
        if (error) {
            throw error
        } else {
            let publications = JSON.parse(body)
            res.render('./../views/publication', {
                publications: publications,
                pubFormErrors: [],
                monthNames: [],
                pagingOptions: {
                    limit: limit,
                    sortBy: sort_by,
                    orderBy: order_by,
                    pageNumber: page
                }
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