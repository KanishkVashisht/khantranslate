let {transcript_to_sound, languages} = require('./TranscriptToSound');
let {exists, uploadData} = require('./Storage');
let {getKhanInfo} = require('./KhanHelper');
let {videoDownloader} = require('./videoDownloader');
let {resizer} = require('./Resizer');
let {videoJoiner} = require('./videoJoiner');
let {makeCaptions} = require('./makeCaptions');
let {cleanUp} = require('./Cleanup')

module.exports = {
  transcript_to_sound,
  languages,
  exists,
  getKhanInfo,
  videoDownloader,
  resizer,
  videoJoiner,
  makeCaptions,
  uploadData,
  cleanUp
}
