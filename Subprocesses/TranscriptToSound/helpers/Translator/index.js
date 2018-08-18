let {individual_translator} = require('./individual_translator.js');

const translate = (utterances, lang) =>{
  return new Promise((resolve, reject) => {

    let language_code = lang.code;
    let translation_promises = [];

    utterances.forEach(utterance =>{
        translation_promises.push(individual_translator(utterance, language_code));
    });

    Promise.all(translation_promises)
    .then(result=>resolve(result))
    .catch(error =>{
      let finalOutput = {};
      finalOutput['error'] = error;
      finalOutput['originated'] = "Translator";
      reject(finalOutput);
    });

  });
}

module.exports = {
  translate
}
