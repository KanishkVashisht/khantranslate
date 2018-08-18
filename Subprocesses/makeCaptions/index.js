const Vtt = require('vtt-creator');
const fs = require('fs')

makeCaptions = (data, uid, lang, root) =>{
    return new Promise((resolve, reject)=>{
      let vtt = new Vtt();
      let {length, captions} = {...data};
      captions = captions.map(cap =>{
        let timestamp = cap.timestamp.split("_")
        start_time = parseInt(timestamp[0])*60+parseInt(timestamp[1])
        return{...cap, start_time:start_time}
      })
      modified_captions = [];
      for(let i = 0; i<captions.length-1;i++){
        modified_captions.push({...captions[i], end_time:captions[i+1].start_time});
      }
      modified_captions.push({...captions[captions.length-1],end_time:length})
      modified_captions.forEach(cap=>vtt.add(cap.start_time, cap.end_time, [cap.caption,'']))
      let output = root+"/final_video/"+uid +"-"+lang.name+"-"+lang.code+"-"+lang.SSMLGender+'-captions.vtt';
      let stream = fs.writeFile(output, vtt.toString(), err =>{
        if(err) reject(err)
        resolve({...data, captions_location:output})
      });


    });
}

module.exports = {
  makeCaptions
}
