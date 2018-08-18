const GoogleTranslate= require('@google-cloud/translate');
const projectId = "khantranslation-1531752286481"
const googleTranslateInstance = new GoogleTranslate({
  projectId
});

module.exports = {
  googleTranslateInstance
}
