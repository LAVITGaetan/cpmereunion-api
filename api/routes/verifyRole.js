
module.exports = function(req, res, next) {
    if(req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send({message: 'Member cannot use this ressource'})
    }
}