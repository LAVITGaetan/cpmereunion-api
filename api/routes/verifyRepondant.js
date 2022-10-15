
module.exports = function (req, res, next) {
    if (req.user.role === 'repondant' ||'admin' || 'member') {
        next();
    } else {
        res.status(403).send({ message: 'Unable to use this ressource' })
    }
}