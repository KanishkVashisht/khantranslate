const extractUtterances = (transcript) => {
  return new Promise((resolve,reject)=>{
      let current_utterance = 0;
      let refined_utterances =[];
      for(let sentence in transcript){
          const current_sentence = transcript[sentence];
          if(refined_utterances[current_utterance]){
            refined_utterances[current_utterance] += " " + current_sentence.slice(4);
          } else {
            refined_utterances[current_utterance] = " " + current_sentence;
          }
          if(current_sentence.endsWith(".") ||
            current_sentence.endsWith(",")){
              current_utterance += 1;
            }
      }
    resolve(refined_utterances);
  })
}

module.exports = {
  extractUtterances
}
