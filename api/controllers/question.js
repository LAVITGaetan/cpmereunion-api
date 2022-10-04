const Question = require('../models/question')
const Reponse = require('../models/reponse')

exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).send(questions)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.getReponses = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        const reponses = await Reponse.find({question_id: req.params.id})
        res.send({question : question, reponses: reponses})
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.getQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id)
        res.send(question)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.addQuestion = async (req, res) => {
    const question = new Question(req.body);
    try {
        await question.save();
        res.send(question)
    } catch (error) {
        res.status(500).send({ message: error.message })
    console.log(error.message);
}
}

exports.editQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ question })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.deleteQuestion = async (req, res) => {
    try {
        await Question.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Question supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
}