const Storage = require('@google-cloud/storage');
const storage_client = new Storage()
const bucketName = "khantranslatedvideos";
const baseStorageURL = "http://storage.googleapis.com/"

module.exports.uploadData = (videoId, lang, data) => {
  return new Promise((resolve,reject)=>{
    let {final_location, captions_location} = {...data}
    promises = [];
    promises[0] = uploadFile(final_location);
    promises[1] = uploadFile(captions_location);
    Promise.all(promises)
    .then(success => resolve(this.exists(videoId, lang)))
    .then(failure => reject(failure))
  })
}

uploadFile = (file) => storage_client.bucket(bucketName).upload(file)


module.exports.exists = (videoId, lang) => {
  return new Promise((resolve,reject)=>{
    let videoFileName = videoId +"-"+lang.name+"-"+lang.code+"-"+lang.SSMLGender+'-output.mp4';
    let captionsFileName = videoId +"-"+lang.name+"-"+lang.code+"-"+lang.SSMLGender+'-captions.vtt';
    console.log("checking for video "+videoFileName)
    storage_client
    .bucket(bucketName)
    .file(videoFileName)
    .exists()
    .then(data => data[0])
    .then(vari => { console.log(vari); return vari})
    .then(exists_value =>{
          let final_output = {}
          if(exists_value){
            let url = baseStorageURL +"/"+bucketName+"/"+ videoFileName;
            let captions =  baseStorageURL +"/"+bucketName+"/"+captionsFileName;
            final_output = {"exists":true,"status":"success","video_url":url, "captions_url":captions}
          } else {
            final_output = {"exists":false,"status":"success"}
          }
          resolve(final_output)
    })
    .catch(err => {
      let final_output = {};
      final_output['status']='failure';
      final_output['error']=err;
      final_output['originated']="storage-exists"
      reject(final_output)
    })
  })
}
