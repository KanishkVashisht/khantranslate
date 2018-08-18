const { exec } = require('child_process');
const fs = require('fs');


const stitcher = async (root, utterances, uid, lang) => {
  return new Promise((resolve, reject) => {
        try{
            let input = '';
            utterances.sort((a, b) => a.start_time.localeCompare(b.start_time));
            utterances.forEach(ut => {
              input += ut.translated_file + '|';
            });
            let output = root+"/finished_audio/"+uid +"-"+lang.name+"-"+lang.code+"-"+lang.SSMLGender+'-output.mp3';
            const command = `ffmpeg -i \"concat:${input}\" -acodec copy -y ${output}`;
            exec(command, (error, stdout, stderr) => {
                if (error) throw error
                if(stdout) console.log("Stdout "+stdout);
                utterances.forEach(ut => {
                  let command_del = "rm -rf "+root+"/helpers/TTS/translation_audio/"+uid;
                  exec(command_del);
                })
                resolve({"output_location":output,"transcript":utterances});
            });
        }catch(error){
            let finalOutput = {};
            finalOutput['error'] = error;
            finalOutput['originated'] = "Consolidator";
        }
  })
};

module.exports = {
  stitcher
};
