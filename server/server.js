require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const logger = require('./utils/logger');
const connectDB = require('./config/dbConn');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middlewares/verifyJWT');

connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use('/auth', require('./routes/authRoutes'));
app.use('/refresh', require('./routes/refreshRoutes'));
app.use('/logout', require('./routes/logoutRoutes'));

app.use(verifyJWT);

app.use('/project', require('./routes/projectRoutes'));

// app.use('/user', require('./routers/userRouter'));
// app.use('/dashboard', require('./routers/dashboardRouter'));
// app.use('/section', require('./routers/sectionRouter'));
// app.use('/process', require('./routers/processRouter'));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
})