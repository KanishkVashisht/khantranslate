const fetch = require('node-fetch');
const fs = require('fs');

videoDownloader = (videoId, videoUrl) => {
  return new Promise((resolve, reject) => {
    let final_file_location = __dirname+"/downloaded_video/"+videoId+".mp4";
    let file = fs.createWriteStream(final_file_location);
    fetch(videoUrl)
    .then(res =>{
      res.body.pipe(file)
      res.body.on("error", err => {throw err})
      res.body.on("finish", () =>{return})
    })
    .then(()=>{
      let finalInfo = {};
      finalInfo['video_location'] = final_file_location
      finalInfo['status'] = 'success'
      resolve(finalInfo)
    })
    .catch(err => {
        let finalInfo = {};
        finalInfo['status'] = 'error'
        finalInfo['originated'] = 'videoDownloader'
        finalInfo['err'] = err
        reject(finalInfo)
    })
  });
}

module.exports = {
  videoDownloader
}
