var Answer = require('../objects/Answer'),
    quizz = require('../services/quizz.service');

module.exports = function(app, io) {
    // Vues

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/revisions', function(req, res) {
        quizz.getCapitals(function(err, capitals) {
            res.render('revisions', { capitals: capitals });
        });
    });

    app.get('/template', function(req, res) {
        res.render('template');
    });

    // API

    app.get('/api/quizz/next', function(req, res) {

        quizz.newQuestion(function(err, question) {
            res.json(question);
        });
    });

    app.post('/api/quizz/answer', function(req, res) {
        var answer = new Answer(req.body.login, req.body.country, req.body.userChoice);

        quizz.answerQuestion(answer, function(err, result) {
            /*io.emit('new_answer', {
                login: req.body.login,
                isCorrect: result.isCorrect
            });*/

            res.json(result);
        });
    });
};
