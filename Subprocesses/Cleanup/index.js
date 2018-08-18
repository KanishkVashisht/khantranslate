const {exec} = require('child_process');

cleanUp = (data) => {
  return new Promise((resolve, reject) => {
    console.log(data)
    let {video_location, final_location, captions_location} = {...data}
    let command = "rm -rf "+video_location+" "+final_location+" "+captions_location;
    console.log(command)
    exec(command, err =>{
      if(err) reject(err)
      resolve()
    })
  });
}

module.exports ={
  cleanUp
}
