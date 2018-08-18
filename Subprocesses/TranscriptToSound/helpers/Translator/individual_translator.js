const {googleTranslateInstance: translator} = require('./config.js');

const individual_translator = (utterance, language) => {
  return new Promise((resolve, reject) => {
    translator
    .translate(utterance.utterance, language)
    .then(result =>{
       resolve({...utterance,"translated_utterance":result[0]});
    })
    .catch(error => console.log(error));
  });
}

module.exports = {
  individual_translator
}
