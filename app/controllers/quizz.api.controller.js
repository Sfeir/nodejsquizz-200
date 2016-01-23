'use strict';

var Answer = require('../objects/Answer'),
    quizz = require('../services/quizz.service');

module.exports = function (app, io) {

    app.get('/api/quizz/next', function (req, res) {

        quizz.getNewQuestion(function (err, question) {
            res.json(question);
        });
    });

    app.post('/api/quizz/answer', function (req, res) {
        var answer = new Answer(req.body.login, req.body.country, req.body.userChoice);

        quizz.answerQuestion(answer, function (err, result) {

            //TODO

            res.json(result);
        });
    });

    app.get('/api/quizz/scores', function (req, res) {
        quizz.getAllScores().then(function (allScores) {
            res.json(allScores);
        });
    });
};
