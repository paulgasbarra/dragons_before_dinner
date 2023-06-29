const chai = require('chai');
const expect = chai.expect;
const HttpError = require('../../models/http-error.js');

describe('HttpError', () => {
  describe('constructor', () => {
    it('should set the provided message and errorCode', () => {
      const message = 'Not Found';
      const errorCode = 404;
      const httpError = new HttpError(message, errorCode);
      expect(httpError.message).to.equal(message);
      expect(httpError.code).to.equal(errorCode);
    });

    it('should inherit from Error', () => {
      const httpError = new HttpError('Bad Request', 400);
      expect(httpError instanceof Error).to.equal(true);
    });
  });
});