const formatUtterances = (refined_utterances) =>{
  return new Promise((resolve, reject) => {
      let referential_utterances =[];
      for(let index in refined_utterances){
          const current_utterance ={};
          const refined_utterance = refined_utterances[index];
          current_utterance["start_time"] = refined_utterance.slice(1,5).replace(":","_");
          current_utterance["utterance"] = refined_utterance.slice(5);
          if(refined_utterances[parseInt(index)+1]){
            current_utterance["end_time"] = refined_utterances[parseInt(index)+1].slice(1,5).replace(":","_");
          } else {
            current_utterance["end_time"] = "-1";
          }
          referential_utterances.push(current_utterance);
      }
      resolve(referential_utterances)
  });
}

module.exports ={
  formatUtterances
}
