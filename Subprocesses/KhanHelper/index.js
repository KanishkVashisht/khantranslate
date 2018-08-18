const fetch = require("node-fetch")

const KhanEndpoint =  "http://www.khanacademy.org/api/v1"
const KhanNode = "/videos/"


getKhanInfo = (videoId) =>{
  return new Promise((resolve, reject) => {
    let finalUrl = KhanEndpoint+KhanNode+videoId;
    fetch(finalUrl)
    .then(result => result.json())
    .then(result => {
      let finalInfo = {};
      finalInfo['videoDownloadUrl'] = result.download_urls.mp4;
      finalInfo['khanUrl'] = result.ka_url;
      finalInfo['status'] = 'success'
      resolve(finalInfo)
      })
    .catch(error =>{
      let finalInfo = {};
      finalInfo['status'] = 'error'
      finalInfo['originated'] = 'khanAPI'
      reject(finalInfo)
    })
  });
}

module.exports = {
  getKhanInfo
}
