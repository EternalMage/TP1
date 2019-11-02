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
        ["sort", sort_by],
        ["order", order_by]
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
      }
      else {
        res.status(200).json(publications);
      }
    })
  });

  return router
}