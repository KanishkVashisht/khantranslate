let {languages} = require('./language_dictionary.js');
let {refine_transcript, translate, textToSpeech, stitcher, transcriptor, cleanup} = require('./helpers');

transcript_to_sound = (uid, link, given_language) =>{
  return new Promise((resolve,reject) =>{
      transcriptor(link)
      .then(transcript =>refine_transcript(transcript))
      .then(success => translate(success, given_language))
      .then(translated => textToSpeech(uid, translated, given_language))
      .then(results => stitcher(__dirname, results,uid, given_language))
      .then(output => {
            let finalOutput = {};
            finalOutput['status']="success";
            finalOutput['final_location']=output.output_location;
            finalOutput['final_captions']=output.transcript.map(line => {
              return{
                "timestamp":line.start_time,
                "caption":line.translated_utterance
              }
            })
            return finalOutput;
      })
      .then(success =>  resolve(success))
      .catch(error => {
        let finalOutput = {};
        finalOutput['status'] = "failure";
        finalOutput['error'] = error.error;
        finalOutput['originated'] = error.originated;
        reject(finalOutput);
      });
    });
}

module.exports = {
  transcript_to_sound,
  languages
}
