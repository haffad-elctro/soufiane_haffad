const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auteursRouter = require('./routes/auteur');
const editeursRouter = require('./routes/editeur');
const livresRouter = require('./routes/livre');
const userRouter = require('./routes/user');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URL_MONGOOSE);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    jwt.verify(token, process.env.TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = decoded.userId;
        next();
    });
}


app.use('/auteur', auteursRouter); 
app.use('/editeur', editeursRouter); 
app.use('/livre', livresRouter); 
app.use('/user', userRouter); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
