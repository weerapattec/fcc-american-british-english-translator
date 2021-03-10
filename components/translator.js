const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    //return JSON with text: org. text and translation: string with <span class=\"highlight\">word</span> around translated word
    // with translation: "Everything looks good to me!" if no translation happens
    tranlate(text, locale) {
        try {
            let translation = text;
            if (locale == 'american-to-british') {
                for (const key in americanOnly) {
                    //console.log(new RegExp(`${key}`, 'gi'));
                    translation = translation.replace(new RegExp(`${key}`, 'gi'), `<span class=\"highlight\">${americanOnly[key]}</span>`)
                }
                for (const key in americanToBritishSpelling) {
                    //console.log(new RegExp(`${key}`, 'gi'));
                    translation = translation.replace(new RegExp(`${key}`, 'gi'), `<span class=\"highlight\">${americanToBritishSpelling[key]}</span>`)
                }
                for (const key in americanToBritishTitles) {
                    //console.log(new RegExp(`${key}`, 'gi'));
                    translation = translation.replace(new RegExp(`${key}`, 'gi'), `<span class=\"highlight\">${americanToBritishTitles[key]}</span>`)
                }
                // for (element in translation.match(/\d{1,2}:\d{1,2}/gi)) {
                //     translation = translation.replace(element, element.replace(':', '.'));
                // }
                translation.match(/\d{1,2}:\d{1,2}/gi).forEach(element => {
                    translation = translation.replace(element, `<span class=\"highlight\">${element}</span>`).replace(element, element.replace(':', '.'));
                });
                //translation =translation.replace(/\d{1,2}:\d{1,2}/gi,translation.match(/\d{1,2}:\d{1,2}/gi))

            } else {
                for (const key in britishOnly) {
                    translation = translation.replace(new RegExp(`${key}`, 'gi'), `<span class=\"highlight\">${britishOnly[key]}</span>`)
                }
                translation.match(/\d{1,2}.\d{1,2}/gi).forEach(element => {
                    translation = translation.replace(element, `<span class=\"highlight\">${element}</span>`).replace(element, element.replace('.', ':'));
                });
            }
            // console.log(translation);
            // console.log(translation.replace(new RegExp('condo', 'gi'), `<span class=\"highlight\">flat</span>`))
            translation = translation.replace(translation.charAt(0), translation.charAt(0).toUpperCase())
            return text == translation
                ? {
                    text: text,
                    translation: 'Everything looks good to me!'
                }
                : {
                    text: text,
                    translation: translation
                }


        } catch (err) {
            throw err;
        }
    }
}

module.exports = Translator;