const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const userRoutes = require('./src/routes/auth.user.route');
const blogRoutes = require('./src/routes/blog.route');
const commentRoutes = require('./src/routes/comment.route');

const bodyParser = require('body-parser')
const port = process.env.PORT || 5000;

// parse option
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // enable set cookies
}));

// routes
app.use("/api/auth", userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);

async function main() {
    await mongoose.connect(process.env.MONGOBD_URL);

    app.get('/', (req, res) => {
        res.send('hotels rooftop server is running...')
    })
}


main().then(() => console.log('Connected to mongooDB')).catch(err => console.log(err));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

