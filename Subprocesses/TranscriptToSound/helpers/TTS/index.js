const fs = require('fs');
const {synthesize} = require('./synthesize.js');

const textToSpeech = (uid, transcript, language) => {
  return new Promise((resolve, reject) => {
      let base_request = {};
      let synthesisPromises =[];

      base_request['audioConfig']  = {audioEncoding: 'MP3'};
      base_request['voice'] = {
        languageCode : language.voice_code,
        ssmlGender : language.SSMLGender
      }

      fs.mkdir(__dirname+"/translation_audio/", err =>{
          if(err) console.log("default dir exists "+err);
        });

      fs.mkdir(__dirname+"/translation_audio/"+uid, err =>{
          if(err) console.log("UID Clashed, file already exists "+err);
        });

        transcript = transcript.sort((a,b)=>{
          a.start_time.localeCompare(b.start_time)
        })

        transcript.forEach(utterance => {
          synthesisPromises.push(
             synthesize(base_request, utterance, uid)
          );
        });

      Promise.all(synthesisPromises)
      .then(success => resolve(success))
      .catch(error =>{
        let finalOutput = {};
        finalOutput['error'] = error;
        finalOutput['originated'] = "TTS";
        reject(finalOutput);
      });
  });
}

module.exports = {
  textToSpeech
}
