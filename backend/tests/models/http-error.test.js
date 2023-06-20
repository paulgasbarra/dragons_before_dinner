const HttpError = require('./HttpError');

describe('HttpError', () => {
  describe('constructor', () => {
    it('should set the provided message and errorCode', () => {
      const message = 'Not Found';
      const errorCode = 404;
      const httpError = new HttpError(message, errorCode);
      expect(httpError.message).toBe(message);
      expect(httpError.code).toBe(errorCode);
    });

    it('should inherit from Error', () => {
      const httpError = new HttpError('Bad Request', 400);
      expect(httpError instanceof Error).toBe(true);
    });
  });
});