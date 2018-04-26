'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = {
  name: 'Veraci', cuisine: 'Pizza', location: 'Ballard',
};
let mockId = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());


describe('VALID request to the API', () => {
  describe('POST /api/v1/restaurant', () => {
    it('Should respond with status 201 and create a new restaurant', () => {
      return superagent.post(`:${testPort}/api/v1/restaurant`)
        .send(mockResource)
        .then((res) => {
          console.log(res.body);
          mockId = res.body.id;
          expect(res.body.name).toEqual(mockResource.name);
          expect(res.body.cuisine).toEqual(mockResource.cuisine);
          expect(res.body.location).toEqual(mockResource.location);
          // expect(res.body.id).toEqual(mockResource.id);
          expect(res.status).toEqual(201);
        });
    });
  });
});
