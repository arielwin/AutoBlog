const doptenv = require('dotenv')
doptenv.config()
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const session = require('express-session')
const User = require('./models/user.js')

const isSignedIn = require('./middleware/is-signed-in.js')
const passUserToView = require('./middleware/pass-user-to-view.js')


const authController = require('./controllers/auth.js')
const blogsController = require('./controllers/blogs.js')
const userController = require('./controllers/users.js')

const port = process.env.PORT ? process.env.PORT :'3000'

const path = require('path')
const { env } = require('process')

// connected to mongodb
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)

})

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passUserToView)

//landing page
app.get('/', (req, res) => {
    if (req.session.user){
        res.render('home.ejs')
        // res.redirect(`/users/${req.session.user._id}/blogs`)
    } else{ 
        res.render('home.ejs')
    }
});

app.use('/auth', authController)
app.use(isSignedIn)
app.use('/users/:userID/blogs', blogsController)
app.use('/users', userController)

app.listen(port);


