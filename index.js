let {transcript_to_sound, languages, exists, getKhanInfo, videoDownloader, resizer, videoJoiner, makeCaptions, uploadData, cleanUp} = require('./Subprocesses');

handler = (videoId, languageTarget) => {
  return new Promise((resolve,reject)=>{
      exists(videoId, languageTarget)
      .then(response=>{
          if(response.exists){
            resolve(response);
          }
          else{
            return makeNewVideo(videoId, languageTarget)
          }
        })
      .then(response => resolve(response))
      .then(error => reject(error))
    });
}

makeNewVideo = (videoId, languageTarget) => {
  return new Promise((resolve,reject)=>{
    let collatedData = {};
    getKhanInfo(videoId)
      .then(info => {
        let audioVideoPromises = [];
        audioVideoPromises.push(transcript_to_sound(videoId,info.khanUrl, languageTarget));
        audioVideoPromises.push(videoDownloader(videoId,info.videoDownloadUrl));
        return audioVideoPromises;
      })
      .then(promises => Promise.all(promises))
      .then(completedPromises =>{
        collatedData['audio_location'] = completedPromises[0].final_location;
        collatedData['captions'] = completedPromises[0].final_captions;
        collatedData['video_location']=completedPromises[1].video_location;
        return collatedData
      })
      .then(collatedData => resizer(collatedData))
      .then(resizedData => videoJoiner(resizedData, videoId, languageTarget, __dirname))
      .then(joinedData => makeCaptions(joinedData, videoId, languageTarget, __dirname))
      .then(data => {collatedData = data; return data;})
      .then(captionedData => uploadData(videoId, languageTarget, captionedData))
      .then((uploadedData)=>{cleanUp(collatedData); return uploadedData})
      .then(uploadedData => resolve(uploadedData))
      .catch(error => reject(error))
  })
}

handler("adding-subtracting-negative-numbers",languages[9])
.then(success => console.log(success))
.catch(err => console.log("Err "+err));
