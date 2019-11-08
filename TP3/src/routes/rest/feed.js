const express = require('express')

module.exports = serviceFeed => {
    const router = express.Router()

    // À COMPLÉTER
    router.get('/', (req, res, next) => {
        const language = req.app.locals.lang
        const date = new Date()
        serviceFeed.getFeeds(date)(language)((err, news) => {
            if (err) {
                if (req.app.locals.t === undefined || req.app.locals.t['ERRORS'] === undefined || req.app.locals.t['ERRORS']['FEEDS_ERRORS'] === undefined) {
                    res.status(500).json({
                        'errors': [err.message]
                    });
                } else {
                    res.status(500).json({
                        'errors': [req.app.locals.t['ERRORS']['FEEDS_ERRORS']]
                    });
                }
            } else {
                res.status(200).json(news);
            }
        });
    });

    return router
}