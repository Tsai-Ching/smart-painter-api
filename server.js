const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs');

const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : dpg-cid3udtiuie2ea2d1gag-a,
    port : 5432,
    user : 'emmahsu',
    password : '8bBnoGpb4deK9kU4Dale55Gp59QcDwK1',
    database : 'db_j9vw'
  }
});

const app = express();

app.use(cors())

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('it is working!');
})

//確認前端的request與database中使用者的密碼相符
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcryptjs)});

//把註冊的使用者資訊加入database
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcryptjs)});

//在使用主頁中return使用者資訊
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});

//更新entries count
app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`)
});

/*
/ --> POST res = it'sworking
/signin --> POST = success/fail
/register --> POST
/profile/userId --> GET = user information
/image --> PUT = user information
*/