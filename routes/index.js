const express = require('express');
const router = express.Router();
// const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv').config();


router.get('/', function (req, res) {
  res.render('index', { title: 'Speller' });
});

router.get('/enter', function (req, res) {
  res.render('enter')
});

router.route('/search')
  .post(async function (req, res) {
    let resp = await fetch(`https://speller.yandex.net/services/spellservice.json/checkText?text=${req.body.word}?lang=ru,en`);
    let answer = await resp.json();

    let incorrectWords = answer.map(el => el.word);
    let correctedWords = answer.map(el => el.s);

    function connectingArr(arr) {
      let otp = [];

      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          otp.push(arr[i][j])
        }
      }
      return otp;
    };

    let correctWords = connectingArr(correctedWords);

    // req.session.correct = correctWords;
    // req.session.incorrect = incorrectWords;
    res.send(answer);
  })
  .get(function (req, res) {
    res.render('output', {
      correctWords: req.session.correct,
      incorrectWords: req.session.incorrect
    });
  });





module.exports = router;
