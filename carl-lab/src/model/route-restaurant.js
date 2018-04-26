'use strict';

const logger = require('../lib/logger');
const Restaurant = require('../model/restaurant');
const storage = require('../lib/storage');

module.exports = function routeRestaurant(router) {
  router.post('/api/v1/restaurant', (req, res) => {
    logger.log(logger.INFO, 'RESTAURANT ROUTE: POST /api/v1/restaurant');

    try {
      const newRestaurant = new Restaurant(req.body.name, req.body.cuisine, req.body.location);
      // Promise initiated here with storage.create
      storage.create('Restaurant', newRestaurant)
        .then((restaurant) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(restaurant));
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `ROUTE-RESTAURANT: There was a bad request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad request - 1 - route-restaurant POST');
      res.end();
      return undefined;
    }
    return undefined;
  });

  router.get('/api/v1/restaurant', (req, res) => {
    if (!req.url.query.id) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Your request requires an id');
      res.end();
      return undefined;
    }

    storage.fetchOne('Restaurant', req.url.query.id)
      .then((item) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(item));
        res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Resource not found');
        res.end();
        return undefined;
      });
    return undefined;  
  });
};
