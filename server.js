const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'Emma',
    password : '',
    database : 'smart-painter-db'
  }
});

const app = express();

app.use(cors())

app.use(bodyParser.json());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: '123',
			entries: 0,
			joined: new Date()
		}
	]
}

app.get('/', (req, res) => {
	res.send(database.users);
})

//確認前端的request與database中使用者的密碼相符
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

//把註冊的使用者資訊加入database
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

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