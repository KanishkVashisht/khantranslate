const TTSLib = require('@google-cloud/text-to-speech');
const TTSClient = new TTSLib.TextToSpeechClient();
const fs = require('fs');


const synthesize = (base_request, utterance, uid) => {
  return new Promise((resolve,reject)=>{
      const request = {
        input : { text : utterance.translated_utterance},
        ...base_request
      }
      const localFile = __dirname+"/translation_audio/"+uid + "/"+utterance.start_time+".mp3";
      const indexFile = __dirname+"/translation_audio/"+uid+"/index.txt";
      TTSClient.synthesizeSpeech(request, (err, response)=>{
                if(err){
                  console.log("Error occured " + err);
                  reject(err);
                }
              fs.appendFile(indexFile,"file \'"+utterance.start_time+".mp3\'\n",err=>{
                if(err){console.log("error occured appending to index "+err)}
              })
              fs.writeFile(localFile, response.audioContent, 'binary', err =>{
                if(err){console.log("Error occured "+ err); reject(err)}
                resolve({...utterance, "translated_file":localFile})
              })

    })
  });
}

module.exports = {
  synthesize
}
