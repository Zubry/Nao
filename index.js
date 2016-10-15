const chart = require('./chart-bci.js');
const rp = require('request-promise');

function speak(session, phrase) {
  return session
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

let chartLabel = 0;
const chartButton = document
.querySelector('button[name=chart]');

chartButton.removeAttribute('disabled');
chartButton.addEventListener('click', () => {
  let chart_element = document.getElementById('bci-chart');
  chart_element.classList.remove('hide');
  chart_element.classList.add('show');

  setInterval(() => {
    rp('http://localhost:4000/read_bci/')
      .then((bci) => {
        console.log(bci);
        chart.data.datasets[0].data.push(bci);
        chart.data.labels.push(++chartLabel);

        if (chart.data.labels.length > 10) {
          chart.data.datasets[0].data.shift();
          chart.data.labels.shift();
        }

        chart.update();
      })
      .catch((err) => console.log(err));
  }, 5500);
});

const session = new QiSession('gator.local');
const bayesian = require('./bayesian.js');

session
  .socket()
  .on('connect', function() {
    const bayesianButton = document
      .querySelector('button[name=bayesian]');

    const speakButton = document
      .querySelector('button[name=speak]');

    bayesianButton.removeAttribute('disabled');
    bayesianButton.addEventListener('click', () => bayesian.loop((text) => speak(session, text)));

    speakButton.removeAttribute('disabled');
    speakButton.addEventListener('click', () => speak(session, prompt('What should I say?')));
  })
  .on('disconnect', function() {
    const err = document.getElementById('disconnect-error');
    err.classList.remove('hide');
    err.classList.add('show');

    console.log('Disconnected');
  });

// Try putting this under the on connect handler
// Promise.all(['ALTextToSpeech', 'ALMotion'].map(session.service)
//   .done(([tts, alm]) => {
//     alm.moveTo(-0.3, -0.3, -Math.pi/2)
//     tts.say('hello')
//   })
//   .fail((err) => console.log('Failed to load service'))
