const session = new QiSession('gator.local');
const bayesian = require('./bayesian.js');

function speak(session, phrase) {
  session
    .service('ALTextToSpeech')
    .done((tts) => tts.say(phrase))
    .fail((error) => console.log('Failed to run TTS'));
}

// Doesn't work
// function playMusic(session) {
//   session
//     .service('ALAudioPlayer')
//     .done((aup) => aup.playFile('http://192.168.1.9:4000/King_Kunta.wav')
//       .done((x) => console.log(x))
//       .error((err) => console.log(err)))
//     .fail((error) => console.log('Failed to run AUP'));
// }

// Doesn't work
// function detectSound(session) {
//   session
//     .socket()
//     .on('SoundDetected', () => {
//       speak(session, "Hey, shut up, loser")
//     })
// }

function move(session) {
  session
    .service('ALMotion')
    .done((amp) => amp.moveTo(-0.3, -0.3, -Math.pi/2))
    .fail((err) => console.log(err));
}

session
  .socket()
  .on('connect', function() {
    bayesian.loop((text) => speak(session, text));
  })
  .on('disconnect', function() {
    console.log('Disconnected');
  });

// Try putting this under the on connect handler
// Promise.all(['ALTextToSpeech', 'ALMotion'].map(session.service)
//   .done(([tts, alm]) => {
//     alm.moveTo(-0.3, -0.3, -Math.pi/2)
//     tts.say('hello')
//   })
//   .fail((err) => console.log('Failed to load service'))
