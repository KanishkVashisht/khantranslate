# morpheus-translation
Transcript -> Well timed, spoken, translated audio in target language

Done :

  Language Dictionary - references etc

  Conversion Procedure
  Transcript -> Set of utterances
  Utterances -> Destination Language Text
  Destination Language Text ->  Destination Language Voice


To Do :
  Properly store destination language sounds
  Shorten audio clips to fit in time designation
  Sync them by start time and end time


Working Copy of merging two audio files:
ffmpeg -i translation_audio/afbsdbdwdqefwffeee3defccfc/0_00.mp3 -i translation_audio/afbsdbdwdqefwffeee3defccfc/0_04.mp3 -map 1:a:0 -map 0:a:0 -filter_complex "amerge=inputs=2,adelay=0|4400" output.mp3


ffmpeg -i translation_audio/afbsdbdwdqefwffeee3defccfc/0_00.mp3 -i translation_audio/afbsdbdwdqefwffeee3defccfc/0_04.mp3 -map 1:a:0 -map 0:a:0 -filter_complex "amerge=inputs=2,adelay=0|4400" output.mp3
