const express = require('express')
const router = express.Router()
const moment = require('moment')
const request = require("request")
const base_url = "http://localhost:3000/api/publications"

const renderPubs = (res, body, limit, sort_by, order_by, page, next) => {
    const url = base_url + "?order_by=" + order_by + "&sort_by=" + sort_by + "&limit=" + limit + "&page=" + page
    request.get(url, (error, response, body) => {
        const errors = error === null ? [] : error
        if (error) {
            throw error
        } else {
            res.render('./../views/publication', {
                publications: JSON.parse(body).publications,
                pubFormErrors: errors,
                monthNames: [],
                pagingOptions: {
                    limit: limit,
                    sortBy: sort_by,
                    orderBy: order_by,
                    pageNumber: page
                }
            }, (err, html) => {
                if (err) {
                    next(err);
                } else {
                    res.send(html)
                }
            })
        }
    })
}


// À COMPLÉTER
router.post('/', (req, res, next) => {
    const limit = req.query.limit ? req.query.limit : 10
    const page = req.query.page ? req.query.page : 1
    const sort_by = req.query.sort_by ? req.query.sort_by : 'date'
    const order_by = req.query.order_by ? req.query.order_by : 'desc'
    console.log("SEND TO API -> " + req.body)
    console.log(JSON.stringify(req.body))
    request.post(base_url, {
        form: req.body
    }, (error, response, body) => {
        if (error) {
            next(error)
        } else {
            renderPubs(res, body, limit, sort_by, order_by, page, next)
        }
    })
})
router.delete('/', (req, res, next) => {
    const limit = req.query.limit ? req.query.limit : 10
    const page = req.query.page ? req.query.page : 1
    const sort_by = req.query.sort_by ? req.query.sort_by : 'date'
    const order_by = req.query.order_by ? req.query.order_by : 'desc'
    request.delete(base_url, (error, response, body) => {
        if (error) {
            next(error)
        } else {
            renderPubs(res, body, limit, sort_by, order_by, page, next)
        }
    })
})
router.get('/', (req, res, next) => {
    const limit = req.query.limit ? req.query.limit : 10
    const page = req.query.page ? req.query.page : 1
    const sort_by = req.query.sort_by ? req.query.sort_by : 'date'
    const order_by = req.query.order_by ? req.query.order_by : 'desc'
    const url = base_url + "?order_by=" + order_by + "&sort_by=" + sort_by + "&limit=" + limit + "&page=" + page
    request.get(url, (error, response, body) => {
        if (error) {
            next(error)
        } else {
            renderPubs(res, body, limit, sort_by, order_by, page, next)
        }
    })
})

module.exports = router