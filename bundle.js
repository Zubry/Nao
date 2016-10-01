(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const session = new QiSession('gator.local');

function speak(session, phrase) {
  session.service("ALTextToSpeech")
    .done((tts) => tts.say(phrase))
    .fail((error) => console.log("Failed to run TTS"));
}

function playMusic(session) {
  session.service("ALAudioPlayer")
    .done((aup) => aup.playFile('http://192.168.1.9:4000/King_Kunta.wav')
      .done((x) => console.log(x))
      .error((err) => console.log(err)))
    .fail((error) => console.log("Failed to run AUP"));
}

function detectSound(session) {
  session
    .socket()
    .on('SoundDetected', () => {
      speak(session, "Hey, shut up, loser")
    })
}

function move(session) {
  session
    .service('ALMotion')
    .done((amp) => amp.moveTo(-0.3, -0.3, -Math.pi/2))
    .fail((err) => console.log(err));
}

session.socket().on('connect', function() {
  move(session);
})
.on('disconnect', function() {
  console.log('Disconnected');
});

},{}]},{},[1]);
