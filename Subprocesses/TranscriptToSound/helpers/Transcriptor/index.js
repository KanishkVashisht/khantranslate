let Nightmare = require('nightmare');
let cheerio = require('cheerio');

const transcriptor = (url) => {
  return new Promise((resolve,reject) => {
        Nightmare({show:false})
        .goto(url)
        .wait(2000)
        .click(".notAButton_93q6lh-o_O-tabTrigger_gm5rvm-o_O-inactiveTab_175b36o")
        .evaluate(()=>{
          let transcript = document.querySelector("[itemprop=transcript]").innerHTML;
          return transcript;
        })
        .end()
        .then(page=>{
          let transcript = [];
          const $ = cheerio.load(page);
          let index = 0;
          $("button.notAButton_77ey09-o_O-segmentButton_1thed4q").each((i,elem)=>{
            let currentString ="";
            if(i === 0){
              currentString = elem.children[1].children[0].data + " " +elem.children[2].children[0].data
              transcript.push(currentString);
              index=1;
            } else {
            currentString = elem.children[0].children[0].data + " " +elem.children[1].children[0].data
            transcript.push(currentString);
          }
          })
          return transcript;
        })
        .then(transcript => resolve(transcript))
        .catch(error => reject("error : "+error));
    });
}

module.exports = {
  transcriptor
}
