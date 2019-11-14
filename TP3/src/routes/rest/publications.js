const express = require('express')
const async = require('async')

module.exports = servicePublication => {
    const router = express.Router()

    // À COMPLÉTER
    router.get('/', (req, res, next) => {
        // url params verification, if true, set variables to given value, else, set to default value
        // GET /something?color1=red&color2=blue => use req.query.color1
        // GET sample/:id => use req.params.id
        const limit = req.query.limit ? req.query.limit : 10;
        const page = req.query.page ? req.query.page : 1;
        const sort_by = req.query.sort_by ? req.query.sort_by : 'date';
        const order_by = req.query.order_by ? req.query.order_by : 'desc';
        // create pagingOpts
        const pagingOpts = {
            limit: limit,
            sorting: [
                [
                    sort_by,
                    order_by
                ]
            ],
            pageNumber: page
        }

        servicePublication.getPublications(pagingOpts)((err, publications) => {
            if (err) {
                if (req.app.locals.t === undefined || req.app.locals.t['ERRORS'] === undefined || req.app.locals.t['ERRORS']['PUBS_ERROR'] === undefined) {
                    res.status(500).json({
                        'errors': [err.message]
                    });
                } else {
                    res.status(500).json({
                        'errors': [req.app.locals.t['ERRORS']['PUBS_ERROR']]
                    });
                }
            } else {
                res.status(200).json({
                    "count": publications.length,
                    publications
                });
            }
        })
    });

    router.post('/', (req, res, next) => {
        console.log(req.body.year)
        console.log("===> Requesting Publication Creation..." + req.body)
            // Publication body rules
        const TITLE_CHAR_MIN = 5;
        const MONTH_MIN = 0;
        const MONTH_MAX = 11;
        const VENUE_CHAR_MIN = 5;
        const ERRORS = [];

        const pushError = (errorType) => {
            if (req.app.locals.t === undefined || req.app.locals.t['ERRORS'] === undefined || req.app.locals.t['ERRORS'][errorType] === undefined) {
                ERRORS.push(err.message)
            } else {
                ERRORS.push(req.app.locals.t['ERRORS'][errorType])
            }
        }

        // Check if body is empty
        if (Object.keys(req.body).length === 0) {
            pushError('PUB_CREATE_ERROR')
        }

        // Check if authors empty
        if (req.body.authors === undefined || req.body.authors.length === 0) {
            pushError('AUTHOR_EMPTY_FORM');
        }

        // Check is year is >=0
        if (req.body.year < 0 || req.body.year === undefined || isNaN(Number(req.body.year))) {
            pushError('YEAR_NOT_INT_FORM');
        }

        // Check if MONTH_MIN =< month =< MONTH_MAX
        if (req.body.month < MONTH_MIN || req.body.month > MONTH_MAX || req.body.month === undefined || isNaN(Number(req.body.month))) {
            pushError('MONTH_ERROR_FORM');
        }

        // Check if title.length >= 5
        //console.log("===> Title ? : " + req.body.title)
        if (req.body.title === undefined || req.body.title.length < TITLE_CHAR_MIN) {
            pushError('PUB_AT_LEAST_5_CHAR_FORM');
        }

        if (req.body.venue === undefined || req.body.venue.length < VENUE_CHAR_MIN ) {
            pushError('VENUE_AT_LEAST_5_CHAR_FORM');
        }

        if (ERRORS.length > 0) {
            res.status(400).json({
                'errors': ERRORS
            });
        } else {

            const publicationBody = {
                title: req.body.title,
                year: req.body.year,
                month: req.body.month,
                authors: req.body.authors,
                venue: req.body.venue
            };
            console.log("===> Creating Publication..." + JSON.stringify(publicationBody))
            servicePublication.createPublication(publicationBody)((err, result) => {
                if (err) {
                    if (req.app.locals.t === undefined || req.app.locals.t['ERRORS'] === undefined || req.app.locals.t['ERRORS']['PUB_CREATE_ERROR'] === undefined) {
                        res.status(500).json({
                            'errors': [err.message]
                        });
                    } else {
                        res.status(500).json({
                            'errors': [req.app.locals.t['ERRORS']['PUB_CREATE_ERROR']]
                        });
                    }
                } else {
                    res.status(201).json(result);
                }
            })
        }
    });

    router.delete('/:id', (req, res, next) => {
        servicePublication.removePublication(req.params.id)((err, result) => {
            if (err) {
                if (err.name === 'NOT_FOUND') {
                    if (req.app.locals.t === undefined || req.app.locals.t['ERRORS'] === undefined || req.app.locals.t['ERRORS']['PUB_NOT_FOUND_ERROR'] === undefined) {
                        res.status(404).json({
                            'errors': [err.message]
                        });
                    } else {
                        res.status(500).json({
                            'errors': [req.app.locals.t['ERRORS']['PUB_NOT_FOUND_ERROR']]
                        });
                    }
                } else {
                    if (req.app.locals.t === undefined || req.app.locals.t['ERRORS'] === undefined || req.app.locals.t['ERRORS']['PUB_DELETE_ERROR'] === undefined) {
                        res.status(404).json({
                            'errors': [err.message]
                        });
                    } else {
                        res.status(500).json({
                            'errors': [req.app.locals.t['ERRORS']['PUB_DELETE_ERROR']]
                        });
                    }
                }
            } else {
                res.status(200).send('done');
            }
        });
    });

    return router
}

// Body below to test with Postman
/*{
  "_id": 1,
  "year": 2019,
  "month": 11,
  "title": "Titre de la publication",
  "authors": ["Author1", "Author2"],
  "venue": "Nom de la conférence"
}*/