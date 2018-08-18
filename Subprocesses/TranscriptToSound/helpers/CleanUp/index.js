const {exec} = require('child_process')

const cleanUp = async (uid, final) => {
  return new Promise((resolve, reject) => {
    let command = "rm -rf translation_audio/"+uid;
    exec(command, (error, stdout, stderr) => {
        if (error) reject(error);
        console.log("Stdout "+stdout);
        resolve(final);
    });
  })
};

module.exports = {
  cleanUp
};
