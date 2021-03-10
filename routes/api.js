'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const noTextError = { error: 'No text to translate' };
      const missingFieldError = { error: 'Required field(s) missing' };
      const invalidLocale = { error: 'Invalid value for locale field' };
      if (req.body.text == undefined && (req.body.locale == '' || req.body.locale == undefined)) {
        res.json(missingFieldError);
      } else if (req.body.text == '') {
        res.json(noTextError);
      } else if (req.body.locale != 'american-to-british' && req.body.locale != 'british-to-american') {
        res.json(invalidLocale);
      } else {
        const result = translator.tranlate(req.body.text, req.body.locale);
        res.json(result);
      }
    });
};
