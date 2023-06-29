const request = require('supertest');
const app = require('../../app');
// test db? 
// leaves db open ...

describe("User's routes", () => {
	describe('POST /api/users/signup', () => {
		it('fails if invalid email or short password are passed', done => {
			request(app)
				.post('/api/users/signup')
				.send({ email: 'not_an_email', password: '1234' })
				.expect(422, done);
		})
		it('fails if email is already in use', done => {
			request(app)
				.post('/api/users/signup')
				.send({ email: 'test@test.com', password: '12345678' })
				.expect(422, done);
		})
	})
});

describe("Hero's routes", () => {
	describe('createHero: POST /api/heroes', () => {
		it('fails if no name is passed', done => {
			request(app)
				.post('/api/heroes')
				.send({ name: '', description: 'test' })
				.expect(422, done);
		})
		it('fails if no description is passed', done => {
			request(app)
				.post('/api/heroes')
				.send({ name: 'test', description: '' })
				.expect(422, done);
		});
		it('successfully creates a hero', done => {
			request(app)
				.post('/api/heroes')
				.send({
					"id": "testId",
					"creator": "Paul",
					"name": "Test Hero",
					"archetype": "monk",
					"image": "urlForMonk",
					"attributes": {
						"stealth": 0,
						"wisdom": 10,
						"intelligence": 5,
						"magic": 0,
						"strength": 5,
						"charm": 2,
						"stamina": 5,
						"luck": 10,
						"hitPoints": 16
					},
					"description": "test",
					"selected": false,
					"treasures": []
				})
				.expect(201, done);
		});
	});

	describe('getHeroes: GET /api/heroes', () => {
		it('returns all heroes', done => {
			request(app)
				.get('/api/heroes')
				.expect(200, done);
		})
	});

	describe('getHeroById: GET /api/heroes/:hid', () => {
		it('returns hero with id 640cbdb55d86755d20d4b33b', done => {
			request(app)
				.get('/api/heroes/640cbdb55d86755d20d4b33b')
				.expect(200, done);
		})
		it('returns 500 if hero is not found', done => {
			request(app)
				.get('/api/heroes/1000')
				.expect(500, done);
		})
	});

	describe('updateHero: PATCH /api/heroes/:hid', () => {
		const heroId = '640cbdb55d86755d20d4b33b';
		it('changes the name of the hero', done => {
			request(app)
				.patch(`/api/heroes/${heroId}`)
				.send({ name: 'new name' })
				.expect(200, done);
		})
	});

	describe('deleteHero: DELETE /api/heroes/:hid', () => {
		it('deletes the hero', done => {
			request(app)
				.delete('/api/heroes/640cbdb55d86755d20d4b33b')
				.expect(200, done);
		});
	});

});