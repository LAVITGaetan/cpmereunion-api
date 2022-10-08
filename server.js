const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet')
const cookieParser = require('cookie-parser');

// Import API routes
const adherentRoutes = require('./api/routes/adherent')
const contactRoutes = require('./api/routes/contact')
const mandatRoutes = require('./api/routes/mandat')
const mandataireRoutes = require('./api/routes/mandataire')
const representationRoutes = require('./api/routes/representation')
const sondageRoutes = require('./api/routes/sondage')
const questionRoutes = require('./api/routes/question')
const reponseRoutes = require('./api/routes/reponse')
const userRoutes = require('./api/routes/user')

// Middlewares
app.use(cors({
    origin: ['http://localhost:5500', 'http://localhost:4400', 'exp://192.168.0.11:19000'],
    credentials: true,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set view engine
app.set('view engine', 'ejs')

// Static Files
app.use(express.static('public'));

//Security
app.disable('x-powered-by')
app.use(helmet())

// ROUTES API
app.use('/api/adherents', adherentRoutes)
app.use('/api/contacts', contactRoutes)
app.use('/api/mandats', mandatRoutes)
app.use('/api/mandataires', mandataireRoutes)
app.use('/api/representations', representationRoutes)
app.use('/api/sondages', sondageRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/reponses', reponseRoutes)
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 3000;

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true })
    .then(() => {
        console.log('connected to database');
    }).catch(error => {
        console.log(`an error happened : ${error}`);
    })

// START SERVER    
app.listen(PORT, () => {
    console.log(`Server running at : http://localhost:${PORT}`);
})
