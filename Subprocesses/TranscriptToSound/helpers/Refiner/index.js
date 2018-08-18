let {extractUtterances} = require('./extractUtterances.js');
let {formatUtterances} = require('./formatUtterances.js');

const refine_transcript = (transcript) => {
  return new Promise((resolve, reject) => {
      extractUtterances(transcript)
      .then(result => formatUtterances(result))
      .then(result => resolve(result))
      .catch(error =>{
        let finalOutput = {};
        finalOutput['error'] = error;
        finalOutput['originated'] = "Refiner";
        reject(finalOutput);
      });
  });
}

module.exports ={
  refine_transcript
}
