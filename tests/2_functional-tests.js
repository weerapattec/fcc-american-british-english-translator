const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
const translator = new Translator();


suite('Functional Tests', () => {
    test('Translation with text and locale fields: POST request to /api/translate', (done) => {
        chai
            .request(server)
            .post("/api/translate")
            .send(
                {
                    text: 'I ate yogurt for breakfast.',
                    locale: 'american-to-british'
                }
            )
            .end(function (err, res) {
                assert.equal(res.statusCode, 200);
                assert.exists(res.body.text);
                assert.exists(res.body.translation);
                done();
            });
    })
    test('Translation with text and invalid locale field: POST request to /api/translate', (done) => {
        chai
            .request(server)
            .post("/api/translate")
            .send(
                {
                    text: 'I ate yogurt for breakfast.',
                    locale: 'american-to-britis'
                }
            )
            .end(function (err, res) {
                assert.equal(res.statusCode, 200);
                assert.exists(res.body.error);
                done();
            });
    })
    test('Translation with missing text field: POST request to /api/translate', (done) => {
        chai
            .request(server)
            .post("/api/translate")
            .send(
                {
                    locale: 'american-to-british'
                }
            )
            .end(function (err, res) {
                assert.equal(res.statusCode, 200);
                assert.exists(res.body.error);
                done();
            });
    })
    test('Translation with missing locale field: POST request to /api/translate', (done) => {
        chai
            .request(server)
            .post("/api/translate")
            .send(
                {
                    text: 'I ate yogurt for breakfast.'
                }
            )
            .end(function (err, res) {
                assert.equal(res.statusCode, 200);
                assert.exists(res.body.error);
                done();
            });
    })
    test('Translation with empty text: POST request to /api/translate', (done) => {
        chai
            .request(server)
            .post("/api/translate")
            .send(
                {
                    text: '',
                    locale: 'american-to-british'
                }
            )
            .end(function (err, res) {
                assert.equal(res.statusCode, 200);
                assert.exists(res.body.error);
                done();
            });
    })
    test('Translation with text that needs no translation: POST request to /api/translate', (done) => {
        chai
            .request(server)
            .post("/api/translate")
            .send(
                {
                    text: 'I\'ve just got bits and bobs in my bum bag.',
                    locale: 'american-to-british'
                }
            )
            .end(function (err, res) {
                assert.equal(res.statusCode, 200);
                assert.exists(res.body.translation);
                assert.equal(res.body.translation, 'Everything looks good to me!')
                done();
            });
    })
});
