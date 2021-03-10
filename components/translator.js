const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    //return JSON with text: org. text and translation: string with <span class=\"highlight\">word</span> around translated word
    // with translation: "Everything looks good to me!" if no translation happens
    translate(text, locale) {
        try {
            let translation = text;
            if (locale == 'american-to-british') {
                for (const key in americanOnly) {
                    translation = translation.replace(new RegExp(`(?<![A-Za-z-])${key}(?![A-Za-z-])`, 'gi'), `<span class=\"highlight\">${americanOnly[key]}</span>`)
                }
                for (const key in americanToBritishSpelling) {
                    translation = translation.replace(new RegExp(`(?<![A-Za-z-])${key}(?![A-Za-z-])`, 'gi'), `<span class=\"highlight\">${americanToBritishSpelling[key]}</span>`)
                }
                for (const key in americanToBritishTitles) {
                    translation = translation.replace(new RegExp(`(?<![A-Za-z-])${key}(?![A-Za-z-])`, 'gi'), `<span class=\"highlight\">${americanToBritishTitles[key].replace(americanToBritishTitles[key].charAt(0), americanToBritishTitles[key].charAt(0).toUpperCase())}</span>`)
                }
                if (translation.match(/\d{1,2}:\d{1,2}/gi) != null) {
                    translation.match(/\d{1,2}:\d{1,2}/gi).forEach(element => {
                        translation = translation.replace(element, `<span class=\"highlight\">${element}</span>`).replace(element, element.replace(':', '.'));
                    });
                }
            } else {
                for (const key in britishOnly) {
                    translation = translation.replace(new RegExp(`(?<![A-Za-z-])${key}(?![A-Za-z-])`, 'gi'), `<span class=\"highlight\">${britishOnly[key]}</span>`)
                }
                for (const key in americanToBritishSpelling) {
                    translation = translation.replace(new RegExp(`(?<![A-Za-z-])${americanToBritishSpelling[key]}(?![A-Za-z-])`, 'gi'), `<span class=\"highlight\">${key}</span>`)
                }
                for (const key in americanToBritishTitles) {
                    translation = translation.replace(new RegExp(`(?<![A-Za-z-])${americanToBritishTitles[key]}(?![A-Za-z-])`, 'gi'), `<span class=\"highlight\">${key.replace(key.charAt(0), key.charAt(0).toUpperCase())}</span>`)
                }
                if (translation.match(/\d{1,2}.\d{1,2}/gi) != null) {
                    translation.match(/\d{1,2}.\d{1,2}/gi).forEach(element => {
                        translation = translation.replace(element, `<span class=\"highlight\">${element}</span>`).replace(element, element.replace('.', ':'));
                    });
                }
            }
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