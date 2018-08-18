const fs = require('fs')
const mp3Duration = require('mp3-duration');
const {exec} = require('child_process')

resizer = (audioVideoDetails) =>{
  return new Promise((resolve,reject) => {
      let audioLength, videoLength;
      let {video_location, audio_location} = {...audioVideoDetails}
      let resizePromises = [];
      resizePromises[0] = readVideoLength(video_location);
      resizePromises[1] = readAudioLength(audio_location);
      Promise.all(resizePromises)
      .then(results =>{
        audioLength = results[1];
        videoLength = results[0];
        return audioLength/videoLength;
      })
      .then(ratio => resizeAudio(ratio, audio_location))
      .then(status => resolve({...audioVideoDetails,"length":videoLength}))
      .catch(err => reject(err))
  })
}


resizeAudio = (ratio, audio_location) =>  {
  return new Promise((resolve,reject)=>{
      let command = "sox "+audio_location+" "+audio_location.slice(0,audio_location.length-4)+"-resized.mp3 "+" speed "+ratio;
      console.log(command);
      exec(command, (err, stdout, stderr)=>{
        if(err) reject(err)
        resolve({"status":"success"})
      })
  })
}

readAudioLength = (file) =>{
  return new Promise((resolve, reject) => {
    mp3Duration(file,(err,dur)=>{
      if(err) reject(err)
      resolve(dur)
    })
  });
}

readVideoLength = (file) =>{
  return new Promise((resolve,reject)=>{
    try{
      let buff = Buffer.alloc(100);
      fs.open(file, 'r', (err, fd)=>{
        fs.read(fd, buff, 0, 100, 0, (err, bytesRead, buffer) =>{
          let start = buffer.indexOf(Buffer.from('mvhd')) + 17;
          let timeScale = buffer.readUInt32BE(start, 4);
          let duration = buffer.readUInt32BE(start + 4, 4);
          let movieLength = Math.floor(duration/timeScale);
          resolve(movieLength)
        });
      });
    }catch(error){
      reject(error)
    }
  })
}




module.exports = {
  resizer
};
