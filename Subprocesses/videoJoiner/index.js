const {exec} = require("child_process");

videoJoiner = (audioVideoDetails, uid, lang,root) => {
  return new Promise((resolve, reject)=>{
    let {video_location, audio_location} = {...audioVideoDetails}
    let output_file = root+"/final_video/"+uid +"-"+lang.name+"-"+lang.code+"-"+lang.SSMLGender+'-output.mp4';
    let command = "ffmpeg -i "+video_location+" -i "+audio_location+" -map 0:v:0 -map 1:a:0 -y "+output_file
    exec(command, (err,stdout,stderr)=>{
      if(err) reject(err)
      resolve({...audioVideoDetails, "final_location":output_file});
    })
  });
}

module.exports = {
  videoJoiner
}
