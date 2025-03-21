require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const logger = require('./utils/logger');
const connectDB = require('./config/dbConn');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middlewares/verifyJWT');
const verifyProjectId = require('./middlewares/verifyProjectId');

connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use(cors(corsOptions));

app.use('/auth', require('./routes/authRoutes'));
app.use('/refresh', require('./routes/refreshRoutes'));
app.use('/logout', require('./routes/logoutRoutes'));

app.use(verifyJWT);

app.use('/user', require('./routes/userRoutes'));
app.use('/alert', require('./routes/alertRoutes'));
app.use('/project', require('./routes/projectRoutes'));

app.use(verifyProjectId);

app.use('/section', require('./routes/sectionRoutes'));
app.use('/process', require('./routes/processRoutes'));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
})