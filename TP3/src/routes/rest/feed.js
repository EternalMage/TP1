const express = require('express')

module.exports = serviceFeed => {
  const router = express.Router()

  // À COMPLÉTER
  router.get('/', (req, res, next) => {
    const language = req.app.locals.lang;
    const query = { /*from: <DATE>, sort: { field: <string>, order: <ASC|DESC> }*/ }
		serviceFeed.getSeminars(query)(language)((err, seminars) => {
			if (err) {
				if (req.app.locals.t === undefined || req.app.locals.t['ERRORS'] === undefined || req.app.locals.t['ERRORS']['FEEDS_ERROR'] === undefined) {
					res.status(500).json({
						'errors': [err.message]
					});
				} else {
					res.status(500).json({
						'errors': [req.app.locals.t['ERRORS']['FEEDS_ERROR']]
					});
				}
			} else {
				res.status(200).json(seminars);
			}
		})
  });
  
  return router
}
