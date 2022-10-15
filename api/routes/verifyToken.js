const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token') || req.cookies.token;
    if (!token) res.status(401).send('Accès refusé')
    if(JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).role === 'repondant') return res.status(403).send({message: 'Role insuffisant'})
    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN)
        // accessible depuis les routes
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).send({message: 'Token invalide'})
    }
}